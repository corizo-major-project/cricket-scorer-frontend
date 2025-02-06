import { Avatar, Box, Card, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useMediaQuery } from '@mui/material';

dayjs.extend(utc); // Enable UTC support in dayjs

const TeamsTab = ({ teamsPlayedIn = [] }) => { // Default empty array to avoid crashes
    const isSmallScreen = useMediaQuery('(max-width:600px)'); // Mobile
    const isMediumScreen = useMediaQuery('(max-width:900px)'); // Tablets

    // If teamsPlayedIn is empty, show message
    if (!teamsPlayedIn || teamsPlayedIn.length === 0) {
        return (
            <Box sx={{ textAlign: "center", mt: 4 }}>
                <Typography variant="h6" color="text.secondary">
                    No teams to show
                </Typography>
            </Box>
        );
    }

    return (
        <Box 
            sx={{ 
                width: "100%", 
                display: "grid",
                gridTemplateColumns: isSmallScreen ? "1fr" : isMediumScreen ? "1fr 1fr" : "1fr 1fr 1fr", // 3 cards per row on large screens
                gap: 2,
                justifyContent: "center",
                mt: 2,
                px: 2 // Adds padding to avoid edge collisions on small screens
            }}
        >
            {teamsPlayedIn.map((team) => (
                <Card
                    key={team.teamId || Math.random()} // Fallback key if teamId is missing
                    sx={{ 
                        display: "flex", 
                        flexDirection: isSmallScreen ? "column" : "row", 
                        alignItems: isSmallScreen ? "center" : "flex-start", 
                        p: 2, 
                        borderRadius: 2, 
                        boxShadow: 3, 
                        maxWidth: 350, 
                        width: "100%", 
                        justifySelf: "center" // Ensures cards stay centered in grid
                    }}
                >
                    {/* Avatar with first character of teamName */}
                    <Avatar
                        sx={{
                            bgcolor: "#d3d3d3",
                            fontSize: 36, 
                            fontWeight: "bold",
                            width: 72, 
                            height: 78, 
                            mb: isSmallScreen ? 1 : 0, 
                            mr: isSmallScreen ? 0 : 2 
                        }}
                    >
                        {team.teamName ? team.teamName.charAt(0).toUpperCase() : "?"}
                    </Avatar>

                    {/* Team Details */}
                    <CardContent sx={{ flex: 1, p: 0, textAlign: isSmallScreen ? "center" : "left" }}>
                        <Typography variant="h6" fontWeight="bold">
                            {team.teamName || "Unknown Team"}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {team.since ? dayjs(team.since).utc().format("DD MMM YYYY") : "N/A"}
                        </Typography>

                        {/* Dashed Divider */}
                        <Divider sx={{ my: 1, borderStyle: "dashed" }} />

                        <Typography variant="body2" fontWeight="bold">
                            Played: {team.matchesPlayedForTeam ?? 0}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
}

export default TeamsTab;
