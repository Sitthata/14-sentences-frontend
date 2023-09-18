import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('http://localhost:8080');

const CreateRoom = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Look for lobbyCreated Event
    socket.on('lobbyCreated', (roomId: string, hostUser) => {
      console.log('Lobby Created: ', roomId);
      console.log('Initial Users: ', hostUser);
      navigate(`/lobby/${roomId}`);
    });
  }, [navigate, username]);

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) return alert('Please input your username');
    socket.emit('createLobby', username);
  };

  const handleJoinRoom = () => {
    navigate(`/join-room`);
  };

  return (
    <form className="flex flex-col">
      <label htmlFor="username">Input your username</label>
      <input
        className="border-2 border-gray-500"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button className="m-5 border" type="submit" onClick={handleCreateRoom}>
        Create Room
      </button>
      <button className="m-5 border" type="submit" onClick={handleJoinRoom}>
        Join Room
      </button>
    </form>
  );
};

export default CreateRoom;
