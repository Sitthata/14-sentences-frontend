import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import io from 'socket.io-client';
import {Button, Input} from "@mantine/core";

const socket = io('http://localhost:8080');

const CreateRoom = () => {
    const [username, setUsername] = useState('');
    const [error, setError] = useState(false);
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
        if (!username) {
            setError(true);
            return;
        }
        setError(false);
        socket.emit('createLobby', username);
    };

    const handleJoinRoom = () => {
        navigate(`/join-room`);
    };

    return (
        <form className="flex flex-col gap-5 outline p-5">
            <Input.Wrapper
                label="Enter Username"
                error={error ? 'Please enter a username' : false}
            >
                <Input
                    placeholder="Username"
                    size="md"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    error={error ? 'Please enter a username' : false}
                />
            </Input.Wrapper>
            <div className="flex gap-5">
                <Button variant="filled" type="submit" onClick={handleCreateRoom}>
                    Create Room
                </Button>
                <Button variant="outline" type="submit" onClick={handleJoinRoom}>
                    Join Room
                </Button>
            </div>
        </form>
    );
};

export default CreateRoom;