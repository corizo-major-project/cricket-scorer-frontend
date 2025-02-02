import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { emailOtpSender, validateOTP } from "../../apis/axiosRequest";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../token/AuthContext";
import styles from "./TwoFA.module.css";

const maskEmail = (email) => {
  const [localPart, domain] = email.split("@");
  const firstThree = localPart.slice(0, 3);
  const lastTwo = localPart.slice(-2);
  return `${firstThree}${"x".repeat(localPart.length - 5)}${lastTwo}@${domain}`;
};

const TwoFA = () => {
  const navigate = useNavigate();
  const { state } = useLocation(); // Access state passed via navigate
  const { email } = state || {}; // Extract email from URL params
  const [otp, setOtp] = useState("");
  const maskedEmail = maskEmail(email);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const [otpSent, setOtpSent] = useState(localStorage.getItem("otpSent") === "true");
  const [remainingTime, setRemainingTime] = useState(600);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (remainingTime > 0) {
      const timer = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [remainingTime]);
  const handleResend = async () => {
    try {
      setLoading(true); // Show loader for resend
      const response = await emailOtpSender(email, "2FA");
      if (response.email === email) {
        setMessage(
          `A new one-time password (OTP) has been sent to your email: <strong>${maskedEmail}</strong>`
        );
        setOtpSent(true);
        setRemainingTime(600); // Reset timer
      }
    } catch (err) {
      console.log(err);
      alert("An error occurred while resending the OTP. Please try again.");
    } finally {
      setLoading(false); // Hide loader
    }
  };

  useEffect(() => {
    const sendMailFun = async () => {
      try {
        const response = await emailOtpSender(email, "2FA");
        if (response.email === email) {
          setMessage(
            `A one-time password (OTP) has been sent to your email: <strong>${maskedEmail}</strong>`
          );
          setOtpSent(true);
          setLoading(false);
          localStorage.setItem("otpSent", "true"); // Persist flag
        }
      } catch (err) {
        console.log(err);
        alert("An error occurred while sending the OTP. Please try again.");
      }
    };

    if (email) {
      console.log("Sending OTP request to backend for email:", email);
      sendMailFun();
    }
  }, [email, maskedEmail, otpSent]);


  const handleVerify = async () => {
    try {
      const response = await validateOTP(email, otp, "2FA");
      if (response?.status === 200 && response?.data?.success) {
        const { token } = response.data;
        const decodedToken = jwtDecode(token);
        localStorage.setItem('accessToken', token);
        localStorage.setItem('email', decodedToken.email);
        localStorage.setItem('role', decodedToken.role);
        localStorage.setItem('userName', decodedToken.userName);
        login(token, decodedToken.email, decodedToken.userName, decodedToken.role);
        localStorage.setItem("otpSent", "false");
        navigate("/user", { replace: true });
      } else {
        // Handle unexpected status or validation failure
        const errorMessage = response?.data?.message || "Something went wrong. Please try again.";
        setError(errorMessage);
      }
    }
    catch (err) {
      const userFriendlyMessage = err?.response?.data?.message || "Unable to validate OTP. Please try again.";
      setError(userFriendlyMessage);
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        minHeight: "100vh",
        backgroundColor: "#eaeaea",
        padding: 2,
      }}
    >
      <Grid item xs={12} md={8} lg={6}>
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Button
            onClick={() => navigate("/signin")}
            startIcon={<ArrowBackIcon />}
            sx={{
              position: "absolute",
              top: "10px",
              left: "10px",
              color: "white",
              zIndex: 10,
              marginBottom: 2,
            }}
          >
            Back to Login
          </Button>
          <Grid
            item
            xs={12}
            md={5}
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
            }}
          >
            <Box
              sx={{
                backgroundColor: "#363e45",
                color: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: 3,
                textAlign: "center",
                height: "100%",
              }}
            >
              <Typography variant="h3" fontWeight="bold">
                2-F Authenticator
              </Typography>
              <Typography variant="body1" mt={2} dangerouslySetInnerHTML={{ __html: message }} />
              {loading && (
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 2 }}>
                  <Box className={styles.loader}></Box>
                </Box>
              )}
              <Typography variant="body1" textAlign="center" mt={2}>
                {remainingTime > 0
                  ? `You can resend OTP in ${Math.floor(remainingTime / 60)}:${remainingTime % 60 < 10 ? `0${remainingTime % 60}` : remainingTime % 60}`
                  : (
                    <Button onClick={handleResend} sx={{ textDecoration: "underline", padding: 0 }}>
                      Resend OTP
                    </Button>
                  )}
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={7}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 3,
              backgroundColor: "white",
            }}
          >
            <Box
              sx={{
                width: "100%",
                padding: 3,
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
            >
              <Typography variant="h4" textAlign="center" fontWeight="bold">
                Verify Your OTP
              </Typography>

              {/* OTP Field */}
              <TextField
                label="Enter OTP"
                variant="outlined"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                fullWidth
                inputProps={{
                  maxLength: 6,
                }}
                error={!!error}
                helperText={error}
              />

              {/* Verify Button */}
              <Button
                variant="contained"
                color="primary"
                onClick={handleVerify}
                sx={{
                  marginTop: 2,
                  backgroundColor: "primary.main",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
                }}
                fullWidth
              >
                Verify
              </Button>
            </Box>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default TwoFA;
