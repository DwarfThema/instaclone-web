import { gql, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { logUserOut } from "../apollo";
import Photo from "../components/feed/photo";
import PageTitle from "../components/PageTitle";
import routes from "../routes";

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
      commentNumber
      comments {
        id
        user {
          userName
          avatar
        }
        payload
        isMine
        createdAt
      }
      createdAt
      isMine
      isLiked
    }
  }
`;

const Home = () => {
  const { data } = useQuery(FEED_QUERY);

  const navigate = useNavigate();
  return (
    <div>
      <PageTitle title="피드" />
      {data?.seeFeed?.map((photo: any) => (
        <Photo key={photo.id} {...photo}></Photo>
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
