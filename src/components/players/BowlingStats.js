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

const BowlingStats = ({ bowlingStats }) => {
    if (!bowlingStats) return <Typography>No Batting Stats Available</Typography>;

    return (
        <Box sx={{ display: "flex", justifyContent: "center", maxWidth: 1000, mx: "auto", mt: 3 }}>
            <Grid container spacing={2} justifyContent="center">
                {[
                    { label: "Matches", value: bowlingStats.matches },
                    { label: "Innings", value: bowlingStats.innings },
                    { label: "Overs", value: bowlingStats.overs },
                    { label: "Maidens", value: bowlingStats.maidens },
                    { label: "Wickets", value: bowlingStats.wickets },
                    { label: "Runs", value: bowlingStats.runs },
                    { label: "Best Bowling", value: bowlingStats.bestBowling },
                    { label: "3-W", value: bowlingStats["3wicket"] },
                    { label: "5-W", value: bowlingStats["5wicket"] },
                    { label: "10-W", value: bowlingStats["10wicket"] },
                    { label: "Economy", value: bowlingStats.economy},
                    { label: "Strike Rate", value: bowlingStats.sr },
                    { label: "AVG", value: bowlingStats.avg },
                    { label: "Wides", value: bowlingStats.wides },
                    { label: "No Balls", value: bowlingStats.noBalls },
                    { label: "Dot Balls", value: bowlingStats.dotBalls },
                    { label: "Fours", value: bowlingStats["4s"] },
                    { label: "Sixes", value: bowlingStats["6s"] },
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

export default BowlingStats;
