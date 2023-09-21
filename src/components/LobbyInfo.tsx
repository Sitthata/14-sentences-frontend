import { Button } from "@mantine/core";
import LobbyCopy from "./LobbyCopy";
import { Link } from "react-router-dom";

interface LobbyInfoProps {
  roomId?: string;
}

const LobbyInfo = ({ roomId = "loading..." }: LobbyInfoProps) => {
  return (
    <div className="p-5 outline outline-1 min-h-[250px] sm:min-w-[20rem] min-w-full flex-center gap-5 flex-col">
      <div className="flex items-center justify-between w-full gap-2">
        <h1 className="text-3xl">
          Lobby id: <span className="font-semibold">{roomId}</span>
        </h1>
        <LobbyCopy roomId={roomId} />
      </div>
      <h2 className="text-xl">Share this lobby id with your friends</h2>
      <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
        <Button variant="filled" radius="xl">
          Start Game
        </Button>
      </a>
    </div>
  );
};

export default LobbyInfo;
