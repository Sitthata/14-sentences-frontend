import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import socket from "../socket/socket"

type roomUsersType = {
  id: string
  username: string
}

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
    <div className="flex flex-col h-screen gap-5 flex-center">
      <h1 className="text-3xl">Lobby id: <span className="font-semibold">{roomId}</span></h1>
      {roomUsers.map((user) => (
        <div className="text-2x1" key={user.id}>
          {user.username}
        </div>
      ))}
      <button className="py-2 text-sm font-semibold text-white bg-blue-600 rounded-full shadow-sm px-14 hover:bg-blue-700">
        <span className="mx-8 font-bold">Start</span>
      </button>
    </div>
  )
}

export default Lobby
