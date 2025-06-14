import React from "react";
import styled from "styled-components";
import { Link } from "react-scroll";
import Logo from "../../../../images/logo.jpg";
// Assets

export default function Contact() {

  const getCurrentYear = () => {
    return new Date().getFullYear();
  }

  return (
    <Wrapper>
      <div className="darkBg">
        <div className="container">
          <InnerWrapper className="flexSpaceCenter" style={{ padding: "30px 0" }}>
            <Link className="flexCenter animate pointer" to="home" smooth="true" offset={-80}>
              <img
                src={Logo} // Replace with your image path
                alt="Logo"
                style={{ width: '40px', height: '40px' }} // Adjust size and margin as needed
              />
              <h1 className="font15 extraBold whiteColor" style={{ marginLeft: "15px" }}>
                Score Liklo
              </h1>
            </Link>
            <StyleP className="whiteColor font13">
              © {getCurrentYear()} - <span className="purpleColor font13">Score-Liklo</span> All Right Reserved
            </StyleP>

            <Link className="whiteColor animate pointer font13" to="home" smooth="true" offset={-80}>
              Back to top
            </Link>
          </InnerWrapper>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
`;
const InnerWrapper = styled.div`
  @media (max-width: 550px) {
    flex-direction: column;
  }
`;
const StyleP = styled.p`
  @media (max-width: 550px) {
    margin: 20px 0;
  }
`;