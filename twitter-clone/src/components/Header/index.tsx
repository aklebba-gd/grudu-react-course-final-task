import { Button, Paper, Container, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Header.css";

interface HeaderProps {
  fullname: string | null;
}

const Header: React.FC<HeaderProps> = (props: HeaderProps): JSX.Element => {
  const navigate = useNavigate();
  const { fullname } = props;
  const handleLogOut = () => {
    localStorage.setItem("isLogged", "false");
    navigate("/welcome");
  };

  return (
    <Container id="header">
      <Paper sx={{ padding: "20px" }}>
        <Grid container direction="row" justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography>Another Twitter Clone</Typography>
          </Grid>
          <Grid item className="log-out-section">
            <Typography variant="h5">{fullname}</Typography>
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
