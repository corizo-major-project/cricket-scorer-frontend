import React from "react";
import styled from "styled-components";
// Components
import ClientSlider from "../Elements/ClientSlider";
import ServiceBox from "../Elements/ServiceBox";
// Assets
import GroundAreaCricket from "../../../../images/Informal_cricket/GroundAreaCricket.jpeg";
import IPLShot from "../../../../images/Informal_cricket/IPLSShot.jpeg";
import GullyCricket from "../../../../images/Informal_cricket/GullyCricket.jpeg";
import GullyCricket2 from "../../../../images/Informal_cricket/GullyCricket2.jpeg";
import FullButton from "../Buttons/FullButton";
import { useNavigate } from "react-router-dom";

export default function Services() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/signup");
  };

  const handleLoginClick = () => {
    navigate("/signin");
  };

  return (
    <Wrapper id="services">
      <div className="lightBg" style={{ padding: "50px 0" }}>
        <div className="container">
          <ClientSlider />
        </div>
      </div>
      <div className="whiteBg" style={{ padding: "60px 0" }}>
        <div className="container">
          <HeaderInfo>
            <h1 className="font40 extraBold">Cricket Symbols</h1>
            <p className="font13">
              You can see some of the symbols shown
            </p>
          </HeaderInfo>
          <ServiceBoxRow className="flex">
            <ServiceBoxWrapper>
              <ServiceBox
                icon="legbye"
                title="Leg Bye"
                subtitle="The umpire signals Leg Bye by touching the raised knee."
              />
            </ServiceBoxWrapper>
            <ServiceBoxWrapper>
              <ServiceBox
                icon="six"
                title="Six"
                subtitle="A shot that crosses the boundary without bouncing."
              />
            </ServiceBoxWrapper>
            <ServiceBoxWrapper>
              <ServiceBox
                icon="wide"
                title="Wide Ball"
                subtitle="Signaled by the umpire when the ball is too wide for the batsman."
              />
            </ServiceBoxWrapper>
            <ServiceBoxWrapper>
              <ServiceBox
                icon="out"
                title="Out"
                subtitle="The umpire signals Out by raising their index finger."
              />
            </ServiceBoxWrapper>
          </ServiceBoxRow>

        </div>
        <div className="lightBg">
          <div className="container">
            <Advertising className="flexSpaceCenter">
              <AddLeft>
                <h4 className="font15 semiBold">A few words about website</h4>
                <h2 className="font40 extraBold">Score Liklo: Your Ultimate Cricket Companion!</h2>
                <p className="font14">
                  Score Liklo brings the thrill of cricket to your fingertips. Stay updated with real-time scores, host matches, track team stats, and explore umpire signals like never before. Whether you're a player, fan, or analyst, Score Leklo is your one-stop solution for everything cricket.
                </p>
                <ul>
                  <li className="font14">📊 Live Scores</li>
                  <li className="font14">🎮 Match Hosting</li>
                  <li className="font14">🏏 Team and Player Insights</li>
                </ul>
                <p className="font14">
                  Experience cricket like a pro with Score Leklo! 🏆
                </p>
                <ButtonsRow className="flexNullCenter" style={{ margin: "30px 0" }}>
                  <div style={{ width: "190px" }}>
                    <FullButton title="Get Started" action={handleClick} />
                  </div>
                  <div style={{ width: "190px", marginLeft: "15px" }}>
                    <FullButton title="Login" action={handleLoginClick} border />
                  </div>
                </ButtonsRow>
              </AddLeft>
              <AddRight>
                <AddRightInner>
                  <div className="flexNullCenter">
                    <AddImgWrapp1 className="flexCenter">
                      <img
                        src={GroundAreaCricket}
                        alt="office"
                      />
                    </AddImgWrapp1>
                    <AddImgWrapp2>
                      <img
                        src={IPLShot}
                        alt="office"
                      />
                    </AddImgWrapp2>
                  </div>
                  <div className="flexNullCenter">
                    <AddImgWrapp3>
                      <img src={GullyCricket} alt="office" />
                    </AddImgWrapp3>
                    <AddImgWrapp4>
                      <img src={GullyCricket2} alt="office" />
                    </AddImgWrapp4>
                  </div>
                </AddRightInner>
              </AddRight>
            </Advertising>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
`;
const ServiceBoxRow = styled.div`
  @media (max-width: 860px) {
    flex-direction: column;
  }
`;
const ButtonsRow = styled.div`
  @media (max-width: 860px) {
    justify-content: space-between;
  }
`;
const ServiceBoxWrapper = styled.div`
  width: 20%;
  margin-right: 5%;
  padding: 80px 0;
  @media (max-width: 860px) {
    width: 100%;
    text-align: center;
    padding: 40px 0;
  }
`;
const HeaderInfo = styled.div`
  @media (max-width: 860px) {
    text-align: center;
  }
`;
const Advertising = styled.div`
  margin: 80px 0;
  padding: 100px 0;
  position: relative;
  @media (max-width: 1160px) {
    padding: 100px 0 40px 0;
  }
  @media (max-width: 860px) {
    flex-direction: column;
    padding: 0 0 30px 0;
    margin: 80px 0 0px 0;
  }
`;

const AddLeft = styled.div`
  width: 50%;
  p {
    max-width: 475px;
  }
  @media (max-width: 860px) {
    width: 80%;
    order: 2;
    text-align: center;
    h2 {
      line-height: 3rem;
      margin: 15px 0;
    }
    p {
      margin: 0 auto;
    }
  }
`;
const AddRight = styled.div`
  width: 50%;
  position: absolute;
  top: -70px;
  right: 0;
  @media (max-width: 860px) {
    width: 80%;
    position: relative;
    order: 1;
    top: -40px;
  }
`;
const AddRightInner = styled.div`
  width: 100%;
`;
const AddImgWrapp1 = styled.div`
  width: 48%;
  margin: 0 6% 10px 6%;
  img {
    width: 206px;
    height: 426px;
    border-radius: 1rem;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
  }
`;
const AddImgWrapp2 = styled.div`
  width: 30%;
  margin: 0 5% 10px 5%;
  background-color: white;
  img {
    width: 100%;
    height: 333px;
    border-radius: 1rem;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
  }
`;
const AddImgWrapp3 = styled.div`
  width: 20%;
  margin-left: 40%;
  img {
    width: 112px;
    height: 125px;
    border-radius: 1rem;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
  }
`;
const AddImgWrapp4 = styled.div`
  width: 30%;
  margin: 0 5%auto;
  img {
    width: 197px;
    height: 224px;
    border-radius: 1rem;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
  }
`;