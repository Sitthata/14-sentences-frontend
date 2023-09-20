import { ActionIcon, Button, CopyButton, Tooltip } from "@mantine/core";
import { BiCopy } from "react-icons/bi";
import { MdDownloadDone } from "react-icons/md";

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
        <CopyButton value={roomId} timeout={2000}>
          {({ copied, copy }) => (
            <Tooltip label={copied ? "Copied" : "Copy to clipboard"}>
              <ActionIcon
                color={copied ? "teal" : "white"}
                style={{
                    backgroundColor: copied ? "teal" : "gray"
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
      <Button variant="filled" radius="xl">
        Start Game
      </Button>
    </div>
  );
};

export default LobbyInfo;
