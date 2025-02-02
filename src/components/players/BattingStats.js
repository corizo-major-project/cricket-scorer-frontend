import { Box, Typography, Grid } from '@mui/material';
import React from 'react';
import { styled } from "@mui/system";

const StatBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    borderRadius: "12px",
    backgroundColor: "white",
    color: "black",
    textAlign: "center",
    minWidth: 100,
    minHeight: 80,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1rem",
    fontWeight: "bold",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
}));

const BattingStats = ({ battingStats }) => {
    if (!battingStats) return <Typography>No Batting Stats Available</Typography>;

    return (
        <Box sx={{ display: "flex", justifyContent: "center", maxWidth: 1000, mx: "auto", mt: 3 }}>
            <Grid container spacing={2} justifyContent="center">
                {[
                    { label: "Matches", value: battingStats.matches },
                    { label: "Innings", value: battingStats.innings },
                    { label: "Not Out", value: battingStats.notOut },
                    { label: "Runs", value: battingStats.runs },
                    { label: "Highest Runs", value: battingStats.highestRuns },
                    { label: "Avg", value: battingStats.avg },
                    { label: "Strike Rate", value: battingStats.sr },
                    { label: "30s", value: battingStats["30s"] },
                    { label: "50s", value: battingStats["50s"] },
                    { label: "100s", value: battingStats["100s"] },
                    { label: "4s", value: battingStats["4s"] },
                    { label: "6s", value: battingStats["6s"] },
                    { label: "Ducks", value: battingStats.ducks },
                    { label: "Won", value: battingStats.won },
                    { label: "Loss", value: battingStats.loss },
                ].map((stat, index) => (
                    <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
                        <StatBox>
                            <Typography variant="h6"><b>{stat.value}</b></Typography>
                            <Typography>{stat.label}</Typography>
                        </StatBox>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default BattingStats;
