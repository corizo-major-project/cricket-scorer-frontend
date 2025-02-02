import React from 'react';
import Box from '@mui/material/Box';
import { Divider, Typography } from '@mui/material';

const PlayerProfile = ({ playerDetails }) => {
  return (
    <Box component="section" sx={{ p: 2, backgroundColor: "white", boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)'  }}>
      <Typography variant="body1" gutterBottom>
        <b>LOCATION</b>
      </Typography>
      <Typography variant="body1" gutterBottom>
        {playerDetails.location}
      </Typography>
      <Divider sx={{ my: 2 }}/>
      <Typography variant="body1" gutterBottom>
        <b>BATTING STYLE</b>
      </Typography>
      <Typography variant="body1" gutterBottom>
        {playerDetails.roleAsBatsman}
      </Typography>
      <Divider sx={{ my: 2 }}/>
      <Typography variant="body1" gutterBottom>
        <b>BOWLING STYLE</b>
      </Typography>
      <Typography variant="body1" gutterBottom>
        {playerDetails.roleAsBowler}
      </Typography>
    </Box>
  )
}

export default PlayerProfile