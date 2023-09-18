import CreateRoomPage from "./create-room/create-room";
import JoinExistRoomPage from "./create-room/join-room";
import LobbyPage from "./lobby/lobby";

const routes = [
    {
        path: "/",
        element: <CreateRoomPage/>,
    },
    {
        path: "/lobby/:roomId",
        element: <LobbyPage />,
    },
    {
        path: "/join-room",
        element: <JoinExistRoomPage />
    }
];

export default routes;