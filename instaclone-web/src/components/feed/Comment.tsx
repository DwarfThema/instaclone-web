import styled from "styled-components";
import { FatText } from "../shared";
import { Link } from "react-router-dom";
import React, { Fragment } from "react";
import { gql, useMutation } from "@apollo/client";

const CommentContainer = styled.div`
  margin-bottom: 7px;
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

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      ok
    }
  }
`;

interface IComments {
  id?: number;
  photoId?: any;
  author: any;
  payload?: any;
  isMine?: boolean;
}

const Comment = ({ id, photoId, author, payload, isMine }: IComments) => {
  const updateDeleteCommet = (cache: any, result: any) => {
    const {
      data: {
        deleteComment: { ok, error },
      },
    } = result;
    if (ok) {
      cache.evict({ id: `Comment:${id}` });
      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          commentNumber(prev: any) {
            return prev - 1;
          },
        },
      });
    }
  };

  const [deleteCommentMutation, { loading }] = useMutation(
    DELETE_COMMENT_MUTATION,
    {
      variables: {
        id,
      },
      update: updateDeleteCommet,
    }
  );
  const onDeleteClick = () => {
    deleteCommentMutation();
  };
  return (
    <CommentContainer>
      <Link to={`/user/${author}`}>
        <FatText>{author}</FatText>
      </Link>
      <CommentCaption>
        {payload?.split(" ").map((word: string, index: number) =>
          /^#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g.test(word) ? (
            <Link key={index} to={`/hashtags/${word.replace("#", "")}`}>
              {word}{" "}
            </Link>
          ) : /^@[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g.test(word) ? (
            <Link key={index} to={`/users/${word.replace("@", "")}`}>
              {word}{" "}
            </Link>
          ) : (
            <React.Fragment key={index}>{word} </React.Fragment>
          )
        )}
      </CommentCaption>
      {isMine ? <button onClick={onDeleteClick}>x</button> : null}
    </CommentContainer>
  );
};

export default Comment;
