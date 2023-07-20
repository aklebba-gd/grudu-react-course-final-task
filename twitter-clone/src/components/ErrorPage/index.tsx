import { Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <Card sx={{ maxWidth: 600 }} variant="outlined">
      <CardContent className="card-content">
        <Typography variant="h5" color="error">
          Unexpected error occured.
        </Typography>
        <Typography variant="h6">
          Click <Link to="/">Here</Link> to return to the Home Page
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ErrorPage;
