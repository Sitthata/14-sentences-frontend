import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io("http://localhost:8080");

type roomUsersType = {
  id: string;
  username: string;
};

const Lobby = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [roomUsers, setRoomUsers] = useState<roomUsersType[]>([]);

  useEffect(() => {
    socket.on("lobbyJoined", (roomId: string, roomUsers: roomUsersType[]) => {
      console.log("Joind Lobby" + roomId);
      setRoomUsers(roomUsers);
    });
  }, [roomId]);
  return (
    <div>
      <h1>Lobby id: {roomId}</h1>
      {roomUsers.map((user) => (
        <div key={user.id}>{user.username}</div>
      ))}
    </div>
  );
};

export default Lobby;
