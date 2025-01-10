import { Box, Container, CssBaseline, Paper, Grid2, ThemeProvider, Typography, createTheme, TextField, Button } from '@mui/material'
import React from 'react';
import DiscoverMoreJobs from "../../images/discoverMoreJobs.png";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import JobImage from '../../images/image-job.png';

const defaultTheme = createTheme();

const locations = [
    {
        value: 'California, USA',
        label: 'California, USA',
    },
    {
        value: 'Bavaria, Germany',
        label: 'Bavaria, Germany',
    },
    {
        value: 'Queensland, Australia',
        label: 'Queensland, Australia',
    },
    {
        value: 'Ontario, Canada',
        label: 'Ontario, Canada',
    },
    {
        value: 'Maharashtra, India',
        label: 'Maharashtra, India',
    },
    {
        value: 'Western Cape, South Africa',
        label: 'Western Cape, South Africa',
    },
    {
        value: 'Hokkaido, Japan',
        label: 'Hokkaido, Japan',
    },
    {
        value: 'Auckland, New Zealand',
        label: 'Auckland, New Zealand',
    }
];


const PageInfo = () => {
    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Container maxWidth="m">
                <Box sx={{ height: '100vh' }}>
                    <Grid2 container spacing={2}>
                        <Grid2 size={6} sx={{ mt: 12, ml: 12 }}>
                            <img
                                src={DiscoverMoreJobs}
                                alt='Discover More Jobs'
                            //style={{ margin: "100px" }}
                            />
                            <Typography sx={{ ml: 4, color: '#525457' }}><b>
                                Greate Platform for the job seekers that searching for<br />
                                new career heights and passionate about startups.
                            </b>
                            </Typography>
                            <Paper
                                component="form"
                                sx={{ ml: 4, mt: 4, p: '20px 10px', display: 'flex', alignItems: 'center', width: 900 }}
                            >
                                <SearchOutlinedIcon sx={{ ml: 4, mt: 1 }} /> {/* Adding some top margin to the icon */}
                                <TextField
                                    id="filled-search"
                                    label="Job title or Keyword"
                                    type="search"
                                    variant="standard"
                                    sx={{ ml: 1, width: "300px" }}
                                    InputLabelProps={{
                                        sx: {
                                            marginBottom: '8px', // Adjust this value to fine-tune the alignment with the icon
                                        }
                                    }}
                                />
                                <FmdGoodOutlinedIcon sx={{ ml: 4, mt: 1 }} />
                                <TextField
                                    id="state-country"
                                    select
                                    defaultValue="California, USA"
                                    slotProps={{
                                        select: {
                                            native: true,
                                        },
                                    }}
                                    InputLabelProps={{
                                        sx: {
                                            marginBottom: '10px', // Adjust this value to fine-tune the alignment with the icon
                                        }
                                    }}
                                    sx={{ ml: 1, mt: 2, width: "300px" }}
                                    variant="standard"
                                >
                                    {locations.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </TextField>
                                <Button
                                    sx={{
                                        color: 'white',
                                        backgroundColor: '#073a8c',
                                        ml: 7,
                                        '&:hover': {
                                            backgroundColor: '#073a8c',
                                            color: '#fff',
                                        },
                                        width: '150px',
                                        height: '60px'
                                    }}
                                ><b>
                                        Search Jobs
                                    </b>
                                </Button>
                            </Paper>
                            <Typography sx={{ ml: 4, mt: 1, color: '#525457' }}>
                                <b>Popular:UI Designer, Web Developer, Manager, Admin</b>
                            </Typography>
                        </Grid2>
                        <Grid2 size={5} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mt: 12 }}>
                            <img
                                src={JobImage}
                                alt='Right Side'
                                style={{ marginLeft: "100px",width: '80%', height: 'auto', objectFit: 'cover' }} // Adjust width/height as necessary
                            />
                        </Grid2>
                    </Grid2>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default PageInfo