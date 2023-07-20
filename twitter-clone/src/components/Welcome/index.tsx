import { Button, Card, CardContent, CardHeader, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <Card className="card" sx={{ width: 300 }} variant="outlined">
      <CardHeader title="Welcome" />
      <CardContent className="card-content">
        <Grid container direction="row" alignItems={"center"} spacing={4}>
          <Grid item>
            <Button variant="outlined" onClick={() => navigate("/login")}>
              Log In
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick={() => navigate("/signup")}>
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Welcome;
