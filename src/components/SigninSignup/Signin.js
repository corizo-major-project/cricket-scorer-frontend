import React from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Link,
} from "@mui/material";

const Signin = ({ onNavigate }) => {
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
      <TextField label="Email" variant="outlined" fullWidth />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ marginTop: 2 }}
      >
        Login
      </Button>
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
        <Link href="/forget-password" underline="hover">
          Forgot Password?
        </Link>
      </Grid>
    </Box>
  );
};

export default Signin;
