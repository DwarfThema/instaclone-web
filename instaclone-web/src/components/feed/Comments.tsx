import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import styled from "styled-components";
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

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($photoId: Int!, $payload: String!) {
    createComment(photoId: $photoId, payload: $payload) {
      ok
      error
    }
  }
`;

interface IComments {
  photoId: number;
  author: any;
  caption?: string;
  comments?: any[];
  commentNumber?: number;
}

const Comments = ({
  photoId,
  author,
  caption,
  commentNumber,
  comments,
}: IComments) => {
  const [createCommentMutation, { loading }] = useMutation(
    CREATE_COMMENT_MUTATION
  );
  const { register, handleSubmit, setValue } = useForm();
  const onValid = (data: any) => {
    const { payload } = data;
    if (loading) {
      return;
    }
    createCommentMutation({
      variables: {
        photoId,
        payload,
      },
    });
    setValue("payload", "");
  };
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
      <div>
        <form onSubmit={handleSubmit(onValid)}>
          <input
            {...register("payload", { required: true })}
            type="text"
            placeholder="코멘트를 입력하세요..."
          />
        </form>
      </div>
    </CommentsComtainer>
  );
};

export default Comments;
