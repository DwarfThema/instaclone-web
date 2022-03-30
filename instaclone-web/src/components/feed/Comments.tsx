import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import useUser from "../../hooks/useUser";
import Comment from "./Comment";

const CommentsComtainer = styled.div`
  margin-top: 20px;
`;

const CommentCount = styled.span`
  width: 100%;
  &::placeholder {
    font-size: 12px;
  }
`;

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($photoId: Int!, $payload: String!) {
    createComment(photoId: $photoId, payload: $payload) {
      ok
      error
      id
    }
  }
`;

const PostCommentContainer = styled.div`
  margin-top: 10px;
  padding-top: 15px;
  padding-bottom: 10px;
  border-top: 1px solid ${(props) => props.theme.borderColor};
`;

const PostCommentInput = styled.input`
  width: 100%;
  &::placeholder {
    font-size: 12px;
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
  const { data: userData }: any = useUser();
  const { register, handleSubmit, setValue, getValues } = useForm();
  const createCommentUpdata = (cache: any, result: any) => {
    const { payload } = getValues();
    setValue("payload", "");
    const {
      data: {
        createComment: { ok, id },
      },
    } = result;
    // 이제부터 변조해줘야 한다.
    if (ok && userData.me) {
      const newComment = {
        __typename: "Comment",
        id,
        user: {
          ...userData.me,
        },
        payload,
        isMine: true,
        createdAt: Date.now() + "",
      };
      const newCacheComment = cache.writeFragment({
        data: newComment,
        fragment: gql`
          fragment DwarfName on Comment {
            id
            user {
              userName
              avatar
            }
            payload
            isMine
            createdAt
          }
        `,
      });

      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          comments(prev: any) {
            return [...prev, newCacheComment];
          },
          commentNumber(prev: any) {
            return prev + 1;
          },
        },
      });
    }
  };
  const [createCommentMutation, { loading }] = useMutation(
    CREATE_COMMENT_MUTATION,
    {
      update: createCommentUpdata,
    }
  );
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
          id={comment.id}
          photoId={photoId}
          author={comment.user.userName}
          payload={comment.payload}
          isMine={comment.isMine}
        />
      ))}
      <PostCommentContainer>
        <form onSubmit={handleSubmit(onValid)}>
          <PostCommentInput
            {...register("payload", { required: true })}
            type="text"
            placeholder="댓글을 입력하세요..."
          />
        </form>
      </PostCommentContainer>
    </CommentsComtainer>
  );
};

export default Comments;
