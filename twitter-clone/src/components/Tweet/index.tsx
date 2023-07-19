import { FC, useEffect, useState } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { Card, CardContent, CardHeader, Grid, Paper, Typography } from "@mui/material";

marked.use({
  mangle: false,
  headerIds: false,
});

interface TweetProps {
  fullname: string;
  tweetText: string;
}

const Tweet: FC<TweetProps> = (props): JSX.Element => {
  const { fullname, tweetText } = props;
  const cleanTweetText = marked.parse(
    DOMPurify.sanitize(tweetText, { USE_PROFILES: { html: true } })
  );

  // Since it's just small learning project and HTML was sanitised by DOMPurify - using dangerouslySetInnerHTML is justified in my opinion.
  return (
    <Grid item sx={{ width: "100%" }}>
      <Paper elevation={4}>
        <Card>
          <CardHeader title={fullname} />
          <CardContent>
            <Typography
              variant="subtitle1"
              dangerouslySetInnerHTML={{ __html: cleanTweetText }}></Typography>
          </CardContent>
        </Card>
      </Paper>
    </Grid>
  );
};

export default Tweet;
