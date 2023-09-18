import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';

const socket = io('http://localhost:8080');

type roomUsersType = {
  id: string;
  username: string;
};

const Lobby = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [roomUsers, setRoomUsers] = useState<roomUsersType[]>([]);

  useEffect(() => {
    console.log('Component mounted');
    socket.onAny((event, ...args) => {
      console.log(event, args);
    });
    socket.emit('getRoomInfo', roomId);
    socket.on('roomInfo', (users: roomUsersType[]) => {
      console.log('roomInfo received');
      setRoomUsers(users);
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
