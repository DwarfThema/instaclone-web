import { createGlobalStyle, DefaultTheme } from "styled-components";
import reset from "styled-reset";

export const GlobalStyles = createGlobalStyle`
  ${reset}
      body{
          background-color: ${(p) => p.theme.bgColor}
      }
  `;

export const lightTheme: DefaultTheme = {
  fontColor: "#2c2c2c",
  bgColor: "lightgray",
};

export const darkTheme: DefaultTheme = {
  fontColor: "lightgray",
  bgColor: "#2c2c2c",
};
