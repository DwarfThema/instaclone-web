import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyles = createGlobalStyle`
  ${reset}
      body{
          background-color: ${(p) => p.theme.bgColor}
      }
  `;

export const lightTheme = {
  fontColor: "#2c2c2c",
  bgColor: "lightgray",
};

export const darkTheme = {
  fontColor: "lightgray",
  bgColor: "#2c2c2c",
};
