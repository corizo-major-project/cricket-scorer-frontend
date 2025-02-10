import React, { useEffect, useState } from 'react';
import { fetchMatches } from '../../apis/axiosRequest';
import { Card, CardContent, Typography, Grid, Box, Divider, Button } from '@mui/material';
import { styled } from '@mui/system';
import dayjs from 'dayjs';

// Styled component for the match status
const StatusBadge = styled(Box)(({ theme }) => ({
    backgroundColor: '#363e45',
    color: 'white',
    borderRadius: '15px',
    padding: '4px 12px',
    fontSize: '12px',
    fontWeight: 'bold',
    display: 'inline-block'
}));

const UpcomingMatches = () => {
    const [matches, setMatches] = useState([]);

    const handleStartMatch = () => {

    }

    useEffect(() => {
        const fetchUpcomingMatches = async () => {
            try {
                const response = await fetchMatches("UPCOMING");
                setMatches(response.data);
            }
            catch (err) {
                alert("Server Error, Please Try Again Later!");
            }
        };

        fetchUpcomingMatches();
    }, []);

    if (matches.length === 0) {
        return (
            <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
            >
                <p style={{ textAlign: 'center' }}>No Upcoming Matches Scheduled!</p>
            </Grid>

        )
    }

    return (
        <Grid sx={{ display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'center' }}>
            {matches.map((match, index) => (
                <Grid item xs={12} sm={6} key={index}>
                    <Card sx={{ borderRadius: 3, boxShadow: 3, padding: 2, width: '100%', maxWidth: 470 }}>
                        <CardContent>
                            {/* Match Type */}
                            <Typography align="center" variant="body1" fontWeight="bold">
                                {match.matchType}
                            </Typography>
                            <Divider sx={{ my: 1 }} />

                            {/* Venue & Date + Status */}
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Box sx={{ flex: 1 }}>
                                    <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
                                        {match.venue}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {dayjs(match.matchDateAndTime).format("DD MMM YYYY, hh:mm A")}
                                    </Typography>
                                </Box>
                                <StatusBadge>UPCOMING</StatusBadge>
                            </Box>

                            {/* Teams - Aligned left and in the same space as venue */}
                            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mt: 1 }}>
                                <Typography variant="h6" fontWeight="bold" sx={{ ml: 3 }}>
                                    {match.teamA.teamName}
                                </Typography>
                                <Box display="flex" alignItems="baseline">
                                    <Typography variant="h6" fontWeight="bold" sx={{ mr: 1 }}>
                                        0/0
                                    </Typography>
                                    <Typography variant="body2" color="gray">
                                        (0.0/{match.overs})
                                    </Typography>
                                </Box>
                            </Box>

                            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mt: 1 }}>
                                <Typography variant="h6" fontWeight="bold" sx={{ ml: 3 }}>
                                    {match.teamB.teamName}
                                </Typography>
                                <Box display="flex" alignItems="baseline">
                                    <Typography variant="h6" fontWeight="bold" sx={{ mr: 1 }}>
                                        0/0
                                    </Typography>
                                    <Typography variant="body2" color="gray">
                                        (0.0/{match.overs})
                                    </Typography>
                                </Box>
                            </Box>


                            <Divider sx={{ my: 1 }} />

                            {/* Match Status */}
                            <Button
                                variant="contained"
                                fullWidth
                                sx={{ mt: 2, borderRadius: 3, backgroundColor: "#363e45" }}
                                onClick={() => handleStartMatch(match.matchId, match.matchType)}
                            >
                                Start Match
                            </Button>

                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>

    );
};

export default UpcomingMatches;
