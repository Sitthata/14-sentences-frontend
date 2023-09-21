import { ActionIcon, Button, CopyButton, Tooltip } from "@mantine/core";
import { BiCopy } from "react-icons/bi";
import { MdDownloadDone } from "react-icons/md";

interface LobbyInfoProps {
  roomId?: string;
}

const LobbyInfo = ({ roomId = "loading..." }: LobbyInfoProps) => {
  return (
    <div className="p-5 outline outline-1 min-h-[250px] sm:min-w-[20rem] min-w-full flex-center gap-5 flex-col">
      <div className="gap-2 flex-center">
        <h1 className="text-3xl">
          Lobby id: <span className="font-semibold">{roomId}</span>
        </h1>
        <CopyButton value={roomId} timeout={2000}>
          {({ copied, copy }) => (
            <Tooltip label={copied ? "Copied" : "Copy to clipboard"}>
              <ActionIcon
                color={copied ? "teal" : "white"}
                style={{
                  backgroundColor: copied ? "teal" : "gray",
                }}
                variant="subtle"
                onClick={copy}
              >
                {!copied ? <BiCopy /> : <MdDownloadDone />}
              </ActionIcon>
            </Tooltip>
          )}
        </CopyButton>
      </div>
      <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
        <Button variant="filled" radius="xl">
          Start Game
        </Button>
      </a>
    </div>
  );
};

export default LobbyInfo;
