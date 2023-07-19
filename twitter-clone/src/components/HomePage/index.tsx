import { useState, useEffect, FC } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Grid } from "@mui/material";
import Header from "../Header";
import Tweet from "../Tweet";
import SubmitTweet from "../SubmitTweet";
import "./HomePage.css";

// useNavigate to redirect to login page if user is not logged

const HomePage: FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [isLogged] = useState(localStorage.getItem("isLogged") === "true");
  const [username] = useState(localStorage.getItem("username"));
  const [tweets, setTweets] = useState<any[]>([]);
  // const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    getTweets();
    // getUsers();
  }, []);

  const getTweets = async () => {
    const response = await fetch("http://localhost:3001/tweets");
    const tweets = await response.json();
    setTweets(tweets);
  };

  // const getUsers = async () => {
  //   const response = await fetch("http://localhost:3001/users");
  //   const tweets = await response.json();
  //   setUsers(tweets);
  // };

  // console.log(tweets, users);

  // const fullname = users?.find((user) => user?.username === username)?.fullname;
  // console.log(fullname);

  useEffect(() => {
    if (!isLogged) {
      navigate("/login");
    }
  }, []);

  return (
    <Container id="homepage-container">
      <Header username={username} />
      <SubmitTweet username={username} />
      <Grid
        id="tweets-container"
        container
        gridTemplateColumns="1fr"
        direction="column"
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
        maxWidth="md">
        {tweets &&
          tweets.map((tweet) => (
            <Tweet key={tweet.id} fullname={tweet.fullname} tweetText={tweet.text} />
          ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
