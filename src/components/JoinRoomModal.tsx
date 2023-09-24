import React, { useState } from "react";
import { Button, Flex, Modal, TextInput } from "@mantine/core";
import socket from "../socket/socket.ts";

type ErrorType = {
  username?: string;
  roomId?: string;
}

type JoinRoomModalProps = {
  username: string;
  setUsername: (value: string) => void;
  roomId: string;
  setRoomId: (value: string) => void;
  closeModal: () => void;
  opened: boolean
  error: ErrorType;
  setError: (value: ErrorType) => void;
}

const JoinRoomModal = ({username, setUsername, roomId, setRoomId, closeModal, opened}: JoinRoomModalProps) => {
  const [error, setError] = useState<ErrorType>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
  };

  return (
      <Modal
          title="Join Room"
          centered
          style={{padding: '1rem'}}
          onClose={closeModal}
          opened={opened}
      >
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
          <Button
              variant="filled"
              type="submit"
              loading={isLoading}
              loaderProps={{type: 'bars'}}
              onClick={handleJoinRoom}
          >
            Join Room
          </Button>
        </Flex>
      </Modal>
  );
};
export default JoinRoomModal;
