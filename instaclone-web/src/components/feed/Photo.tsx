import styled from "styled-components";
import { FatText } from "../shared";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark as SolidBookMark,
  faComment as SolidComment,
  faHeart as SolidHeart,
  faPaperPlane as SolidPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import Avatar from "../Avatar";
import { gql, useMutation } from "@apollo/client";
import Comments from "./Comments";

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

const PhotoContainer = styled.div`
  background-color: white;
  border-radius: 4px;
  border: 1px solid ${(p) => p.theme.borderColor};
  margin-bottom: 60px;
  max-width: 615px;
`;

const PhotoHeader = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(239, 239, 239);
`;

const Username = styled(FatText)`
  margin-left: 5px;
`;

const PhotoFile = styled.img`
  min-width: 100%;
  max-width: 100%;
`;

const PhotoData = styled.div`
  padding: 12px 15px;
`;

const PhotoActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
  }
  svg {
    font-size: 20px;
  }
`;

const PhotoAction = styled.div`
  margin-right: 10px;
  cursor: pointer;
`;

const Likes = styled(FatText)`
  margin-top: 10px;
  display: block;
`;

interface IPhoto {
  id: number;
  user: any;
  file: string;
  isLiked: boolean;
  likes: number;
  caption?: string;
  comments?: any[];
  commentNumber?: number;
}

const Photo = ({
  id,
  user,
  file,
  isLiked,
  likes,
  caption,
  commentNumber,
  comments,
}: IPhoto) => {
  const updateToggleLike = (cache: any, result: any) => {
    const {
      data: {
        toggleLike: { ok },
      },
    } = result;
    if (ok) {
      const cachePhotoId = `Photo:${id}`;
      cache.modify({
        id: cachePhotoId,
        fields: {
          isLiked(prevIsLiked: boolean) {
            return !prevIsLiked;
          },
          likes(prevLikes: number) {
            if (isLiked) {
              return prevLikes - 1;
            } else {
              return prevLikes + 1;
            }
          },
        },
      });
    }
  };
  const [toggleLikeMutation, { loading }] = useMutation(TOGGLE_LIKE_MUTATION, {
    variables: {
      id,
    },
    update: updateToggleLike,
  });
  return (
    <PhotoContainer key={id}>
      <PhotoHeader>
        <Avatar lg url={user.avatar} />
        <Username>{user.userName}</Username>
      </PhotoHeader>
      <PhotoFile src={file} />
      <PhotoData>
        <PhotoActions>
          <div>
            <PhotoAction onClick={() => toggleLikeMutation()}>
              <span>
                <FontAwesomeIcon
                  size={"lg"}
                  style={{ color: isLiked ? "tomato" : "black" }}
                  icon={isLiked ? SolidHeart : faHeart}
                />
              </span>
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon size={"lg"} icon={faComment} />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon size={"lg"} icon={faPaperPlane} />
            </PhotoAction>
          </div>
          <div>
            <FontAwesomeIcon size={"lg"} icon={faBookmark} />
          </div>
        </PhotoActions>
        <Likes> {likes === 1 ? "1 좋아요" : `${likes} 좋아요들`} </Likes>
        <Comments
          photoId={id}
          author={user.userName}
          caption={caption}
          comments={comments}
          commentNumber={commentNumber}
        />
      </PhotoData>
    </PhotoContainer>
  );
};

export default Photo;
