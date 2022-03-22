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
          background-color: #fafafa;
          font-size: 14px;
          font-family: 'Noto Sans KR', sans-serif;;
      }
  a{
    text-decoration: none;
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
