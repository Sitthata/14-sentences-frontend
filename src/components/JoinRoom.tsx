import { Button, Flex, Modal, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../socket/socket"
import { notifications } from "@mantine/notifications";
import { GiCancel } from "react-icons/gi";

type ErrorType = {
  username?: string;
  roomId?: string;
}

const JoinRoom = () => {
  const [username, setUsername] = useState<string>("");
  const [roomId, setRoomId] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const [error, setError] = useState<ErrorType>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (username) setError(prev => ({...prev, username: ""}));
    if (roomId) setError(prev => ({...prev, roomId: ""}));

    const handleLobbyNotFound = () => {
        setError(prev => ({...prev, roomId: "Room not found"}));
        setIsLoading(false);
        notifications.show({
            title: 'Room not found',
            message: 'The room you are trying to join does not exist. Please try again.',
            autoClose: 4000,
            color: "red",
            icon: <GiCancel/>
        });
    };
    //Find room
    socket.on("lobbyJoined", (roomId: string, username) => {
      console.log("Joined lobby: ", roomId);
      console.log("Initial Users: ", username);
      navigate(`/lobby/${roomId}`);
    });
    socket.on("lobbyNotFound", handleLobbyNotFound);
    return () => {
      socket.off("lobbyJoined");
      socket.off("lobbyNotFound");
    }
  }, [navigate, username, roomId]);

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (validateForm()) {
      socket.emit("joinLobby", roomId, username);
    } 
  };

  const openModal = () => {
    open();
    setError({});
  }

  const validateForm = () => {
    const errors: ErrorType = {}
    if (!username.trim()) 
      errors.username = "Please enter a username";
    
    if (!roomId.trim()) 
      errors.roomId = "Please enter a room ID";

    setError(errors);
    setIsLoading(false);
    return Object.keys(errors).length === 0;
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Join Room"
        centered
        style={{ padding: "1rem" }}
      >
        {/* Modal content */}
        
        <Flex gap="md" direction="column">
        <TextInput
            placeholder="Room ID"
            size="md"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            label="Enter Room ID"
            error={error.roomId}
          />
          <TextInput
            placeholder="Username"
            size="md"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            label="Enter Username"
            error={error.username}
          />
          <Button variant="filled" type="submit" loading={isLoading} loaderProps={{type: "bars"}} onClick={handleJoinRoom}>
            Join Room
          </Button>
        </Flex>
      </Modal>
      <Button variant="outline" onClick={openModal}>
        Join Room
      </Button>
    </>
  );
};

export default JoinRoom;
