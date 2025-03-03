import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import BookList from "./components/BookList";
import Category from "./components/Category";
import BookDetail from "./components/BookDetail";
import Favorites from "./components/Favorites";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1>Error</h1>,
    children: [
      {
        path: "/",
        element: <BookList />,
      },
      {
        path: "/category/:topic",
        element: <Category />,
      },
      {
        path: "/book/:id",
        element: <BookDetail />,
      },
      {
        path: "/favorites",
        element: <Favorites />,
      },
    ],
  },
  {
    path: "*",
    element: <App />,
    errorElement: <h1>404 - Page not found </h1>,
  },
]);

document.title = "Hector's Book Haven";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
