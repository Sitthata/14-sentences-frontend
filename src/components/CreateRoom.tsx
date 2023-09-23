import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextInput } from "@mantine/core";
import JoinRoom from "./JoinRoom";
import socket from "../socket/socket";
import { notifications } from "@mantine/notifications";
import { GiCancel } from "react-icons/gi";

enum CreateRoomState {
  IDLE,
  LOADING,
  ERROR,
  MAX_USERS_REACHED
}

const CreateRoom = () => {
      const [username, setUsername] = useState<string>("");
      const [componentState, setComponentState] = useState<CreateRoomState>(CreateRoomState.IDLE);
      const navigate = useNavigate();

      useEffect(() => {
        if (username) setComponentState(CreateRoomState.IDLE);

        // Define the event handler
        const handleLobbyCreated = (roomId: string, hostUser: string) => {
          console.log("Lobby Created: ", roomId);
          console.log("Initial Users: ", hostUser);
          navigate(`/lobby/${roomId}`);
        };

        const handleMaxUserLimitReached = () => {
          setComponentState(CreateRoomState.MAX_USERS_REACHED);
          notifications.show({
            title: 'Max User Limit Reached',
            message: 'The maximum number of users has been reached. Please try again later.',
            autoClose: 4000,
            icon: <GiCancel/>,
            color: "red"
          });
        };

        // Attach the event handler
        socket.on("lobbyCreated", handleLobbyCreated);
        socket.on("maxUserLimitReached", handleMaxUserLimitReached);

        // Cleanup function to remove the event handler
        return () => {
          socket.off("lobbyCreated", handleLobbyCreated);
          socket.off("maxUserLimitReached", handleMaxUserLimitReached);
        };
      }, [navigate, username]);

      const handleCreateRoom = (e: React.FormEvent) => {
        e.preventDefault();
        if (!username) {
          setComponentState(CreateRoomState.ERROR);
          return;
        }
        setComponentState(CreateRoomState.LOADING);
        socket.emit("createLobby", username);
      };

      return (
          <form className="flex flex-col gap-5 p-5 outline outline-1 outline-gray-300">
            <TextInput
                label="Enter your username"
                placeholder="Username"
                size="md"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={componentState === CreateRoomState.ERROR ? "Please enter a username" : false}
            />

            <div className="flex gap-5">
              <Button
                  variant="filled"
                  type="submit"
                  onClick={handleCreateRoom}
                  loading={componentState === CreateRoomState.LOADING}
                  loaderProps={{type: "bars"}}
              >
                Create Room
              </Button>
              <JoinRoom/>
            </div>
          </form>
      );
    }
;

export default CreateRoom;
