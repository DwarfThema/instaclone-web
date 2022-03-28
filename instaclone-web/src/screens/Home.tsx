import { gql, useQuery } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { logUserOut } from "../apollo";
import Avatar from "../components/Avatar";
import { FatText } from "../components/shared";
import routes from "../routes";
import {
  faBookmark,
  faComment,
  faHeart,
  faMessage,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      id
      user {
        userName
        avatar
      }
      file
      caption
      likes
      comments
      createdAt
      isMine
    }
  }
`;

const PhotoContainer = styled.div`
  background-color: white;
  border: 1px solid ${(p) => p.theme.borderColor};
  margin-bottom: 20px;
  max-width: 615px;
`;

const PhotoHeader = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
`;

const Username = styled(FatText)`
  margin-left: 5px;
`;

const PhotoFile = styled.img`
  width: 100%;
`;

const PhotoData = styled.div`
  padding: 15px;
`;

const PhotoActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
  }
`;

const PhotoAction = styled.div`
  margin-right: 10px;
`;

const Likes = styled(FatText)`
  margin-top: 10px;
  display: block;
`;

const Home = () => {
  const { data } = useQuery(FEED_QUERY);
  console.log(data);

  const navigate = useNavigate();
  return (
    <div>
      {data?.seeFeed?.map((photo: any) => (
        <PhotoContainer>
          <PhotoHeader>
            <Avatar lg url={photo.user.avatar} />
            <Username>{photo.user.userName}</Username>
          </PhotoHeader>
          <PhotoFile src={photo.file} />
          <PhotoData>
            <PhotoActions>
              <div>
                <PhotoAction>
                  <FontAwesomeIcon size={"lg"} icon={faHeart} />
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
            <Likes>
              {" "}
              {photo.likes === 1 ? "1 좋아요" : `${photo.likes} 좋아요들`}{" "}
            </Likes>
          </PhotoData>
        </PhotoContainer>
      ))}
      {/* <button
        onClick={() => (logUserOut(), navigate(routes.home, { replace: true }))}
      >
        Log out now!
      </button> */}
    </div>
  );
};

export default Home;
