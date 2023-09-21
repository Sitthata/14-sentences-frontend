import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import socket from "../socket/socket"
import { roomUsersType } from '../types';
import PlayersList from './PlayerList';
import LobbyInfo from './LobbyInfo';

const Lobby = () => {
  const { roomId } = useParams<{ roomId: string }>()
  const [roomUsers, setRoomUsers] = useState<roomUsersType[]>([])

  useEffect(() => {
    console.log("Component mounted")
    socket.onAny((event, ...args) => {
      console.log(event, args)
    });
    socket.emit("getRoomInfo", roomId)
    socket.on("roomInfo", (users: roomUsersType[]) => {
      console.log("roomInfo received")
      setRoomUsers(users)
    });
  }, [roomId])
      
  return (
    <div className="flex h-screen gap-5 flex-center flex-col sm:flex-row px-5">
      <LobbyInfo roomId={roomId}/>
      <PlayersList roomUsers={roomUsers} />
    </div>
  )
}
export default Lobby;