import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import BattingStats from "./BattingStats";
import BowlingStats from "./BowlingStats";
import FieldingStats from "./FieldingStats";
import CaptainStats from "./CaptainStats";

const PlayerStats = ({ playerDetails }) => {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();

  // Detect small screens (phones)
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // True if screen < 600px

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Components mapped to tabs
  const tabComponents = [
    <BattingStats battingStats={playerDetails.battingStats} />,
    <BowlingStats bowlingStats={playerDetails.bowlingStats} />,
    <FieldingStats fieldingStats={playerDetails.fieldingStats} />,
    <CaptainStats captainRole={playerDetails.captainRole} />,
  ];

  return (
    <Box sx={{ width: "100%", textAlign: "center", mt: 2 }}>
      {/* Tabs Section */}
      <Box sx={{ width: "100%", overflowX: "auto" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          centered={!isSmallScreen} // Centered on large screens, scrollable on small
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            minWidth: "100%", // Ensure full width
            "& .MuiTabs-flexContainer": {
              gap: isSmallScreen ? "4px" : "16px",
              flexWrap: "nowrap", // Ensure scrolling works
              justifyContent: isSmallScreen ? "flex-start" : "center", // Align left on mobile
            },
            "& .MuiTabs-indicator": {
              display: "none",
            },
          }}
        >
          {["BATTING", "BOWLING", "FIELDING", "CAPTAIN"].map((label, index) => (
            <Tab
              key={index}
              label={label}
              disableRipple
              sx={{
                whiteSpace: "nowrap", // Prevents text from wrapping
                minWidth: isSmallScreen ? "90px" : "auto", // Ensures minimum width
                px: isSmallScreen ? 2 : 3, // Padding adjustments
                py: 1,
                fontSize: isSmallScreen ? "13px" : "14px",
                borderRadius: "20px",
                textTransform: "none",
                fontWeight: "bold",
                bgcolor: value === index ? "#363e45" : "grey.200",
                color: value === index ? "white !important" : "black",
                transition: "0.3s",
                "&:hover": {
                  bgcolor: value === index ? "primary.dark" : "grey.300",
                },
              }}
            />
          ))}
        </Tabs>
      </Box>

      {/* Tab Content with Spacing */}
      <Box sx={{ mt: 3 }}>{tabComponents[value]}</Box>
    </Box>
  );
};

export default PlayerStats;
