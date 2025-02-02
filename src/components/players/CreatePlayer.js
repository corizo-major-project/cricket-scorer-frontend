import React, { useState } from "react";
import { TextField, Button, Grid, Container, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { useAuth } from "../../token/AuthContext";
import { useNavigate } from "react-router-dom";
import { createPlayer } from "../../apis/axiosRequest";

const CreatePlayer = () => {
    const navigate = useNavigate();
    const { userName } = useAuth();
    const [playerForm, setPlayerForm] = useState({
        userName: userName, // Hidden field
        name: "",
        age: 5,
        location: "",
        roleAsBatsman: "RHB",
        roleAsBowler: "Right-Arm Fast",
    });

    const batsmanRoles = ["RHB", "LHB"];
    const bowlerRoles = [
        "Right-Arm Fast", "Left-Arm Fast",
        "Right-Arm Fast-Medium", "Left-Arm Fast-Medium",
        "Right-Arm Medium", "Left-Arm Medium",
        "Right-Arm Off-Spinner", "Left-Arm Off-Spinner",
        "Left-Arm Orthodox Spinner", "Right-Arm Orthodox Spinner"
    ];
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPlayerForm({ ...playerForm, [name]: value });
    };

    const handleCountryChange = (value) => {
        setCountry(value);
        setPlayerForm((prev) => ({
            ...prev,
            location: state ? `${state}, ${value}` : value, // Format: "State, Country"
        }));
    };

    const handleStateChange = (value) => {
        setState(value);
        setPlayerForm((prev) => ({
            ...prev,
            location: country ? `${value}, ${country}` : value, // Format: "State, Country"
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createPlayer(playerForm);
            if(response.status === 201) {
                navigate("/user/view-profile");
            }
        }
        catch(er) {
            alert("Server Error, Please Try Again Later!");
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 19, p: 3, backgroundColor: "#f9f9f9", borderRadius: "8px", boxShadow: 2 }}>
            
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {/* Name Field */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            value={playerForm.name}
                            onChange={handleInputChange}
                            variant="outlined"
                            required
                        />
                    </Grid>

                    {/* Age Field */}
                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>Age</InputLabel>
                            <Select
                                name="age"
                                value={playerForm.age}
                                onChange={handleInputChange}
                                label="Age"
                                required
                            >
                                {Array.from({ length: 96 }, (_, i) => i + 5).map((num) => (
                                    <MenuItem key={num} value={num}>
                                        {num}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>


                    {/* Country Dropdown */}
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel shrink>Select Country</InputLabel>
                            <CountryDropdown
                                value={country}
                                onChange={handleCountryChange}
                                classes="country-select"
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
                        </FormControl>
                    </Grid>

                    {/* State Dropdown */}
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel shrink>Select State</InputLabel>
                            <RegionDropdown
                                country={country}
                                value={state}
                                onChange={handleStateChange}
                                classes="state-select"
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
                        </FormControl>
                    </Grid>

                    {/* Role as Batsman */}
                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>Role as Batsman</InputLabel>
                            <Select
                                name="roleAsBatsman"
                                value={playerForm.roleAsBatsman}
                                onChange={handleInputChange}
                                label="Role as Batsman"
                                required
                            >
                                {batsmanRoles.map((role) => (
                                    <MenuItem key={role} value={role}>{role}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>Role as Bowler</InputLabel>
                            <Select
                                name="roleAsBowler"
                                value={playerForm.roleAsBowler}
                                onChange={handleInputChange}
                                label="Role as Bowler"
                                required
                            >
                                {bowlerRoles.map((role) => (
                                    <MenuItem key={role} value={role}>{role}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Submit Button */}
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Create Player
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default CreatePlayer;
