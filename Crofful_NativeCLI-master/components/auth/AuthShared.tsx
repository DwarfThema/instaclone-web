import React from "react";
import styled from "styled-components/native";

interface ITextInput {
  lastOne?: boolean;
}

export const TextInput = styled.TextInput<ITextInput>`
  background-color: rgba(255, 255, 255, 0.15);
  padding: 13px 16px;
  margin-bottom: ${(p) => (p.lastOne ? "15px" : "5px")};
  border-radius: 4px;
  width: 80%;
  color: black;
`;
