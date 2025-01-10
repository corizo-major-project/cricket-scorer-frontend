import React from "react";
import styled from "styled-components";

// Assets
import LegBye from "../../../../images/umpire_symbols/LegBye.png";
import Six from "../../../../images/umpire_symbols/Six.png";
import Wide from "../../../../images/umpire_symbols/Wide.jpeg";
import Out from "../../../../images/umpire_symbols/Out.jpeg";

export default function ServiceBox({ icon, title, subtitle }) {
  let getIcon;

  // Map the icon prop to the corresponding umpire symbol
  switch (icon) {
    case "legbye":
      getIcon = <UmpireSymbol src={LegBye} alt="Leg Bye" />;
      break;
    case "six":
      getIcon = <UmpireSymbol src={Six} alt="Six" />;
      break;
    case "wide":
      getIcon = <UmpireSymbol src={Wide} alt="Wide" />;
      break;
    case "out":
      getIcon = <UmpireSymbol src={Out} alt="Out" />;
      break;
    default:
      getIcon = <UmpireSymbol src={LegBye} alt="Default" />;
      break;
  }

  return (
    <Wrapper className="flex flexColumn">
      <IconStyle>{getIcon}</IconStyle>
      <TitleStyle className="font20 extraBold">{title}</TitleStyle>
      <SubtitleStyle className="font13">{subtitle}</SubtitleStyle>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
`;

const IconStyle = styled.div`
  @media (max-width: 860px) {
    margin: 0 auto;
  }
`;

const TitleStyle = styled.h2`
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  padding: 40px 0;
  @media (max-width: 860px) {
    padding: 20px 0;
  }
`;

const SubtitleStyle = styled.p`
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
`;

const UmpireSymbol = styled.img`
  width: 100px;
  height: auto;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
`;
