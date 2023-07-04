import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  Dialog,
  DialogActions,
  DialogTitle,
  FormGroup,
  TextField,
} from "@mui/material";

interface FormValues {
  username: string;
  password: string;
}

interface Errors {
  username: string;
  password: string;
}

interface Touched {
  username: boolean;
  password: boolean;
}

const defaultValues: FormValues = { username: "", password: "" };
const defaultErrors: Errors = { username: "", password: "" };
const defaultTouched: Touched = { username: false, password: false };

const Login = () => {
  const [formValues, setFormValues] = useState<FormValues>(defaultValues);
  const [errors, setErrors] = useState<Errors>(defaultErrors);
  const [isTouched, setIsTouched] = useState<Touched>(defaultTouched);
  const [isFormValid, setIsFormValid] = useState<Boolean>(false);
  const [open, setOpen] = useState(false);
  const [dialogMsg, setDialogMsg] = useState("");
  const navigate = useNavigate();

  const handleTextFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  useEffect(() => {
    validateInputs();
  }, [formValues, isTouched]);

  const validateInputs = (): void => {
    let usernameError: boolean = false;
    let passwordError: boolean = false;

    if (isTouched.username) {
      if (formValues.username.length < 4 || formValues.username.length > 256) {
        usernameError = true;
      }
    }
    if (isTouched.password) {
      if (formValues.password.length < 8 || formValues.password.length > 256) {
        passwordError = true;
      }
    }
    setErrors({
      username: usernameError ? "Invalid Username..." : "",
      password: passwordError ? "Invalid Password..." : "",
    });
    if (isTouched.username && isTouched.password && !usernameError && !passwordError) {
      setIsFormValid(true);
    } else setIsFormValid(false);
  };

  const handleSubmit = async () => {
    if (isFormValid) {
      try {
        const response = await fetch(`http://localhost:3001/users?username=${formValues.username}`);
        const responseJson = await response.json();
        console.log(responseJson);
        if (response.status === 200 && responseJson.length !== 0) {
          localStorage.setItem("isLogged", "true");
          navigate("/");
        } else if (response.status === 404 || responseJson.length === 0) {
          setDialogMsg("Invalid email or password");
          setOpen(true);
          throw new Error("User not found");
        } else {
          setDialogMsg("Something went wrong");
          setOpen(true);
          throw new Error("Something went wrong");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Card className="card" sx={{ width: 400 }} variant="outlined">
      <CardHeader title="Log in" />
      <CardContent className="card-content">
        <form>
          <FormGroup className="form-group">
            <TextField
              name="username"
              variant="outlined"
              placeholder="Username"
              type="text"
              value={formValues.username}
              onChange={handleTextFieldChange}
              onBlur={() => setIsTouched((prevState) => ({ ...prevState, username: true }))}
              error={isTouched.username && errors.username ? true : false}
              helperText={errors.username}
            />
            <TextField
              name="password"
              variant="outlined"
              placeholder="Password"
              type="password"
              value={formValues.password}
              onChange={handleTextFieldChange}
              onBlur={() => setIsTouched((prevState) => ({ ...prevState, password: true }))}
              error={isTouched.password && errors.password ? true : false}
              helperText={errors.password}
            />
            <Button
              variant="outlined"
              onClick={handleSubmit}
              disabled={!isTouched.username && !isTouched.password}>
              Submit
            </Button>
          </FormGroup>
        </form>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">{dialogMsg}</DialogTitle>
          <DialogActions>
            <Button onClick={() => setOpen(false)} autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default Login;
