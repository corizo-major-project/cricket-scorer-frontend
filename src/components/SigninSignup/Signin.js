import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { userSignin } from "../../apis/axiosRequest";
import { jwtDecode } from 'jwt-decode';
import { useAuth } from "../../token/AuthContext";

const Signin = ({ onNavigate }) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: ""
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const requestBody = {
        userName: "",
        email: "",
        password: loginDetails.password,
      };

      // Determine if the input is an email or username
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(loginDetails.email)) {
        requestBody.email = loginDetails.email;
      } else {
        requestBody.userName = loginDetails.email;
      }

      const response = await userSignin(requestBody);

      if (response?.status === 400) {
        setErrorMessage("Username or email and password must be provided.");
        return;
      } else if (response?.status === 404) {
        setErrorMessage("User not found or inactive.");
        return;
      } else if (response?.status === 401) {
        setErrorMessage("Invalid Details");
        return;
      } 
      console.log("Current error message:", errorMessage);

      if (response?.status === 200) {
        const { token } = response.data;
        const decodedToken = jwtDecode(token);
        localStorage.setItem('accessToken', token);
        localStorage.setItem('email', decodedToken.email);
        localStorage.setItem('role', decodedToken.role);
        localStorage.setItem('userName', decodedToken.userName);
        login(token, decodedToken.email, decodedToken.userName, decodedToken.role);
        navigate("/user", { replace: true });
      } else if (response?.status === 202) {
        navigate("/verify-email", { state: { email: response.data.email} });
      }
    } catch (error) {
      //console.log("Error Object:", error)
      // Handle network or unexpected errors
      setErrorMessage("Unable to connect to the server. Please try again.");

      console.log("Current error message:", errorMessage);
    }
  };


  return (
    <Box
      sx={{
        width: "100%",
        padding: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h4" textAlign="center" fontWeight="bold">
        Login
      </Typography>
      <TextField
        label="Enter Username - Email"
        variant="outlined"
        name="email"
        value={loginDetails.email}
        onChange={handleInputChange}
        fullWidth
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        name="password"
        value={loginDetails.password}
        onChange={handleInputChange}
        fullWidth
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ marginTop: 2 }}
        onClick={handleSubmit}
      >
        Login
      </Button>
      {errorMessage && (
        <Typography variant="body2" color="error" textAlign="center">
          {errorMessage}
        </Typography>
      )}
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ marginTop: 2 }}
      >
        <Typography variant="body2">
          Don’t have an account?{" "}
          <Link
            component="button"
            onClick={() => onNavigate("/signup")}
            underline="hover"
          >
            Signup
          </Link>
        </Typography>
        <Link href="/forgot-password" underline="hover">
          Forgot Password
        </Link>
      </Grid>
    </Box>
  );
};

export default Signin;
