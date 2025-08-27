import { RouterProvider } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import router from "./Router";

function App() {
  return (
    <Box minH="100vh" >
      <RouterProvider router={router} />
    </Box>
  );
}

export default App;
