import { createBrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import SingleProductPage from "./pages/SingleProductPage";
const Layout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      {index: false, path: "/product/:id", element: <SingleProductPage /> },
      { path: "create", element: <CreatePage /> },
    ],
  },
]);
