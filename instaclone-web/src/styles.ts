import { createGlobalStyle, DefaultTheme } from "styled-components";
import reset from "styled-reset";

export const GlobalStyles = createGlobalStyle`
  ${reset}
  input{
    all:unset
  }
  *{
    box-sizing: border-box;
  }
  body{
          background-color: ${(p) => p.theme.bgColor};
          color: ${(p) => p.theme.fontColor};
          font-size: 14px;
          font-family: 'Noto Sans KR', sans-serif;;
      }
  a{
    text-decoration: none;
  }
  `;

export const lightTheme: DefaultTheme = {
  fontColor: "rgb(38, 38, 38)",
  bgColor: "#fafafa",
  accent: "#0095f6",
  borderColor: "rgb(219, 219, 219)",
};

export const darkTheme: DefaultTheme = {
  fontColor: "lightgray",
  bgColor: "#2c2c2c",
  accent: "#0095f6",
  borderColor: "rgb(219, 219, 219)",
};
