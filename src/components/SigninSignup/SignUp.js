import React, { useState } from "react";
import {
    Box,
    Button,
    Grid,
    TextField,
    Typography,
    Link,
} from "@mui/material";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const Signup = ({ onNavigate }) => {
    const [userSignupDetails, setUserSignupDetails] = useState({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

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

    const handleSignup = async () => {
        // Basic validation (example)
        if (userSignupDetails.password !== userSignupDetails.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            // Replace with your API endpoint
            const response = await fetch("/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userSignupDetails),
            });

            if (response.ok) {
                const data = await response.json();
                alert("Signup successful!");
                console.log(data);
            } else {
                alert("Signup failed!");
            }
        } catch (error) {
            console.error("Error during signup:", error);
            alert("An error occurred. Please try again.");
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
                        label="Last Name"
                        variant="outlined"
                        fullWidth
                        name="lastName"
                        value={userSignupDetails.lastName}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        name="email"
                        value={userSignupDetails.email}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        name="username"
                        value={userSignupDetails.username}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <PhoneInput
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
        </Box>
    );
};

export default Signup;
