import styled from "styled-components";
import { FatText } from "../shared";

const CommentContainer = styled.div`
  margin-top: 20px;
`;
const CommentCaption = styled.span`
  margin-left: 10px;
`;

interface IComments {
  author: any;
  payload?: string;
}

const Comment = ({ author, payload }: IComments) => {
  return (
    <CommentContainer>
      <FatText>{author}</FatText>
      <CommentCaption> {payload} </CommentCaption>
    </CommentContainer>
  );
};

export default Comment;
