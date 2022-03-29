import styled from "styled-components";
import { FatText } from "../shared";
import Comment from "./Comment";

const CommentsComtainer = styled.div`
  margin-top: 15px;
  display: block;
`;

const CommentCount = styled.span`
  opacity: 0.7;
  margin: 10px 0;
  display: block;
  font-weight: 600;
  font-size: 12px;
`;

interface IComments {
  author: any;
  caption?: string;
  comments?: any[];
  commentNumber?: number;
}

const Comments = ({ author, caption, commentNumber, comments }: IComments) => {
  return (
    <CommentsComtainer>
      <Comment author={author} payload={caption} />
      <CommentCount>
        {commentNumber === 0 ? "" : `${commentNumber} 개의 댓글`}{" "}
      </CommentCount>
      {comments?.map((comment) => (
        <Comment
          key={comment.id}
          author={comment.user.userName}
          payload={comment.payload}
        />
      ))}
    </CommentsComtainer>
  );
};

export default Comments;
