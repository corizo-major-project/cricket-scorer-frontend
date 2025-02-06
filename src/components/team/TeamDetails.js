import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Avatar, Typography, useMediaQuery, Container, Divider, Tabs, Tab, CircularProgress, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import { useParams } from 'react-router-dom';
import { getTeam } from '../../apis/axiosRequest';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import dayjs from 'dayjs';
import TeamMembers from './TeamMembers';
import TeamStats from './TeamStats';
import TeamProfile from './TeamProfile';
import { useAuth } from '../../token/AuthContext';
import EditIcon from '@mui/icons-material/Edit';
import EditTeamDialog from './EditTeamDialog';

function stringAvatar(name) {
    if (!name) return {};

    const nameParts = name.split(' ');
    const initials = nameParts.length === 1
        ? `${nameParts[0][0]}`
        : `${nameParts[0][0]}${nameParts[1][0]}`;

    return {
        sx: {
            width: 150,
            height: 150,
            fontSize: 70,
            fontWeight: "bold",
            bgcolor: "lightgray",
        },
        children: initials,
    };
}

const CardContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center", // Centers content within the CardContainer
    width: "100%",
    padding: theme.spacing(2),
    backgroundColor: "#363e45",
    paddingTop: theme.spacing(20),
    boxShadow: theme.shadows[1],
    borderRadius: theme.shape.borderRadius,
}));

const FlexContainer = styled(Container)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Align LeftSection and RightSection at corners
    padding: theme.spacing(2, 0),
}));

const LeftSection = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing(2),
}));

const RightSection = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: theme.spacing(2),
}));

const StatBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#363745",
    color: theme.palette.primary.contrastText,
    textAlign: "center",
    minWidth: 120,
    minHeight: 60,
    height: 80,
}));

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            style={{
                backgroundColor: '#f3f4f4', // Background color for content
                border: '1px solid #e0e0e0', // Border for tab content
                borderTop: 'none', // Remove the top border to avoid double borders
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Light shadow for content
                borderRadius: 2, // Rounded corners for content area
                padding: 2,
            }}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


const TeamDetails = () => {
    const { userName } = useAuth();
    const { teamName } = useParams();
    const isMobile = useMediaQuery("(max-width:600px)");
    const [value, setValue] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [teamDetails, setTeamDetails] = useState({});
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleScroll = () => {
        if (window.scrollY > 20) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        const getTeamDetailsFun = async () => {
            try {
                const response = await getTeam(teamName);
                setTeamDetails(response.data.team);
            } catch (error) {
                setTeamDetails({});
            }
        }

        getTeamDetailsFun();
        // eslint-disable-next-line
    }, [teamName]);

    if (!setTeamDetails) {
        return (
            <div style={{ backgroundColor: '#f4f2ee' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress />
                </Box>
            </div>
        )
    }

    return (
        <div style={{ backgroundColor: '#f4f2ee' }}>
            <CardContainer>
                <FlexContainer maxWidth="lg">
                    {/* Left Section */}
                    <LeftSection>
                        <Avatar {...stringAvatar(teamDetails.teamName)} />
                        <Box>
                            <Box display="flex" alignItems="center" justifyContent="space-between">
                                <Typography variant="h4" sx={{ color: "white", fontWeight: "bold" }}>
                                    {teamDetails.teamName}
                                </Typography>
                                {userName === teamDetails.userName && (
                                    <IconButton onClick={handleClickOpen}>
                                        <EditIcon sx={{ color: "white", ml: 1 }} />
                                    </IconButton>
                                )}
                                <EditTeamDialog open={open} handleClose={handleClose} teamDetails={teamDetails} />
                            </Box>
                            <Typography variant="body1" color="white">
                                {teamDetails.location}
                            </Typography>
                            <Divider sx={{
                                mt: 2,
                                mb: 2,
                                borderColor: 'lightgray',
                                borderWidth: 2,
                                borderStyle: 'dashed',
                            }} />
                            <Typography variant="body1" color="white">
                                Since: {teamDetails.createdAt ? dayjs(teamDetails.createdAt).utc().format("DD MMM YYYY") : "N/A"}
                            </Typography>

                        </Box>
                    </LeftSection>

                    {!isMobile && (
                        <RightSection>
                            <StatBox>
                                <Typography variant="h6"><b>{teamDetails?.stats?.matches ?? "NaN"}</b></Typography>
                                <Typography variant="subtitle1">Matches</Typography>

                            </StatBox>
                            <StatBox>
                                <Typography variant="h6"><b>{teamDetails?.stats?.won ?? "NaN"}</b></Typography>
                                <Typography variant="subtitle1">Won</Typography>
                            </StatBox>
                            <StatBox>
                                <Typography variant="h6"><b>{teamDetails?.stats?.lost ?? "NaN"}</b></Typography>
                                <Typography variant="subtitle1">Lost</Typography>
                            </StatBox>
                        </RightSection>
                    )}
                </FlexContainer>
            </CardContainer>
            <Container maxWidth="lg">
                {/* Sticky Tabs */}
                <Box
                    sx={{
                        borderBottom: 1,
                        borderColor: 'divider',
                        backgroundColor: '#363e45', // Background color of the tabs
                        borderRadius: '8px 8px 0 0', // Radius on top corners to match the container
                        overflowX: 'auto', // Enable horizontal scrolling
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        border: '1px solid #e0e0e0', // Light gray border
                    }}
                >
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor="inherit" // Inherit text color for tabs
                        indicatorColor="transparent" // Make sure the default indicator is transparent
                        TabIndicatorProps={{
                            style: {
                                backgroundColor: 'white', // Set the underline (indicator) to white
                            },
                        }}
                        variant="fullWidth"
                        scrollButtons="auto"
                        sx={{
                            minWidth: 'fit-content', // Ensure the width adapts to content
                            width: '100%',
                            display: 'flex',
                            padding: 0,
                            backgroundColor: '#363e45', // Background color of the tab container
                            '& .MuiTab-root': {
                                color: 'white', // Ensure all tabs have white text
                            },
                        }}
                    >
                        <Tab label="MEMBERS" {...a11yProps(0)} />
                        <Tab label="MATCHES" {...a11yProps(1)} />
                        <Tab label="STATS" {...a11yProps(2)} />
                        <Tab label="PROFILE" {...a11yProps(3)} />
                    </Tabs>
                </Box>

                {/* Content */}
                <Box>
                    <CustomTabPanel value={value} index={0}>
                        <TeamMembers members={teamDetails.members} />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        MATCHES
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        <TeamStats stats={teamDetails.stats} />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={3}>
                        <TeamProfile teamDetails={teamDetails} />
                    </CustomTabPanel>
                </Box>
            </Container>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    style={{
                        display: "block",
                        position: "fixed",
                        bottom: "20px",
                        right: "30px",
                        zIndex: 99,
                        fontSize: "18px",
                        border: "none",
                        outline: "none",
                        color: "black",
                        cursor: "pointer",
                        padding: "15px",
                        borderRadius: "4px",
                    }}
                    title="Go to top"
                >
                    <ArrowCircleUpIcon sx={{ fontSize: 30 }} />
                </button>
            )}
        </div>
    );
};

export default TeamDetails;
