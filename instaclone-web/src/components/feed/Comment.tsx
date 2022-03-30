import styled from "styled-components";
import { FatText } from "../shared";
import { Link } from "react-router-dom";
import React, { Fragment } from "react";

const CommentContainer = styled.div`
  margin-top: 20px;
`;
const CommentCaption = styled.span`
  margin-left: 10px;
  a {
    background-color: inherit;
    color: ${(p) => p.theme.accent};
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

interface IComments {
  author: any;
  payload?: any;
}

const Comment = ({ author, payload }: IComments) => {
  return (
    <CommentContainer>
      <FatText>{author}</FatText>
      <CommentCaption>
        {payload?.split(" ").map((word: string, index: number) =>
          /#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g.test(word) ? (
            <Link key={index} to={`/hashtags/${word.replace("#", "")}`}>
              {word}{" "}
            </Link>
          ) : /@[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g.test(word) ? (
            <Link key={index} to={`/users/${word.replace("@", "")}`}>
              {word}{" "}
            </Link>
          ) : (
            <React.Fragment key={index}>{word} </React.Fragment>
          )
        )}
      </CommentCaption>
    </CommentContainer>
  );
};

export default Comment;
