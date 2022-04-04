import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import Photo from "../components/feed/Photo";
import PageTitle from "../components/PageTitle";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      ...PhotoFragment
      user {
        userName
        avatar
      }
      caption
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

const Home = () => {
  const { data } = useQuery(FEED_QUERY);

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
