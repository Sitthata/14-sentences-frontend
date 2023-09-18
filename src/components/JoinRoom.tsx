import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('http://localhost:8080');

const JoinRoom = () => {
  const [username, setUsername] = useState('');
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    //Find room
    socket.on('lobbyJoined', (roomId: string, username) => {
      console.log('Joined lobby: ', roomId);
      console.log('Initial Users: ', username);
      navigate(`/lobby/${roomId}`);
    });
  }, [navigate, username, roomId]);

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomId) return alert('Please input your room ID');
    if (!username) return alert('Please input your username');
    socket.emit('joinLobby', roomId, username);
  };

  return (
    <form className="flex flex-col" onSubmit={handleJoinRoom}>
      <label htmlFor="roomId">Input your Room-ID</label>
      <input
        className="border-2 border-gray-500"
        type="text"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <label htmlFor="username">Input your username</label>
      <input
        className="border-2 border-gray-500"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button className="m-5 border" type="submit">
        Join Room
      </button>
    </form>
  );
};

export default JoinRoom;
