import { Box, Grid, Paper, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Import the left arrow icon
import "../../App.css";
import CricketBall from "../../images/Cricket_Ball.png";

const DynamicSideContent = () => {
    const location = useLocation();
    const isSignup = location.pathname === "/signup";

    return (
        <Box
            sx={{
                backgroundColor: "#7620ff",
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
                {isSignup ? "Get Started" : "Login"}
            </Typography>
            <Typography variant="body1" mt={2}>
                {isSignup
                    ? "Create an account to enjoy all our features!"
                    : "Welcome back! Please log in to your account."}
            </Typography>
        </Box>
    );
};

const PageLoader = ({ childComponent: ChildComponent }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const isSignup = location.pathname === "/signup";
    const [isAnimating, setIsAnimating] = useState(false);

    const handleNavigation = (target) => {
        setIsAnimating(true);
        setTimeout(() => {
            navigate(target);
            setIsAnimating(false);
        }, 1000); // Match this duration with the animation
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
                    {/* Back to Home Arrow */}
                    <Button
                        onClick={() => navigate("/")}
                        startIcon={<ArrowBackIcon />}
                        sx={{
                            position: "absolute",
                            top: "10px",
                            left: "10px",
                            color: isSignup ? "black" : "white",
                            zIndex: 10,
                        }}
                    >
                        Back to Home
                    </Button>

                    {/* Ball Animation */}
                    {isAnimating && (
                        <Box
                            sx={{
                                position: "absolute",
                                top: "50%",
                                left: isSignup ? "calc(100% - 50px)" : "50px",
                                transform: "translateY(-50%)",
                                width: "50px",
                                height: "50px",
                                backgroundImage: `url(${CricketBall})`, // Use template literals
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                animation: `${isSignup ? "moveLeft" : "moveRight"} 1s ease-out`,
                            }}
                        />
                    )}

                    {isSignup ? (
                        <>
                            {/* Signup form on the left */}
                            <Grid
                                item
                                xs={12}
                                md={7}
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: 3,
                                    backgroundColor: isAnimating ? "black" : "white",
                                    backgroundImage: isAnimating
                                        ? "url('https://via.placeholder.com/1920x1080')"
                                        : "none",
                                }}
                            >
                                <ChildComponent onNavigate={() => handleNavigation("/signin")} />
                            </Grid>
                            {/* Dynamic content on the right */}
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
                                <DynamicSideContent />
                            </Grid>
                        </>
                    ) : (
                        <>
                            {/* Dynamic content on the left */}
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
                                <DynamicSideContent />
                            </Grid>
                            {/* Signin form on the right */}
                            <Grid
                                item
                                xs={12}
                                md={7}
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: 3,
                                    backgroundColor: isAnimating ? "black" : "white",
                                    backgroundImage: isAnimating
                                        ? "url('https://via.placeholder.com/1920x1080')"
                                        : "none",
                                }}
                            >
                                <ChildComponent onNavigate={() => handleNavigation("/signup")} />
                            </Grid>
                        </>
                    )}
                </Paper>
            </Grid>
        </Grid>
    );
};

export default PageLoader;
