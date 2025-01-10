import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
// Assets
import ClientLogo01 from "../../../../images/cricket_shots/ClientLogo01.png";
import ClientLogo02 from "../../../../images/cricket_shots/ClientLogo02.png";
import ClientLogo03 from "../../../../images/cricket_shots/ClientLogo03.png";
import ClientLogo04 from "../../../../images/cricket_shots/ClientLogo04.png";
import ClientLogo05 from "../../../../images/cricket_shots/ClientLogo05.png";
import ClientLogo06 from "../../../../images/cricket_shots/ClientLogo06.png";
import ClientLogo07 from "../../../../images/cricket_shots/ClientLogo07.png";
import ClientLogo08 from "../../../../images/cricket_shots/ClientLogo08.png";
import ClientLogo09 from "../../../../images/cricket_shots/ClientLogo09.png";
import ClientLogo10 from "../../../../images/cricket_shots/ClientLogo10.png";

export default function ClientSlider() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    arrows: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <Slider {...settings}>
        <LogoWrapper>
          <ImgStyle src={ClientLogo01} alt="client logo" />
        </LogoWrapper>
        <LogoWrapper>
          <ImgStyle src={ClientLogo02} alt="client logo" />
        </LogoWrapper>
        <LogoWrapper>
          <ImgStyle src={ClientLogo03} alt="client logo" />
        </LogoWrapper>
        <LogoWrapper>
          <ImgStyle src={ClientLogo04} alt="client logo" />
        </LogoWrapper>
        <LogoWrapper>
          <ImgStyle src={ClientLogo05} alt="client logo" />
        </LogoWrapper>
        <LogoWrapper>
          <ImgStyle src={ClientLogo06} alt="client logo" />
        </LogoWrapper>
        <LogoWrapper>
          <ImgStyle src={ClientLogo07} alt="client logo" />
        </LogoWrapper>
        <LogoWrapper>
          <ImgStyle src={ClientLogo08} alt="client logo" />
        </LogoWrapper>
        <LogoWrapper>
          <ImgStyle src={ClientLogo09} alt="client logo" />
        </LogoWrapper>
        <LogoWrapper>
          <ImgStyle src={ClientLogo10} alt="client logo" />
        </LogoWrapper>
      </Slider>
    </div>
  );
}

const CustomNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <Arrow
      className={className}
      style={{ ...style, right: "10px" }}
      onClick={onClick}
    >
      &#8250;
    </Arrow>
  );
};

const CustomPrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <Arrow
      className={className}
      style={{ ...style, left: "10px" }}
      onClick={onClick}
    >
      &#8249;
    </Arrow>
  );
};

const LogoWrapper = styled.div`
  width: 120px;
  height: 210px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  margin: 0 10px;

  @media (max-width: 600px) {
    margin: 0 5px;
  }

  :focus-visible {
    outline: none;
    border: 0px;
  }
`;

const ImgStyle = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: transparent;
  border-radius: 8px;
`;

const Arrow = styled.div`
  color: black;
  font-size: 30px; /* Increased size */
  z-index: 10;
  cursor: pointer;
  &:hover {
    color: #555; /* Slight color change on hover */
  }
`;
