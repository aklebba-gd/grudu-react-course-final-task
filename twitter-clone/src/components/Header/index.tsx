import { Box, Button, Paper, CardContent, Container, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Header.css";

interface HeaderProps {
  username: string | null;
}

const Header = (props: HeaderProps): JSX.Element => {
  const navigate = useNavigate();
  const { username } = props;
  const handleLogOut = () => {
    localStorage.setItem("isLogged", "false");
    navigate("/login");
  };

  return (
    <Container id="header">
      <Paper sx={{ padding: "20px" }}>
        <Grid container direction="row" justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography>Another Twitter Clone</Typography>
          </Grid>
          <Grid item className="log-out-section">
            <Typography variant="h5">{username}</Typography>
            <Button variant="outlined" size="large" id="log-out-button" onClick={handleLogOut}>
              Log Out
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Header;
