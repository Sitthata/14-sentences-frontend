import { Button, Flex, Modal, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../socket/socket"

type ErrorType = {
  username?: string;
  roomId?: string;
}

const JoinRoom = () => {
  const [username, setUsername] = useState<string>("");
  const [roomId, setRoomId] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const [error, setError] = useState<ErrorType>({});
  const navigate = useNavigate();

  useEffect(() => {
    //Find room
    socket.on("lobbyJoined", (roomId: string, username) => {
      console.log("Joined lobby: ", roomId);
      console.log("Initial Users: ", username);
      navigate(`/lobby/${roomId}`);
    });
  }, [navigate, username, roomId]);

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
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
    if (!username.trim()) errors.username = "Please enter a username";
    if (!roomId.trim()) errors.roomId = "Please enter a room ID";
    
    setError(errors)
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
          <Button variant="filled" type="submit" onClick={handleJoinRoom}>
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
