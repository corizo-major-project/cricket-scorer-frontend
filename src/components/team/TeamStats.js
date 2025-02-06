import * as React from "react";
import { Box, Typography, Grid } from "@mui/material";
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


const TeamStats = ({ stats }) => {

    return (
        <Box sx={{ width: "100%", textAlign: "center", mt: 2 }}>
            <Grid container spacing={2} justifyContent="center">
                {[
                    { label: "Matches", value: stats.matches },
                    { label: "Upcoming", value: stats.upcoming },
                    { label: "Won", value: stats.won },
                    { label: "Lost", value: stats.lost },
                    { label: "Tie", value: stats.tie },
                    { label: "Draw", value: stats.drawn },
                    { label: "NR", value: stats.NR },
                    { label: "Win %", value: stats.winPercentage},
                    { label: "Toss Won", value: stats.tossWon },
                    { label: "Bat First", value: stats.batFirst },
                    { label: "Field First", value: stats.fieldFirst },
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

export default TeamStats;
