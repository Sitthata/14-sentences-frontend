import { ActionIcon, CopyButton, Tooltip } from "@mantine/core";
import { BiCopy } from "react-icons/bi";
import { MdDownloadDone } from "react-icons/md";

interface LobbyCopyProp {
  roomId?: string;
}

const LobbyCopy = ({ roomId }: LobbyCopyProp) => {
  return (
    <CopyButton value={roomId ? roomId : ""} timeout={2000}>
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
  );
};

export default LobbyCopy;
