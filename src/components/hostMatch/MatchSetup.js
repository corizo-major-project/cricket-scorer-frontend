import React, { useEffect, useState } from "react";
import { TextField, MenuItem, Button, Box, Typography, Dialog, Container, List, ListItem, ListItemText, Checkbox, Grid } from "@mui/material";
import { useAuth } from "../../token/AuthContext";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { createMatch, getTeamMembers, getTeamSearch } from "../../apis/axiosRequest";
import { useNavigate } from "react-router-dom";

const MatchSetup = () => {
  const navigate = useNavigate();
  const { userName } = useAuth();
  const [teamA, setTeamA] = useState(null);
  const [teamB, setTeamB] = useState(null);
  const [matchType, setMatchType] = useState("ODI");
  const [overs, setOvers] = useState(0);
  const [venue, setVenue] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [teamMembersA, setTeamMembersA] = useState([]);
  const [teamMembersB, setTeamMembersB] = useState([]);
  const [selectedPlayersTeamA, setSelectedPlayersTeamA] = useState([]);
  const [selectedPlayersTeamB, setSelectedPlayersTeamB] = useState([]);
  const [captainTeamA, setCaptainTeamA] = useState(null);
  const [viceCaptainTeamA, setViceCaptainTeamA] = useState(null);
  const [captainTeamB, setCaptainTeamB] = useState(null);
  const [viceCaptainTeamB, setViceCaptainTeamB] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState("A");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (query.length >= 2) {
      getTeamSearch(query).then(response => {
        setSuggestions(response?.data?.teams || []);
      }).catch(error => console.error("Error fetching teams:", error));
    } else {
      setSuggestions([]);
    }
  }, [query]);

  useEffect(() => {
    if (matchType === "ODI") setOvers(50);
    else if (matchType === "T20") setOvers(20);
    else setOvers(0);
  }, [matchType]);

  const handleOpenDialog = (team) => {
    if (team === "A" && teamA) {
      setSelectedTeam("A");
    } else if (team === "B" && teamB) {
      setSelectedTeam("B");
    } else {
      setOpenDialog(true);
    }
  };

  const handleTeamSelect = async (team) => {
    if (!teamA) {
      setTeamA(team);
      setSelectedTeam("A");
      try {
        const response = await getTeamMembers(team.teamName);
        setTeamMembersA(response?.data?.members || []);
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    } else if (!teamB && team.teamName !== teamA?.teamName) {
      setTeamB(team);
      setSelectedTeam("B");
      try {
        const response = await getTeamMembers(team.teamName);
        setTeamMembersB(response?.data?.members || []);
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    } else {
      alert("Team B must be different from Team A.");
      return;
    }
    setOpenDialog(false);
  };


  const handlePlayerSelection = (player, team) => {
    if (team === "A") {
      setSelectedPlayersTeamA(prev => prev.includes(player) ? prev.filter(p => p !== player) : [...prev, player]);
    } else if (team === "B" && !selectedPlayersTeamA.includes(player)) {
      setSelectedPlayersTeamB(prev => prev.includes(player) ? prev.filter(p => p !== player) : [...prev, player]);
    }
  };

  const handleCaptainChange = (player, team) => {
    if (team === "A") {
      setCaptainTeamA(player);
      if (player === viceCaptainTeamA) setViceCaptainTeamA(""); // Reset vice-captain if it's the same
    } else {
      setCaptainTeamB(player);
      if (player === viceCaptainTeamB) setViceCaptainTeamB("");
    }
  };

  const handleViceCaptainChange = (player, team) => {
    if (team === "A") {
      setViceCaptainTeamA(player);
    } else {
      setViceCaptainTeamB(player);
    }
  };

  const handleSubmit = async () => {
    try {
      setErrorMessage(""); // Clear previous errors

      const matchForm = {
        userName: userName,
        venue: venue,
        matchType: matchType,
        overs: overs,
        matchDateAndTime: dateTime,
        teamA: {
          teamId: teamA._id,
          teamName: teamA.teamName,
          captain: {
            playerId: captainTeamA.playerId,
            userName: captainTeamA.userName,
            name: captainTeamA.name
          },
          viceCaptain: {
            playerId: viceCaptainTeamA.playerId,
            userName: viceCaptainTeamA.userName,
            name: viceCaptainTeamA.name
          },
          playingMembers: selectedPlayersTeamA.map(player => ({
            playerId: player.playerId,
            userName: player.userName,
            name: player.name
          })),
          scorer: {
            playerId: captainTeamA.playerId,
            userName: captainTeamA.userName,
            name: captainTeamA.name
          }
        },
        teamB: {
          teamId: teamB._id,
          teamName: teamB.teamName,
          captain: {
            playerId: captainTeamB.playerId,
            userName: captainTeamB.userName,
            name: captainTeamB.name
          },
          viceCaptain: {
            playerId: viceCaptainTeamB.playerId,
            userName: viceCaptainTeamB.userName,
            name: viceCaptainTeamB.name
          },
          playingMembers: selectedPlayersTeamB.map(player => ({
            playerId: player.playerId,
            userName: player.userName,
            name: player.name
          })),
          scorer: {
            playerId: captainTeamB.playerId,
            userName: captainTeamB.userName,
            name: captainTeamB.name
          }
        }
      };
      console.log(matchForm);

      const response = await createMatch(matchForm);
      console.log(response);

      if (response.status === 201) {
        navigate("/user/my-matches");
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        const statusCode = error.response.status;

        let errorMessage;
        switch (statusCode) {
          case 403:
            errorMessage = "You are not authorized to create this match.";
            break;
          case 400:
            errorMessage = error.response.data.error || "Invalid match details provided.";
            break;
          case 500:
            errorMessage = "Server error occurred while creating the match. Please try again later.";
            break;
          default:
            errorMessage = "Unexpected error occurred. Please try again.";
        }

        setErrorMessage(errorMessage);
      } else {
        setErrorMessage("Network error. Please check your connection and try again.");
      }
    }
  };


  return (
    <Container maxWidth="sm" sx={{ backgroundColor: 'white', mt: 19, borderRadius: 5, p: 3, boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
      <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
        <Typography variant="h5">Match Setup</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="Venue" value={venue} onChange={(e) => setVenue(e.target.value)} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField type="datetime-local" value={dateTime} onChange={(e) => setDateTime(e.target.value)} fullWidth />
          </Grid>
        </Grid>
        <TextField select label="Match Type" value={matchType} onChange={(e) => setMatchType(e.target.value)} fullWidth>
          {["ODI", "T20", "CUSTOMIZED"].map(type => <MenuItem key={type} value={type}>{type}</MenuItem>)}
        </TextField>
        {matchType === "CUSTOMIZED" && <TextField select label="Overs" value={overs} onChange={(e) => setOvers(e.target.value)} fullWidth>
          {Array.from({ length: 46 }, (_, i) => i + 1).map(num => <MenuItem key={num} value={num}>{num}</MenuItem>)}
        </TextField>}
        <Box display="flex" justifyContent="space-around" width="100%">
          {[teamA, teamB].map((team, index) => (
            <Box key={index} textAlign="center"
              sx={{ width: 120, height: 120, bgcolor: "#363e45", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
              onClick={() => handleOpenDialog(index === 0 ? "A" : "B")}
            >
              <Typography variant="h6" color="white">{team ? team.teamName : "+"}</Typography>
            </Box>
          ))}
        </Box>
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
          <Box p={2}>
            <SearchBarWrapper>
              <SearchIcon style={{ color: "#888" }} />
              <Input type="text" placeholder="Search for a Team" value={query} onChange={e => setQuery(e.target.value)} />
              {query && <CloseIcon style={{ color: "#888", cursor: "pointer" }} onClick={() => setQuery("")} />}
            </SearchBarWrapper>
            <List>
              {suggestions.map((suggestion, index) => (
                <ListItem key={index} button onClick={() => handleTeamSelect(suggestion)} sx={{ cursor: 'pointer' }}>
                  <ListItemText primary={suggestion.teamName || suggestion.userName} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Dialog>
        {selectedTeam === "A" && teamMembersA.length > 0 && (
          <Box sx={{ border: "2px solid black", borderRadius: "8px", padding: "16px", marginTop: "16px" }}>
            <Typography variant="h6">Select Players for {teamA?.teamName}</Typography>
            <List>
              <ListItem>
                <ListItemText primary="Player Name" />
              </ListItem>

              {teamMembersA.map(member => (
                <ListItem key={member.id}>
                  <Checkbox
                    checked={selectedPlayersTeamA.includes(member)}
                    onChange={() => handlePlayerSelection(member, "A")}
                  />
                  <ListItemText primary={member.name} />
                </ListItem>
              ))}
            </List>
            <TextField select label="Captain" value={captainTeamA} onChange={(e) => handleCaptainChange(e.target.value, "A")} fullWidth>
              {selectedPlayersTeamA.map(player => (
                <MenuItem key={player.id} value={player}>{player.name}</MenuItem>
              ))}
            </TextField>

            {/* Vice Captain Selection (Disabled until Captain is selected) */}
            <TextField
              select
              label="Vice Captain"
              value={viceCaptainTeamA}
              onChange={(e) => handleViceCaptainChange(e.target.value, "A")}
              disabled={!captainTeamA}
              fullWidth
              sx={{ mt: 2 }}
            >
              {selectedPlayersTeamA
                .filter(player => player !== captainTeamA)
                .map(player => (
                  <MenuItem key={player.id} value={player}>{player.name}</MenuItem>
                ))}
            </TextField>
          </Box>
        )}

        {selectedTeam === "B" && teamMembersB.length > 0 && (
          <Box sx={{ border: "2px solid black", borderRadius: "8px", padding: "16px", marginTop: "16px" }}>
            <Typography variant="h6">Select Players for {teamB?.teamName}</Typography>
            <List>
              {teamMembersB.map(member => (
                <ListItem key={member.id}>
                  <Checkbox
                    checked={selectedPlayersTeamB.includes(member)}
                    onChange={() => handlePlayerSelection(member, "B")}
                  />
                  <ListItemText primary={member.name} />
                </ListItem>
              ))}
            </List>
            <TextField select label="Captain" value={captainTeamB} onChange={(e) => handleCaptainChange(e.target.value, "B")} fullWidth>
              {selectedPlayersTeamB.map(player => (
                <MenuItem key={player.id} value={player}>{player.name}</MenuItem>
              ))}
            </TextField>

            {/* Vice Captain Selection (Disabled until Captain is selected) */}
            <TextField
              select
              label="Vice Captain"
              value={viceCaptainTeamB}
              onChange={(e) => handleViceCaptainChange(e.target.value, "B")}
              disabled={!captainTeamB}
              fullWidth
              sx={{ mt: 2 }}
            >
              {selectedPlayersTeamB
                .filter(player => player !== captainTeamB)
                .map(player => (
                  <MenuItem key={player.id} value={player}>{player.name}</MenuItem>
                ))}
            </TextField>
          </Box>
        )}

        <Button variant="contained" color="primary" disabled={!teamA || !teamB} onClick={() => handleSubmit()}>
          Host Match
        </Button>
        {errorMessage && (
          <p style={{ color: "red", marginTop: "8px" }}>
            {errorMessage}
          </p>
        )}
      </Box>
    </Container>
  )
}

export default MatchSetup

const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #f7f7f7;
  border-radius: 8px;
  width: 100%;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: none;
  outline: none;
  background-color: transparent;
`;
