import "./styles/output.css";
import '@mantine/core/styles.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes/AppRouter";
import { MantineProvider } from "@mantine/core";

function App() {
  const router = createBrowserRouter(routes);
  return (
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  );
}

export default App;
