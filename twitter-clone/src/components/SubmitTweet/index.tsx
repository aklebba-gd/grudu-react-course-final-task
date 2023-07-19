import { FC, useEffect, useState } from "react";
import Textarea from "@mui/joy/Textarea";
import { Button, Grid } from "@mui/material";
import "./SubmitTweet.css";
import CustomDialog from "../common/Dialog";

interface SubmitTweetProps {
  username: string | null;
}

const SubmitTweet = (props: SubmitTweetProps): JSX.Element => {
  const { username } = props;
  const [tweet, setTweet] = useState<string>("");
  const [users, setUsers] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [dialogMsg, setDialogMsg] = useState<string>("");
  const [isTweetValid, setIsTweetValid] = useState<boolean>(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await fetch("http://localhost:3001/users");
    const tweets = await response.json();
    setUsers(tweets);
  };

  const fullname = users?.find((user) => user?.username === username)?.fullname;
  console.log(fullname);

  const handleOpen = (value: boolean) => {
    setOpen(value);
  };

  const handleTyping = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (tweet.length <= 140) {
      setTweet(event.target.value);
    }
    if (tweet.length > 0 && tweet.length <= 140) setIsTweetValid(true);
    else setIsTweetValid(false);
  };

  const handleSubmit = async () => {
    if (isTweetValid) {
      try {
        const response = await fetch("http://localhost:3001/tweets", {
          method: "POST",
          body: JSON.stringify({
            text: tweet,
            username: username,
            fullname: fullname,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response);
        if (response.ok) {
          setTweet("");
        } else {
          setDialogMsg("Something went wrong");
          handleOpen(true);
          throw new Error("Something went wrong");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Grid container id="tweet-input-field" direction="column" gap={2}>
      <Grid item>
        <Textarea
          id="tweet-input-field"
          color="primary"
          disabled={false}
          minRows={3}
          placeholder="Start Your Tweet..."
          size="lg"
          variant="outlined"
          onChange={handleTyping}
          value={tweet}
        />
      </Grid>
      <Grid item sx={{ alignSelf: "end" }}>
        <Button variant="outlined" size="large" disabled={!isTweetValid} onClick={handleSubmit}>
          Tweet
        </Button>
      </Grid>
      <CustomDialog open={open} handleOpen={handleOpen} dialogMsg={dialogMsg} />
    </Grid>
  );
};

export default SubmitTweet;
