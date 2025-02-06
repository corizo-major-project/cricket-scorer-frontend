import React, { useState } from "react";
import { TextField, Button, Grid, Container, FormControl, InputLabel } from "@mui/material";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { useNavigate } from "react-router-dom";

const UpdateTeam = ({ teamDetails }) => {
    const navigate = useNavigate();
    
    // Extract State and Country from location
    const [state, country] = teamDetails.location ? teamDetails.location.split(", ").map(item => item.trim()) : ["", ""];

    const [teamForm, setTeamForm] = useState({
        teamName: teamDetails.teamName || "",
        location: teamDetails.location || "",
        members: teamDetails.members || [],
    });

    const [selectedState, setSelectedState] = useState(state);
    const [selectedCountry, setSelectedCountry] = useState(country);

    const handleCountryChange = (value) => {
        setSelectedCountry(value);
        setTeamForm(prev => ({ ...prev, location: selectedState ? `${selectedState}, ${value}` : value }));
    };

    const handleStateChange = (value) => {
        setSelectedState(value);
        setTeamForm(prev => ({ ...prev, location: selectedCountry ? `${value}, ${selectedCountry}` : value }));
    };

    const handleInputChange = (e) => {
        setTeamForm({ ...teamForm, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Perform update API call here
        console.log("Updated Team Data:", teamForm);
        navigate("/user/view-teams");
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 10, p: 3, backgroundColor: "#f9f9f9", borderRadius: "8px", boxShadow: 2 }}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField fullWidth label="Team Name" name="teamName" value={teamForm.teamName} onChange={handleInputChange} variant="outlined" required />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel shrink>Select Country</InputLabel>
                            <CountryDropdown value={selectedCountry} onChange={handleCountryChange} style={{ width: "100%", padding: "10px" }} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel shrink>Select State</InputLabel>
                            <RegionDropdown country={selectedCountry} value={selectedState} onChange={handleStateChange} style={{ width: "100%", padding: "10px" }} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>Update Team</Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default UpdateTeam;
