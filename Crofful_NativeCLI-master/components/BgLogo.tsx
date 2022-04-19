import React from "react";
import styled from "styled-components/native";

const SBgLogo = styled.Image`
  position: absolute;
  width: 100%;
  height: 100%;
  max-width: 100%;
  height: 100%;
  z-index: -1;
`;

const BgLogo = () => (
  <SBgLogo
    source={require("../assets/crofful_logo_bg.jpg")}
    resizeMode="cover"
  />
);

export default BgLogo;
