import CreateRoomPage from './create-room'
import LobbyPage from './lobby';

const routes = [
  {
    path: '/',
    element: <CreateRoomPage />,
  },
  {
    path: '/lobby/:roomId',
    element: <LobbyPage />,
  }
];

export default routes;