import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
// Components
import FullButton from "../Buttons/FullButton";
// Assets
import HeaderImage from "../../../../images/HeaderImage.jpeg";
import QuotesIcon from "../../../../assets/svg/Quotes";
import Dots from "../../../../assets/svg/Dots";

export default function Header() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/signup");
  };

  return (
    <Wrapper id="home" className="container flexSpaceCenter">
      <LeftSide className="flexCenter">
        <div>
          <h1 className="extraBold font60">Are you a cricket match? Because I’m hooked on you!</h1>
          <HeaderP className="font14 semiBold">
            Introducing <b>Score Liklo</b>, a cricket scoring application designed for passionate
            unprofessional cricketers who play in streets, box cricket leagues, or practice at nets.
            Simplify your game by effortlessly tracking and adding scores in real time.
            Whether it's a friendly match with friends or a competitive hobby game, Score Leklo ensures
            accurate, easy-to-use scoring. Perfect for players who live for the game but don’t need the
            complexity of professional tools—because every run counts!
          </HeaderP>
          <BtnWrapper>
            <FullButton title="Get Started" action={handleClick} />
          </BtnWrapper>
        </div>
      </LeftSide>
      <RightSide>
        <ImageWrapper>
          <Img
            className="radius8"
            src={HeaderImage}
            alt="office"
            style={{
              zIndex: 9,
              width: "80%", // Set the exact width
              height: "607px", // Set the exact height
              objectFit: "cover", // Ensures the image fits perfectly within the dimensions
            }}
          />
          <QuoteWrapper className="flexCenter darkBg radius8">
            <QuotesWrapper>
              <QuotesIcon />
            </QuotesWrapper>
            <div>
              <p className="font15 whiteColor">
                <em>You don’t play for the crowd, you play for the country.</em>
              </p>
              <p className="font13 orangeColor textRight" style={{ marginTop: '10px' }}>Mahendra Singh Dhoni</p>
            </div>
          </QuoteWrapper>
          <DotsWrapper>
            <Dots />
          </DotsWrapper>
        </ImageWrapper>
      </RightSide>
    </Wrapper>
  );
}


const Wrapper = styled.section`
  padding-top: 80px;
  width: 100%;
  min-height: 840px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;
const LeftSide = styled.div`
  width: 50%;
  height: 100%;
  @media (max-width: 960px) {
    width: 100%;
    order: 2;
    margin: 50px 0;
    text-align: center;
  }
  @media (max-width: 560px) {
    margin: 80px 0 50px 0;
  }
`;
const RightSide = styled.div`
  width: 50%;
  height: 100%;
  @media (max-width: 960px) {
    width: 100%;
    order: 1;
    margin-top: 30px;
  }
`;
const HeaderP = styled.div`
  max-width: 470px;
  padding: 15px 0 50px 0;
  line-height: 1.5rem;
  @media (max-width: 960px) {
    padding: 15px 0 50px 0;
    text-align: center;
    max-width: 100%;
  }
`;
const BtnWrapper = styled.div`
  max-width: 190px;
  @media (max-width: 960px) {
    margin: 0 auto;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
  z-index: 9;
  @media (max-width: 960px) {
    width: 100%;
    justify-content: center;
  }
`;
const Img = styled.img`
  @media (max-width: 560px) {
    width: 80%;
    height: auto;
  }
`;
const QuoteWrapper = styled.div`
  position: absolute;
  left: 0;
  bottom: 50px;
  max-width: 330px;
  padding: 30px;
  z-index: 99;
  @media (max-width: 960px) {
    left: 20px;
  }
  @media (max-width: 560px) {
    bottom: -50px;
  }
`;
const QuotesWrapper = styled.div`
  position: absolute;
  left: -20px;
  top: -10px;
`;
const DotsWrapper = styled.div`
  position: absolute;
  right: -100px;
  bottom: 100px;
  z-index: 2;
  @media (max-width: 960px) {
    right: 100px;
  }
  @media (max-width: 560px) {
    display: none;
  }
`;


