import React, { useEffect, useRef, useState } from "react";
import { TextField, Button, Grid, Container, FormControl, InputLabel, List, ListItem, ListItemText, IconButton, Paper, Typography } from "@mui/material";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { useAuth } from "../../token/AuthContext";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";
import { createTeam, getPlayerSearch } from "../../apis/axiosRequest";
import { useNavigate } from "react-router-dom";

const CreateTeam = () => {
    const { userName } = useAuth();
    const navigate = useNavigate();
    const [teamForm, setTeamForm] = useState(
        {
            userName: userName,
            teamName: "",
            location: "",
            members: []

        });
    const [error, setError] = useState("");
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 300, left: 600, width: "200px" });
    const searchBarRef = useRef(null);
    const paperRef = useRef(null);

    useEffect(() => {
        const searchPlayers = async () => {
            if (query.length >= 2) {
                try {
                    const response = await getPlayerSearch(query);
                    setIsOpen(true);
                    setSuggestions(response?.data?.players || []);
                } catch (error) {
                    console.error("Error fetching players:", error);
                    setSuggestions([]);
                }
            } else {
                setSuggestions([]);
            }
        };

        searchPlayers();
    }, [query]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (paperRef.current && !paperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const updateDropdownPosition = () => {
            if (searchBarRef.current) {
                const rect = searchBarRef.current.getBoundingClientRect();
                setDropdownPosition({
                    top: rect.bottom + window.scrollY,
                    left: rect.left + window.scrollX,
                    width: `${rect.width}px`,
                });
            }
        };

        updateDropdownPosition();
        window.addEventListener("resize", updateDropdownPosition);
        return () => window.removeEventListener("resize", updateDropdownPosition);
    }, [query]);

    const handleCountryChange = value => {
        setCountry(value);
        setTeamForm(prev => ({ ...prev, location: state ? `${state}, ${value}` : value }));
    };

    const handleStateChange = value => {
        setState(value);
        setTeamForm(prev => ({ ...prev, location: country ? `${value}, ${country}` : value }));
    };

    const handleInputChange = e => setTeamForm({ ...teamForm, [e.target.name]: e.target.value });

    const handleSelectMember = (selectedPlayer) => {
        // Check if the player is already in the team to avoid duplicates
        const playerExists = teamForm.members.some(member => member.userName === selectedPlayer.userName);

        if (!playerExists) {
            setTeamForm(prev => ({
                ...prev,
                members: [
                    ...prev.members,
                    {
                        playerId: selectedPlayer._id,  // Store the player ID
                        userName: selectedPlayer.userName,  // Store player username
                        name: selectedPlayer.name,  // Store player's name
                        location: selectedPlayer.location,
                        roleAsBatsman: selectedPlayer.roleAsBatsman,
                        roleAsBowler: selectedPlayer.roleAsBowler
                    }
                ]
            }));
        }
        setQuery("");  // Clear the search query after selecting a player
    };


    const handleRemoveMember = member => {
        setTeamForm(prev => ({ ...prev, members: prev.members.filter(m => m !== member) }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission
        try {
            const response = await createTeam(teamForm);
            if (response.status === 201) {
                navigate("/user/view-teams");
            }
            else {
                setError(response.response?.data?.error || "Bad Request, Please Try Again!");
            }
        } catch (err) {
            setError("Server Error, Please Try Again!");
        }
    };


    return (
        <Container maxWidth="sm" sx={{ mt: 18, p: 3, backgroundColor: "#f9f9f9", borderRadius: "8px", boxShadow: 2 }}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField fullWidth label="Team Name" name="teamName" value={teamForm.teamName} onChange={handleInputChange} variant="outlined" required />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel shrink>Select Country</InputLabel>
                            <CountryDropdown value={country} onChange={handleCountryChange} style={{ width: "100%", padding: "10px" }} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel shrink>Select State</InputLabel>
                            <RegionDropdown country={country} value={state} onChange={handleStateChange} style={{ width: "100%", padding: "10px" }} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <SearchBarWrapper ref={searchBarRef}>
                            <SearchIcon style={{ color: "#888" }} />
                            <Input type="text" placeholder="Search for a Player" value={query} onChange={e => setQuery(e.target.value)} />
                            {query && <CloseIcon style={{ color: "#888", cursor: "pointer" }} onClick={() => setQuery("")} />}
                        </SearchBarWrapper>
                        {isOpen && suggestions.length > 0 && (
                            <Paper
                                ref={paperRef}
                                sx={{
                                    position: "absolute",
                                    top: dropdownPosition.top,
                                    left: dropdownPosition.left,
                                    width: dropdownPosition.width,
                                    zIndex: 10,
                                    backgroundColor: "white",
                                    maxHeight: "200px",
                                    overflowY: "auto",
                                    boxShadow: 3,
                                }}
                            >
                                <List>
                                    {suggestions.map((suggestion, index) => (
                                        <ListItem key={index} button onClick={() => handleSelectMember(suggestion)} sx={{ cursor: 'pointer' }}>
                                            <ListItemText primary={suggestion.name || suggestion.userName} />
                                        </ListItem>
                                    ))}
                                </List>
                            </Paper>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            <b>Members ({teamForm.members.length || 0})</b>
                        </Typography>
                        <List>
                            {teamForm.members.map((member, index) => (
                                <ListItem
                                    key={index}
                                    secondaryAction={
                                        <IconButton edge="end" onClick={() => handleRemoveMember(member)}>
                                            <CloseIcon />
                                        </IconButton>
                                    }
                                >
                                    <ListItemText primary={`${index + 1}. ${member.name}`} /> {/* Display player name */}
                                </ListItem>
                            ))}
                        </List>
                    </Grid>

                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>Create Team</Button>
                    </Grid>
                    {error && (
                        <Grid item xs={12}>
                            <Typography color="error" align="center">{error}</Typography>
                        </Grid>
                    )}
                </Grid>
            </form>
        </Container>
    );
};

export default CreateTeam;

const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #f7f7f7;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  margin: auto;
  position: relative;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: none;
  outline: none;
  background-color: transparent;
`;
