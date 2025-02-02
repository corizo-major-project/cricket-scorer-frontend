import React, { useState, useEffect } from 'react';
import { getAllPlayers } from "../../apis/axiosRequest";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import PlayersCard from './PlayersCard';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

const defaultTheme = createTheme();

const Player = () => {
    const [pageDetails, setPageDetails] = useState({
        page_size: 10,
        page_no: 1
    });

    const [playersCount, setPlayersCount] = useState(0);
    const [playersList, setPlayersList] = useState([]);
    const [isVisible, setIsVisible] = useState(false);

    const totalPages = Math.ceil(playersCount / 10);

    // Show "Scroll to Top" button when page is scrolled down 20px
    const handleScroll = () => {
        if (window.scrollY > 20) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const handlePageChange = (event, page) => {
        // Update the current page number and scroll to top
        setPageDetails({ ...pageDetails, page_no: page });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllPlayers(pageDetails.page_size, pageDetails.page_no);
                setPlayersCount(response.data.totalPlayerCount);
                setPlayersList(response.data.players);
            } catch (error) {
                // Handle errors here...
                alert("Network or server error occurred. Please check your connection and try again.");
            }
        };

        fetchData();
    }, [pageDetails.page_size, pageDetails.page_no]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Box sx={{ padding: '20px', display: 'flex', marginTop: '110px', flexDirection: 'column', alignItems: 'center', backgroundColor: '#f4f2ee' }}>
                {playersList.length > 0 ? (
                    <PlayersCard playersList={playersList} />
                ) : (
                    <p style={{ textAlign: "center" }}>Loading.........</p>
                )}
                <Box>
                    <Stack spacing={2}>
                        <Pagination
                            count={totalPages}
                            showFirstButton
                            showLastButton
                            size="large"
                            onChange={handlePageChange}
                            sx={{
                                "& .MuiPaginationItem-page": {
                                    color: "black", // Ensure the numbers are visible
                                    fontWeight: "bold", // Optional: Make the numbers bold
                                },
                                "& .MuiPaginationItem-ellipsis": {
                                    color: "black", // Ellipsis color
                                },
                                "& .MuiPaginationItem-root": {
                                    "&:hover": {
                                        backgroundColor: "#f0f0f0", // Hover effect
                                    },
                                },
                            }}
                        />
                    </Stack>
                </Box>

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
                        <ArrowCircleUpIcon sx={{ fontSize: 30 }}/>
                    </button>
                )}
            </Box>
        </ThemeProvider>
    );
};

export default Player;
