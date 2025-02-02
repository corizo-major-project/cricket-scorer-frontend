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

const FieldingStats = ({ fieldingStats }) => {
    if (!fieldingStats) return <Typography>No Batting Stats Available</Typography>;

    return (
        <Box sx={{ display: "flex", justifyContent: "center", maxWidth: 1000, mx: "auto", mt: 3 }}>
            <Grid container spacing={2} justifyContent="center">
                {[
                    { label: "Matches", value: fieldingStats.matches },
                    { label: "Catches", value: fieldingStats.catches },
                    { label: "Caught Behind", value: fieldingStats.caughtBehind },
                    { label: "Run Out", value: fieldingStats.runOut },
                    { label: "Stumpings", value: fieldingStats.stumpings },
                    { label: "Ass Run Out", value: fieldingStats.assistedRunOuts },
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

export default FieldingStats;
