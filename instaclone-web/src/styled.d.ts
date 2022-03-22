import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    accent: string;
    borderColor: string;
    fontColor: string;
    bgColor: string;
  }
}
