import { Button } from "@mantine/core";
import LobbyCopy from "./LobbyCopy";
import { Link } from "react-router-dom";

interface LobbyInfoProps {
  roomId?: string;
}

const LobbyInfo = ({ roomId = "loading..." }: LobbyInfoProps) => {
  return (
    <div className="p-5 outline outline-1 min-h-[250px] flex-center gap-5 flex-col">
      <div className="gap-2 flex-center">
        <h1 className="text-3xl">
          Lobby id: <span className="font-semibold">{roomId}</span>
        </h1>
        <LobbyCopy roomId={roomId} />
      </div>
      <a href="https://www.youtube.com/watch?v=9vCb_ZopT4A">
        <Button variant="filled" radius="xl">
          Start Game
        </Button>
      </a>
    </div>
  );
};

export default LobbyInfo;
