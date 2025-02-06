import React from 'react';
import Box from '@mui/material/Box';
import { Divider, Typography } from '@mui/material';
import dayjs from 'dayjs';

const TeamProfile = ({ teamDetails }) => {
  return (
    <Box component="section" sx={{ p: 2, backgroundColor: "white", boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)'  }}>
      <Typography variant="body1" gutterBottom>
        <b>LOCATION</b>
      </Typography>
      <Typography variant="body1" gutterBottom>
        {teamDetails.location}
      </Typography>
      <Divider sx={{ my: 2 }}/>
      <Typography variant="body1" gutterBottom>
        <b>SINCE</b>
      </Typography>
      <Typography variant="body1" gutterBottom>
        {teamDetails.createdAt ? dayjs(teamDetails.createdAt).utc().format("DD MMM YYYY") : "N/A"}
      </Typography>
    </Box>
  )
}

export default TeamProfile