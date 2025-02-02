import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import SearchIcon from '@mui/icons-material/Search'; // Importing the Search Icon from MUI
import { useNavigate } from "react-router-dom";
import { useCurrentPage } from "../../token/CurrentPageContext";
import { Divider, List, ListItem, Paper } from "@mui/material";
import { getPlayerSearch } from "../../apis/axiosRequest";
import CloseIcon from '@mui/icons-material/Close';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [searchType, setSearchType] = useState('Search...');
  const { currentPage } = useCurrentPage();
  const [isOpen, setIsOpen] = useState(false);
  const paperRef = useRef(null);
  const navigate = useNavigate();

  const OnChangeHandler = (event) => {
    setQuery(event.target.value ?? '');
    setIsOpen(true);
  };

  const handleSearch = async () => {
    let currentPageResult = [];

    switch (currentPage) {
      case 'player':
        currentPageResult = await fetchPlayersData(query);
        break;
      case 'teams':
        currentPageResult = await fetchTeamsData(query);
        break;
      default:
        break;
    }

    setSuggestions(Array.isArray(currentPageResult) ? currentPageResult : []);
    setVisibleCount(5);
  };


  const fetchPlayersData = async (query) => {
    const response = await getPlayerSearch(query);
    const playersList = response?.data?.players || [];
    return playersList;
  };

  const fetchTeamsData = async (query) => {
    // return response.data;
  };

  useEffect(() => {
    const fetchData = async () => {
      if (query && query.length >= 2) {
        await handleSearch();
      } else {
        setSuggestions([]);
      }
    };

    fetchData().catch(console.error);
    // eslint-disable-next-line
  }, [query]);

  useEffect(() => {
    switch (currentPage) {
      case 'player':
        setSearchType('Search For a Player...');
        break;
      case 'teams':
        setSearchType('Search For a Team...');
        break;
      default:
        setSearchType('Search...');
        break;
    }
  }, [currentPage]);

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.name || suggestion.userName);
    setSuggestions([]);
    setIsOpen(false);
    switch (currentPage) {
      case 'player':
        // view-player/:userName/:id/:name/:roleAsBatsman/:roleAsBowler/:location
        navigate(`/user/view-player/${suggestion.userName}/${suggestion._id}/${suggestion.name}/${suggestion.roleAsBatsman}/${suggestion.roleAsBowler}/${suggestion.location}`);
        break;
      case 'teams':
        navigate(`team/${suggestion.name}`);
        break;
      default:
        break;
    }
  };

  const handleScroll = (event) => {
    const bottom = event.target.scrollHeight === event.target.scrollTop + event.target.clientHeight;
    if (bottom) {
      setVisibleCount((prevCount) => Math.min(prevCount + 5, suggestions.length));
    }
  };

  const handleClickOutside = (event) => {
    if (paperRef.current && !paperRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <SearchBarWrapper>
      <IconWrapper>
        <SearchIcon style={{ color: "#888" }} />
      </IconWrapper>
      <InputWrapper>
        <Input
          type="text"
          placeholder={searchType}
          value={query}
          onChange={OnChangeHandler}
        />
        {query && ( // Show cross icon only if query exists
          <ClearIconWrapper onClick={() => setQuery('')}>
            <CloseIcon style={{ color: "#888", cursor: "pointer" }} />
          </ClearIconWrapper>
        )}
      </InputWrapper>
      {isOpen && suggestions.length > 0 && (
        <Paper
          ref={paperRef}
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%', // Make it responsive
            maxWidth: '500px', // Set a max-width for larger screens
            maxHeight: '200px',
            overflowY: 'auto',
            m: 1,
            backgroundColor: '#f7f7f7',
            boxShadow: 3,
            borderRadius: '8px',

            // Responsive styles
            '@media (max-width: 600px)': {
              width: '90%', // Reduce width for smaller screens
              left: '5%', // Center the dropdown
              maxHeight: '150px', // Reduce max height for mobile
            }
          }}
          onScroll={handleScroll}
        >
          <List>
            {suggestions.slice(0, visibleCount).map((suggestion, index) => (
              <div key={suggestion.id || suggestion.email || index}>
                <ListItem
                  button
                  onClick={() => handleSuggestionClick(suggestion)}
                  sx={{ cursor: 'pointer' }}
                >
                  {suggestion.name || suggestion.userName}
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        </Paper>
      )}
    </SearchBarWrapper>
  );
};

export default SearchBar;

const SearchBarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  background-color: #f7f7f7;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 50%; /* Adjust the width to your preference */
  max-width: 500px;
  margin: 0 auto; /* Center horizontally */
  position: fixed; /* Fixed position to keep it at the top */
  top: 80px; /* Adjust according to the height of your TopNavbar */
  left: 50%;
  transform: translateX(-50%); /* Center it horizontally */
  z-index: 1000; /* Make sure it's above other content */

  /* Responsive adjustments */
  @media (max-width: 768px) {
    width: 70%; /* Increase width on smaller screens */
  }

  @media (max-width: 480px) {
    width: 80%; /* Further increase width for very small screens */
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: none;
  outline: none;
  background-color: transparent;

  &::placeholder {
    color: #aaa;
  }

  /* Ensure input text is responsive */
  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  position: relative;
`;

const ClearIconWrapper = styled.div`
  position: absolute;
  right: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;
