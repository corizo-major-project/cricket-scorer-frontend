import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
// Components
import Sidebar from "./Sidebar";
import Backdrop from "../../../WelcomePage/components/Elements/Backdrop";
// Assets
// import JobDeklo from "../../../../images/JobDekloIcon.png"
import Logo from "../../../../images/logo.jpg";
import BurgerIcon from "../../../../assets/svg/BurgerIcon";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from "../../../../token/AuthContext";

export default function TopNavbar() {
  const { userName } = useAuth();
  const { logout } = useAuth();
  const [y, setY] = useState(window.scrollY);
  const [sidebarOpen, toggleSidebar] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => setY(window.scrollY));
    return () => {
      window.removeEventListener("scroll", () => setY(window.scrollY));
    };
  }, [y]);


  return (
    <>
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      {sidebarOpen && <Backdrop toggleSidebar={toggleSidebar} />}
      <Wrapper className="flexCenter animate whiteBg" style={y > 100 ? { height: "60px" } : { height: "80px" }}>
        <NavInner className="container flexSpaceCenter">
          <Link className="pointer flexNullCenter" to="/user/" smooth={true}>
            <img
              src={Logo} // Replace with your image path
              alt="Logo"
              style={{ width: '40px', height: '40px' }} // Adjust size and margin as needed
            />
            <h1 style={{ marginLeft: "15px" }} className="font20 extraBold">
              Score Liklo
            </h1>
          </Link>
          <BurderWrapper className="pointer" onClick={() => toggleSidebar(!sidebarOpen)}>
            <BurgerIcon />
          </BurderWrapper>
          <UlWrapper className="flexNullCenter">
            <li className="semiBold font15 pointer">
              <NavLink
                to="/user/live-scores"
                style={({ isActive }) => ({
                  padding: "10px 15px",
                  textDecoration: "none",
                  color: isActive ? "blue" : "inherit",
                  borderBottom: isActive ? "2px solid blue" : "none",
                })}
              >
                LIVE SCORES
              </NavLink>
            </li>
            <li className="semiBold font15 pointer">
              <NavLink
                to="/user/host-match"
                style={({ isActive }) => ({
                  padding: "10px 15px",
                  textDecoration: "none",
                  color: isActive ? "blue" : "inherit",
                  borderBottom: isActive ? "2px solid blue" : "none",
                })}
              >
                HOST MATCH
              </NavLink>
            </li>
            <li className="semiBold font15 pointer">
              <NavLink
                to="/user/view-players"
                style={({ isActive }) => ({
                  padding: "10px 15px",
                  textDecoration: "none",
                  color: isActive ? "blue" : "inherit",
                  borderBottom: isActive ? "2px solid blue" : "none",
                })}
              >
                PLAYERS
              </NavLink>
            </li>
            <li className="semiBold font15 pointer">
              <NavLink
                to="/user/view-teams"
                style={({ isActive }) => ({
                  padding: "10px 15px",
                  textDecoration: "none",
                  color: isActive ? "blue" : "inherit",
                  borderBottom: isActive ? "2px solid blue" : "none",
                })}
              >
                TEAMS
              </NavLink>
            </li>
            <li className="semiBold font15 pointer">
              <NavLink
                to="/user/my-matches"
                style={({ isActive }) => ({
                  padding: "10px 15px",
                  textDecoration: "none",
                  color: isActive ? "blue" : "inherit",
                  borderBottom: isActive ? "2px solid blue" : "none",
                })}
              >
                MY MATCHES
              </NavLink>
            </li>
            <li className="semiBold font15 pointer">
              <NavLink
                to="/user/contact-us"
                style={({ isActive }) => ({
                  padding: "10px 15px",
                  textDecoration: "none",
                  color: isActive ? "blue" : "inherit",
                  borderBottom: isActive ? "2px solid blue" : "none",
                })}
              >
                CONTACT US
              </NavLink>
            </li>
          </UlWrapper>
          <UlWrapperRight className="flexNullCenter">
            <li className="semiBold font15 pointer" style={{ position: "relative" }}>
              <ProfileIcon onClick={() => setDropdownOpen(!dropdownOpen)}>
                <AccountCircleIcon fontSize="large" />
              </ProfileIcon>
              {dropdownOpen && (
                <DropdownMenu>
                  <p className="user-name">{userName}</p>
                  <Link to="/user/view-profile" className="profile-link">
                    Profile
                  </Link>
                  <Link to="/user/view-profile" className="profile-link">
                    Create Team
                  </Link>
                  <button className="logout-button" onClick={logout}>
                    Logout
                  </button>
                </DropdownMenu>
              )}
            </li>
          </UlWrapperRight>
        </NavInner>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.nav`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
`;
const NavInner = styled.div`
  position: relative;
  height: 100%;
`
const BurderWrapper = styled.button`
  outline: none;
  border: 0px;
  background-color: transparent;
  height: 100%;
  padding: 0 15px;
  display: none;
  @media (max-width: 760px) {
    display: block;
  }
`;
const UlWrapper = styled.ul`
  display: flex;
  @media (max-width: 760px) {
    display: none;
  }
`;
const UlWrapperRight = styled.ul`
  @media (max-width: 760px) {
    display: none;
  }
`;

const ProfileIcon = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  background: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 150px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  text-align: left;

  .user-name {
    font-size: 14px;
    font-weight: bold;
    padding: 5px 10px;
    border-bottom: 1px solid #ddd;
  }

  .profile-link {
    font-size: 14px;
    font-weight: bold;
    color: #363e45;
    text-decoration: none;
    padding: 10px;
    &:hover {
      background: #f5f5f5;
    }
  }

  .logout-button {
    font-size: 14px;
    background: none;
    border: none;
    color: red;
    padding: 10px;
    cursor: pointer;
    text-align: left;
    &:hover {
      background: #f5f5f5;
    }
  }
`;


