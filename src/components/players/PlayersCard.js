import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import PlaceIcon from '@mui/icons-material/Place';
import { Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function stringAvatar(name) {
  if (!name) return {};

  const nameParts = name.split(' ');
  const initials = nameParts.length === 1
    ? `${nameParts[0][0]}`
    : `${nameParts[0][0]}`;

  return {
    sx: {
      width: 150,
      height: 150,
      fontSize: 70,
      fontWeight: "bold",
      m: 1,
      bgcolor: "lightgray",
    },
    children: initials,
  };
}

const PlayersCard = ({ playersList }) => {
  const navigate = useNavigate();

  const handleCardClick = (userName, id, name, roleAsBatsman, roleAsBowler, location) => {
    navigate(`/user/view-player/${userName}/${id}/${name}/${roleAsBatsman}/${roleAsBowler}/${location}`);
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'center' }}>
      {playersList.map((player, index) => (
        <Card 
          key={index} 
          sx={{ 
            width: '100%', 
            maxWidth: 470, 
            padding: '7px', 
            m: 3, 
            cursor: 'pointer', 
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': { 
              transform: 'scale(1.02)', 
              boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)' 
            }
          }} 
          onClick={() => handleCardClick(player.userName, player._id, player.name, player.location, player.roleAsBatsman, player.roleAsBowler)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Box sx={{
                display: 'flex',
                justifyContent: { xs: 'center', md: 'left' },
                padding: { xs: 2, md: 0 },
                paddingLeft: { md: "30px" },
                alignItems: 'center',
                height: { xs: 200, md: 200 },
              }}>
                {player.name && <Avatar {...stringAvatar(player.name)} />}
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" align='center'>
                  <b>{player.name}</b>
                </Typography>
                <Typography variant="body2" align='center'>
                  <PlaceIcon sx={{ fontSize: "17px" }} /> {player.location}
                </Typography>
                <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
                <Typography variant="body2" align='center'>
                  {player.roleAsBatsman} | {player.roleAsBowler}
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      ))}
    </div>
  );
};

export default PlayersCard;
