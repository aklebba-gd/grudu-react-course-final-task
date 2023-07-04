import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import { useEffect } from "react";

// useNavigate to redirect to login page if user is not logged

const HomePage = () => {
  const navigate = useNavigate();
  const isLogged = localStorage.getItem("isLogged") === "true";

  useEffect(() => {
    if (!isLogged) {
      navigate("/login");
    }
  }, []);

  return <h1>HomePage</h1>;
};

export default HomePage;
