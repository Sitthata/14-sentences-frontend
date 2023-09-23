import "./styles/output.css";
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes/AppRouter";
import { MantineProvider } from "@mantine/core";
import {Notifications} from "@mantine/notifications";

function App() {
  const router = createBrowserRouter(routes);
  return (
    <MantineProvider>
      <Notifications />
      <RouterProvider router={router} />
    </MantineProvider>
  );
}

export default App;
