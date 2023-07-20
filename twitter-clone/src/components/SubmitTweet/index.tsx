import React, { useState } from "react";
import Textarea from "@mui/joy/Textarea";
import { Box, Button, Grid, Typography } from "@mui/material";
import "./SubmitTweet.css";
import CustomDialog from "../common/Dialog";

interface SubmitTweetProps {
  username: string | null;
  fullname: string | null;
  setNewTweet: React.Dispatch<React.SetStateAction<boolean>>;
}

const SubmitTweet: React.FC<SubmitTweetProps> = (props: SubmitTweetProps): JSX.Element => {
  const { username, fullname, setNewTweet } = props;
  const [tweet, setTweet] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [dialogMsg, setDialogMsg] = useState<string>("");

  const handleOpen = (value: boolean) => {
    setOpen(value);
  };

  const handleTyping = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (tweet.length <= 140) {
      setTweet(event.target.value.slice(0, 140));
    }
  };

  const handleSubmit = async () => {
    if (tweet.length > 0 && tweet.length <= 140) {
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
          setNewTweet(true);
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
      <Box id="tweet-length-counter">
        <Typography>{tweet.length} / 140</Typography>
      </Box>
      <Grid item sx={{ alignSelf: "end" }}>
        <Button
          variant="outlined"
          size="large"
          disabled={!(tweet.length > 0 && tweet.length <= 140)}
          onClick={handleSubmit}>
          Tweet
        </Button>
      </Grid>
      <CustomDialog open={open} handleOpen={handleOpen} dialogMsg={dialogMsg} />
    </Grid>
  );
};

export default SubmitTweet;
