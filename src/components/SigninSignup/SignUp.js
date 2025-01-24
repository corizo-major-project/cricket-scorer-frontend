import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Grid,
    TextField,
    Typography,
    Link,
    Dialog,
} from "@mui/material";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import OTPDialog from "./OTPDialog";
import VerifiedIcon from '@mui/icons-material/Verified';
import { checkEmailValidated, emailOtpSender, userSignup } from "../../apis/axiosRequest";
import { useNavigate } from "react-router-dom";

const Signup = ({ onNavigate }) => {
    const navigate = useNavigate();
    const [userSignupDetails, setUserSignupDetails] = useState({
        firstName: "",
        lastName: "",
        email: "",
        userName: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const [isEmailExists, setIsEmailExists] = useState(false);
    const [isEmailValidated, setIsEmailValidated] = useState(false);
    const [otpDialogOpen, setOtpDialogOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserSignupDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handlePhoneChange = (phone) => {
        setUserSignupDetails((prevDetails) => ({
            ...prevDetails,
            phone,
        }));
    };

    const handleEmailVerification = async () => {
        const email = userSignupDetails.email;

        // Validate email field
        if (email.length === 0) {
            alert("Please provide an email address to verify.");
            return;
        }

        // Check if email ends with @gmail.com
        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (!emailRegex.test(email)) {
            alert("Please use a valid Gmail address ending with @gmail.com.");
            return;
        }

        try {
            const response = await emailOtpSender(email, "EMAILVERIFICATION");

            if (response.emailExists) {
                alert("This email is already registered. Please use a different email.");
                return;
            }

            setOtpDialogOpen(true);
        } catch (err) {
            console.log(err);
            alert("An error occurred while sending the OTP. Please try again.");
        }
    };

    const checkValidatedEmail = async (email) => {
        try {
            const response = await checkEmailValidated(email);
            if (response.status === 200) {
                setIsEmailValidated(response.data.success);
            }
            else if (response.status === 409) {
                setIsEmailExists(true);
                setErrorMessage("Email already exists. Please use a different email.")
                return
            }
            setErrorMessage("");
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

        if (gmailRegex.test(userSignupDetails.email)) {
            checkValidatedEmail(userSignupDetails.email);
        }
    }, [userSignupDetails.email])


    const handleSignup = async () => {
        // Basic validation for passwords
        if (userSignupDetails.password !== userSignupDetails.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        if (!isEmailValidated) {
            alert("Make sure to verify your email!");
            return;
        }

        try {
            const response = await userSignup(userSignupDetails); // Call the signup API

            // Handle successful signup
            if (response.status === 201) {
                alert("Signup successful! Redirecting to Sign In...");
                navigate("/signin"); // Navigate to the sign-in page
                return;
            }

            // Handle errors or unexpected response codes
            if (response.status === 400) {
                alert("Invalid signup details. Please try again.");
            }
        } catch (error) {
            console.error("Error during signup:", error);
            alert("Network or server error occurred. Please check your connection and try again.");
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
                Create an Account
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        label="First Name"
                        variant="outlined"
                        fullWidth
                        name="firstName"
                        value={userSignupDetails.firstName}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        label="Last Name"
                        variant="outlined"
                        fullWidth
                        name="lastName"
                        value={userSignupDetails.lastName}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={8}>
                    <TextField
                        required
                        label="Email"
                        variant="outlined"
                        fullWidth
                        name="email"
                        value={userSignupDetails.email}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={4}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                    {!isEmailValidated ? (
                        <>
                            <Button
                                onClick={() => handleEmailVerification(userSignupDetails.email)}
                                disabled={isEmailExists} // Disable button if email exists
                                style={{
                                    background: 'none',
                                    color: isEmailExists ? 'gray' : 'blue', // Change color if disabled
                                    textTransform: 'none',
                                    textDecoration: 'underline',
                                    boxShadow: 'none',
                                    padding: 0,
                                    minWidth: 'unset',
                                    cursor: isEmailExists ? 'not-allowed' : 'pointer', // Change cursor if disabled
                                }}
                            >
                                Verify
                            </Button>
                        </>
                    ) : (
                        <VerifiedIcon style={{ color: 'green', margin: 0 }} />
                    )}

                </Grid>
                {isEmailExists && (
                    <span style={{ color: 'red', marginLeft: '10px' }}>
                        {errorMessage}
                    </span>
                )}
                <Grid item xs={12}>
                    <TextField
                        required
                        label="Username"
                        variant="outlined"
                        fullWidth
                        name="userName"
                        value={userSignupDetails.userName}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <PhoneInput
                        required
                        placeholder="Enter phone number"
                        value={userSignupDetails.phone}
                        onChange={handlePhoneChange}
                        defaultCountry="US"
                        style={{
                            height: "56px",
                            width: "100%",
                            borderRadius: "4px",
                            padding: "10px",
                            border: "1px solid #ccc",
                            fontSize: "16px",
                            boxSizing: "border-box",
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        name="password"
                        value={userSignupDetails.password}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        name="confirmPassword"
                        value={userSignupDetails.confirmPassword}
                        onChange={handleChange}
                    />
                </Grid>
            </Grid>
            <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: 2 }}
                onClick={handleSignup}
            >
                Signup
            </Button>
            <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                sx={{ marginTop: 2 }}
            >
                <Typography variant="body2">
                    Already have an Account?{" "}
                    <Link
                        component="button"
                        onClick={() => onNavigate("/signin")}
                        underline="hover"
                    >
                        Signin
                    </Link>
                </Typography>
            </Grid>
            <Dialog open={otpDialogOpen} onClose={() => setOtpDialogOpen(false)}>
                <OTPDialog
                    email={userSignupDetails.email}
                    onClose={() => setOtpDialogOpen(false)}
                    onValidate={(isValidated) => setIsEmailValidated(isValidated)}
                />
            </Dialog>
        </Box>
    );
};

export default Signup;
