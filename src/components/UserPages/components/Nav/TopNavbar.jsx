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

export default function TopNavbar() {
  const [y, setY] = useState(window.scrollY);
  const [sidebarOpen, toggleSidebar] = useState(false);

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
            <li className="semiBold font15 pointer">
              <a href="/user/view-profile" style={{ padding: "10px 30px 10px 0" }}>
                <AccountCircleIcon fontSize="large"/>
              </a>
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


