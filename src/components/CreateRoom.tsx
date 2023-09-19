import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button, Input} from "@mantine/core";
import JoinRoom from './JoinRoom';
import socket from "../socket/socket"

const CreateRoom = () => {
    const [username, setUsername] = useState<string>('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (username) setError(false);
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

    return (
        <form className="flex flex-col gap-5 p-5 outline outline-1 outline-gray-300">
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
                <JoinRoom />
            </div>
        </form>
    );
};

export default CreateRoom;