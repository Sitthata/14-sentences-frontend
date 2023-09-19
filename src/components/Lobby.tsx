import { useParams } from "react-router-dom"
import { io } from "socket.io-client"
import { useEffect, useState } from "react"

const socket = io("https://one4-sentences-backend.onrender.com")

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
    })
    socket.emit("getRoomInfo", roomId)
    socket.on("roomInfo", (users: roomUsersType[]) => {
      console.log("roomInfo received")
      setRoomUsers(users)
    })
  }, [roomId])
  return (
    <div className="flex flex-col h-screen gap-5 flex-center">
      <h1 className="text-3xl">Lobby id: <span className="font-semibold">{roomId}</span></h1>
      {roomUsers.map((user) => (
        <div className="text-2x1" key={user.id}>
          {user.username}
        </div>
      ))}
      <button className="px-14 py-2 font-semibold text-sm bg-blue-600 text-white rounded-full shadow-sm hover:bg-blue-700">
        <span className="font-bold mx-8">Start</span>
      </button>
    </div>
  )
}

export default Lobby
