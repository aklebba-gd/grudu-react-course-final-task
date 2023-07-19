import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import Signup from "./components/Signup";
import ErrorPage from "./components/ErrorPage";
import "./App.css";
import { Container } from "@mui/material";

const router = createBrowserRouter([
  { path: "/", element: <HomePage />, errorElement: <ErrorPage /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
]);

function App() {
  return (
    <div className="app">
      <Container id="app-container">
        <RouterProvider router={router} />
      </Container>
    </div>
  );
}

export default App;
