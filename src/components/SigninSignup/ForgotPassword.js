import React, { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Grid,
    Paper,
    InputAdornment,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { changePassword, emailOtpSender, validateOTP } from "../../apis/axiosRequest";

const maskEmail = (email) => {
    const [localPart, domain] = email.split("@");
    const firstThree = localPart.slice(0, 3);
    const lastTwo = localPart.slice(-2);
    return `${firstThree}${"x".repeat(localPart.length - 5)}${lastTwo}@${domain}`;
};


const ForgotPassword = () => {
    const navigate = useNavigate();
    const [forgotPassword, setForgotPassword] = useState({
        email: "",
        otp: "",
        newPassword: "",
        retypePassword: "",
    });
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [message, setMessage] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForgotPassword((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleGetOTP = async () => {
        try {
            const response = await emailOtpSender(forgotPassword.email, "PASSWORDRESET");
            if (response.email === forgotPassword.email) {
                const maskedEmail = maskEmail(forgotPassword.email);
                setMessage(
                    `A new one-time password (OTP) has been sent to your email: <strong>${maskedEmail}</strong>`
                );
            }
        }
        catch (err) {
            alert("Server Error, Please Try Again Later!")
        }
    };

    const handleVerifyOtp = async () => {
        try {
            const response = await validateOTP(forgotPassword.email, forgotPassword.otp, "PASSWORDRESET");
            if (response?.status === 200 && response?.data?.success) {
                setIsOtpVerified(true);
                setErrorMessage("");
            }
            else {
                setErrorMessage("Invalid OTP. Please try again.");
            }
        }
        catch (err) {
            alert("Server Error, Please Try Again Later!")
        }
    };

    const handleChangePassword = async () => {
        try {
            const { newPassword, retypePassword } = forgotPassword;
            if (newPassword !== retypePassword) {
                setErrorMessage("Passwords do not match. Please try again.");
                return;
            } else {
                const requestBody = {
                    email: forgotPassword.email,
                    password: forgotPassword.newPassword,
                    confirmPassword: forgotPassword.retypePassword
                }
                const response = await changePassword(requestBody);
                if (response?.status === 200) {
                    setErrorMessage("");
                    navigate("/signin");
                }
            }
        }
        catch (err) {
            alert("Server Error!");
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
                        }}
                    >
                        Back to Login
                    </Button>
                    <Grid
                        item
                        xs={12}
                        md={5}
                        sx={{
                            backgroundColor: "#7620ff",
                            color: "white",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: 3,
                            textAlign: "center",
                        }}
                    >
                        <Typography variant="h3" fontWeight="bold">
                            Forgot Password
                        </Typography>
                        <Typography variant="body1" mt={2}>
                            Provide email to reset your password
                        </Typography>
                        <Typography variant="body1" mt={2} dangerouslySetInnerHTML={{ __html: message }} />
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
                                Forgot Password
                            </Typography>

                            {/* Email Field with Get OTP */}
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={8}>
                                    <TextField
                                        label="Email"
                                        variant="outlined"
                                        name="email"
                                        value={forgotPassword.email}
                                        onChange={handleInputChange}
                                        fullWidth
                                        disabled={isOtpVerified}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        onClick={handleGetOTP}
                                        sx={{
                                            backgroundColor: "primary.main",
                                            "&:hover": {
                                                backgroundColor: "primary.dark",
                                            },
                                        }}
                                        disabled={isOtpVerified}
                                    >
                                        Get OTP
                                    </Button>
                                </Grid>
                            </Grid>

                            {/* OTP Field */}
                            <TextField
                                label="Enter OTP"
                                variant="outlined"
                                name="otp"
                                value={forgotPassword.otp}
                                onChange={handleInputChange}
                                fullWidth
                                inputProps={{
                                    maxLength: 6,
                                }}
                                disabled={isOtpVerified}
                                InputProps={{
                                    endAdornment: isOtpVerified ? (
                                        <InputAdornment position="end">
                                            <CheckCircleIcon color="success" />
                                        </InputAdornment>
                                    ) : null,
                                }}
                            />
                            {!isOtpVerified && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleVerifyOtp}
                                    sx={{
                                        marginTop: 2,
                                        backgroundColor: "primary.main",
                                        "&:hover": {
                                            backgroundColor: "primary.dark",
                                        },
                                    }}
                                    fullWidth
                                >
                                    Verify OTP
                                </Button>
                            )}

                            {/* Change Password Form */}
                            {isOtpVerified && (
                                <>
                                    <TextField
                                        label="New Password"
                                        variant="outlined"
                                        name="newPassword"
                                        type="password"
                                        value={forgotPassword.newPassword}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                    <TextField
                                        label="Re-type New Password"
                                        variant="outlined"
                                        name="retypePassword"
                                        type="password"
                                        value={forgotPassword.retypePassword}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleChangePassword}
                                        sx={{
                                            marginTop: 2,
                                            backgroundColor: "primary.main",
                                            "&:hover": {
                                                backgroundColor: "primary.dark",
                                            },
                                        }}
                                        fullWidth
                                    >
                                        Change Password
                                    </Button>
                                </>
                            )}

                            {errorMessage && (
                                <Typography
                                    color="error"
                                    textAlign="center"
                                    sx={{ marginTop: 2 }}
                                >
                                    {errorMessage}
                                </Typography>
                            )}
                        </Box>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default ForgotPassword;
