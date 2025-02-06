import React from "react";
import styled from "styled-components";
// Assets
import Logo from "../../../../images/logo.jpg";
import CloseIcon from "../../../../assets/svg/CloseIcon";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../../../token/AuthContext";

export default function Sidebar({ sidebarOpen, toggleSidebar }) {
    const { logout } = useAuth();
    const handleLogout = () => {
        logout();
        toggleSidebar(!sidebarOpen)
    }
    // PLAYERS, TEAMS, MY MATCHES
    return (
        <Wrapper className="animate darkBg" sidebarOpen={sidebarOpen}>
            <SidebarHeader className="flexSpaceCenter">
                <Link className="pointer flexNullCenter" to="/user/" smooth="true" onClick={() => toggleSidebar(!sidebarOpen)}>
                    <div className="flexNullCenter">
                        <img
                            src={Logo} // Replace with your image path
                            alt="Logo"
                            style={{ width: '40px', height: '40px' }} // Adjust size and margin as needed
                        />
                        <h1 className="whiteColor font20" style={{ marginLeft: "15px" }}>
                            Score Liklo
                        </h1>
                    </div>
                </Link>

                <CloseBtn onClick={() => toggleSidebar(!sidebarOpen)} className="animate pointer">
                    <CloseIcon />
                </CloseBtn>
            </SidebarHeader>

            <UlStyle className="flexNullCenter flexColumn">
                <li className="semiBold font15 pointer">
                    <NavLink
                        to="/user/live-scores"
                        onClick={() => toggleSidebar(!sidebarOpen)}
                        style={({ isActive }) => ({
                            padding: "10px 15px",
                            textDecoration: "none",
                            color: isActive ? "blue" : "white",
                            borderBottom: isActive ? "2px solid blue" : "none",
                        })}
                    >
                        LIVE SCORES
                    </NavLink>
                </li>
                <li className="semiBold font15 pointer">
                    <NavLink
                        to="/user/host-match"
                        onClick={() => toggleSidebar(!sidebarOpen)}
                        style={({ isActive }) => ({
                            padding: "10px 15px",
                            textDecoration: "none",
                            color: isActive ? "blue" : "white",
                            borderBottom: isActive ? "2px solid blue" : "none",
                        })}
                    >
                        HOST MATCH
                    </NavLink>
                </li>
                <li className="semiBold font15 pointer">
                    <NavLink
                        to="/user/view-players"
                        onClick={() => toggleSidebar(!sidebarOpen)}
                        style={({ isActive }) => ({
                            padding: "10px 15px",
                            textDecoration: "none",
                            color: isActive ? "blue" : "white",
                            borderBottom: isActive ? "2px solid blue" : "none",
                        })}
                    >
                        PLAYERS
                    </NavLink>
                </li>
                <li className="semiBold font15 pointer">
                    <NavLink
                        to="/user/view-teams"
                        onClick={() => toggleSidebar(!sidebarOpen)}
                        style={({ isActive }) => ({
                            padding: "10px 15px",
                            textDecoration: "none",
                            color: isActive ? "blue" : "white",
                            borderBottom: isActive ? "2px solid blue" : "none",
                        })}
                    >
                        TEAMS
                    </NavLink>
                </li>
                <li className="semiBold font15 pointer">
                    <NavLink
                        to="/user/my-matches"
                        onClick={() => toggleSidebar(!sidebarOpen)}
                        style={({ isActive }) => ({
                            padding: "10px 15px",
                            textDecoration: "none",
                            color: isActive ? "blue" : "white",
                            borderBottom: isActive ? "2px solid blue" : "none",
                        })}
                    >
                        MY MATCHES
                    </NavLink>
                </li>
                <li className="semiBold font15 pointer">
                    <NavLink
                        to="/user/create-team"
                        onClick={() => toggleSidebar(!sidebarOpen)}
                        style={({ isActive }) => ({
                            padding: "10px 15px",
                            textDecoration: "none",
                            color: isActive ? "blue" : "white",
                            borderBottom: isActive ? "2px solid blue" : "none",
                        })}
                    >
                        CREATE TEAM
                    </NavLink>
                </li>
                <li className="semiBold font15 pointer">
                    <NavLink
                        to="/user/contact-us"
                        onClick={() => toggleSidebar(!sidebarOpen)}
                        style={({ isActive }) => ({
                            padding: "10px 15px",
                            textDecoration: "none",
                            color: isActive ? "blue" : "white",
                            borderBottom: isActive ? "2px solid blue" : "none",
                        })}
                    >
                        CONTACT US
                    </NavLink>
                </li>
            </UlStyle>
            <UlStyle className="flexSpaceCenter">
                <li className="semiBold font15 pointer">
                    <NavLink
                        to="/user/view-profile"
                        onClick={() => toggleSidebar(!sidebarOpen)}
                        style={({ isActive }) => ({
                            padding: "10px 15px",
                            textDecoration: "none",
                            color: isActive ? "blue" : "white",
                            borderBottom: isActive ? "2px solid blue" : "none",
                        })}
                    >
                        <AccountCircleIcon fontSize="large" />
                    </NavLink>
                </li>
                <li className="semiBold font15 pointer flexCenter">
                <NavLink
                        onClick={() => handleLogout()}
                        style={({ isActive }) => ({
                            padding: "10px 15px",
                            textDecoration: "none",
                            color: isActive ? "white" : "white",
                            borderBottom: isActive ? "2px solid white" : "none",
                        })}
                    >
                        <LogoutIcon fontSize="large" />
                    </NavLink>
                </li>
            </UlStyle>
        </Wrapper>
    );
}

const Wrapper = styled.nav`
  width: 400px;
  height: 100vh;
  position: fixed;
  top: 0;
  padding: 0 30px;
  right: ${(props) => (props.sidebarOpen ? "0px" : "-400px")};
  z-index: 9999;
  overflow-y: auto;  /* Enable scrolling */
  @media (max-width: 400px) {
    width: 100%;
  }
`;

const SidebarHeader = styled.div`
  padding: 20px 0;
`;
const CloseBtn = styled.button`
  border: 0px;
  outline: none;
  background-color: transparent;
  padding: 10px;
`;
const UlStyle = styled.ul`
  padding: 20px;  /* Reduced padding */
  li {
    margin: 15px 0;  /* Slightly reduced spacing */
  }
`;
