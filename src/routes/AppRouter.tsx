import CreateRoomPage from "./create-room/create-room";
import LobbyPage from "./lobby/lobby";

const routes = [
    {
        path: "/",
        element: <CreateRoomPage/>,
    },
    {
        path: "/lobby/:roomId",
        element: <LobbyPage />,
    }
];

export default routes;