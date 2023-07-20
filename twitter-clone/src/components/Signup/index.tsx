import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as EmailValidator from "email-validator";
import { Button, Card, CardHeader, CardContent, FormGroup, TextField } from "@mui/material";
import CustomDialog from "../common/Dialog";

interface FormValues {
  email: string;
  password: string;
  username: string;
  fullname: string;
}

interface Errors {
  email: string;
  password: string;
  username: string;
  fullname: string;
}

interface Touched {
  email: boolean;
  password: boolean;
  username: boolean;
  fullname: boolean;
}

const defaultValues: FormValues = { email: "", password: "", username: "", fullname: "" };
const defaultErrors: Errors = { email: "", password: "", username: "", fullname: "" };
const defaultTouched: Touched = { email: false, password: false, username: false, fullname: false };

const Signup = () => {
  const [formValues, setFormValues] = useState<FormValues>(defaultValues);
  const [errors, setErrors] = useState<Errors>(defaultErrors);
  const [isTouched, setIsTouched] = useState<Touched>(defaultTouched);
  const [isFormValid, setIsFormValid] = useState<Boolean>(false);
  const [open, setOpen] = useState(false);
  const [dialogMsg, setDialogMsg] = useState("");
  const navigate = useNavigate();

  const handleOpen = (value: boolean) => {
    setOpen(value);
  };

  const { email, password, username, fullname } = formValues;

  const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    let emailError: boolean = false;
    let passwordError: boolean = false;
    let usernameError: boolean = false;
    let fullnameError: boolean = false;

    if (isTouched.email) {
      if (!EmailValidator.validate(email)) {
        emailError = true;
      }
    }
    if (isTouched.password) {
      if (password.length < 8 || password.length > 256) {
        passwordError = true;
      }
    }
    if (isTouched.username) {
      if (username.length < 4 || username.length > 256) {
        usernameError = true;
      }
    }
    if (isTouched.fullname) {
      if (fullname.length < 1 || fullname.length > 512) {
        fullnameError = true;
      }
    }

    setErrors({
      email: emailError ? "Invalid Email..." : "",
      password: passwordError ? "Invalid Password..." : "",
      username: usernameError ? "Invalid Username..." : "",
      fullname: fullnameError ? "Invalid Full Name..." : "",
    });

    if (
      Object.values(isTouched).every((item) => item) &&
      !emailError &&
      !usernameError &&
      !passwordError &&
      !fullnameError
    ) {
      setIsFormValid(true);
    } else setIsFormValid(false);
  };

  const handleSubmit = async () => {
    if (isFormValid) {
      try {
        const response = await fetch("http://localhost:3001/users", {
          method: "POST",
          body: JSON.stringify({
            email,
            username,
            fullname,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response);
        if (response.ok) {
          navigate("/login");
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
    <Card className="card" sx={{ width: 400 }} variant="outlined">
      <CardHeader title="Log in" />
      <CardContent className="card-content">
        <form>
          <FormGroup className="form-group">
            <TextField
              name="email"
              variant="outlined"
              placeholder="Email"
              type="text"
              value={email}
              onChange={handleTextFieldChange}
              onBlur={() => setIsTouched((prevState) => ({ ...prevState, email: true }))}
              error={isTouched.email && errors.email ? true : false}
              helperText={errors.email}
            />
            <TextField
              name="password"
              variant="outlined"
              placeholder="Password"
              type="password"
              value={password}
              onChange={handleTextFieldChange}
              onBlur={() => setIsTouched((prevState) => ({ ...prevState, password: true }))}
              error={isTouched.password && errors.password ? true : false}
              helperText={errors.password}
            />
            <TextField
              name="username"
              variant="outlined"
              placeholder="Username"
              type="text"
              value={username}
              onChange={handleTextFieldChange}
              onBlur={() => setIsTouched((prevState) => ({ ...prevState, username: true }))}
              error={isTouched.username && errors.username ? true : false}
              helperText={errors.username}
            />
            <TextField
              name="fullname"
              variant="outlined"
              placeholder="Full Name"
              type="text"
              value={fullname}
              onChange={handleTextFieldChange}
              onBlur={() => setIsTouched((prevState) => ({ ...prevState, fullname: true }))}
              error={isTouched.fullname && errors.fullname ? true : false}
              helperText={errors.fullname}
            />
            <Button
              variant="outlined"
              onClick={handleSubmit}
              disabled={
                !isTouched.email &&
                !isTouched.password &&
                !isTouched.username &&
                !isTouched.fullname
              }>
              Submit
            </Button>
          </FormGroup>
        </form>
        <CustomDialog open={open} handleOpen={handleOpen} dialogMsg={dialogMsg} />
      </CardContent>
    </Card>
  );
};

export default Signup;
