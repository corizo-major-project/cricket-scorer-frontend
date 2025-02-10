import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import LiveMatches from './LiveMatches';
import UpcomingMatches from './UpcomingMatches';
import EndedMatches from './EndedMatches';
import CancelledMatches from './CancelledMatches';

const defaultTheme = createTheme();

const MyMatches = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Box sx={{ padding: '20px', paddingTop: '115px', display: 'flex', marginTop: '30px', flexDirection: 'column', alignItems: 'center', backgroundColor: '#f4f2ee' }}>
                <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: 'background.paper'}}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons
                        allowScrollButtonsMobile
                        aria-label="scrollable force tabs example"
                    >
                        <Tab label="LIVE" />
                        <Tab label="UPCOMING" />
                        <Tab label="ENDED" />
                        <Tab label="CANCELLED" />
                    </Tabs>
                </Box>

                <Box sx={{ marginTop: 3, width: '100%', textAlign: 'center' }}>
                    {value === 0 && <LiveMatches />}
                    {value === 1 && <UpcomingMatches />}
                    {value === 2 && <EndedMatches />}
                    {value === 3 && <CancelledMatches />}
                </Box>

            </Box>
        </ThemeProvider>
    )
}

export default MyMatches