import { ScrollArea } from "@mantine/core";
import { roomUsersType } from "../types";
import { BsFillPeopleFill } from "react-icons/bs";

interface PlayersListProps {
  roomUsers: roomUsersType[];
}

const PlayerList = ({ roomUsers }: PlayersListProps) => {
  return (
    <ScrollArea h={250} scrollbarSize={6} className="p-3 outline outline-1 sm:min-w-[15rem] min-w-full">
      <h2 className="mb-2">Player {roomUsers.length}/12</h2>
      <div className="flex-col gap-2 flex-start">
        {roomUsers.map((user) => (
          <div
            className="flex w-full gap-2 px-2 py-2 text-2xl bg-white rounded-l-full min"
            key={user.id}
          >
            <div className="flex items-center p-1 bg-white rounded-full">
              <BsFillPeopleFill />
            </div>
            {user.username}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default PlayerList;
