import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    accent: string;
    borderColor: string;
    fontColor: string;
    bgColor: string;
  }
  export interface ButtonTheme {
    disabledBgColor: string;
    borderColor: string;
    fontColor: string;
    bgColor: string;
  }
}
