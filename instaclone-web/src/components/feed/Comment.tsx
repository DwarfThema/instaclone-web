import styled from "styled-components";
import { FatText } from "../shared";
import sanitizeHtml from "sanitize-html";

const CommentContainer = styled.div`
  margin-top: 20px;
`;
const CommentCaption = styled.span`
  margin-left: 10px;
  mark {
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
  const cleanedPayload = sanitizeHtml(
    payload.replace(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g, "<mark>$&</mark>"),
    { allowedTags: ["mark"] }
  );

  return (
    <CommentContainer>
      <FatText>{author}</FatText>
      <CommentCaption dangerouslySetInnerHTML={{ __html: cleanedPayload }} />
    </CommentContainer>
  );
};

export default Comment;
