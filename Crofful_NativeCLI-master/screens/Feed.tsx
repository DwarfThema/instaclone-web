import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import Photo from "../components/Photo";
import ScreenLayout from "../components/ScreenLayout";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";
import { Ionicons } from "@expo/vector-icons";
import { mainTheme } from "../styles";

const FEED_QUERY = gql`
  query seeFeed($offset: Int!) {
    seeFeed(offset: $offset) {
      ...PhotoFragment
      user {
        id
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

const Feed = ({ navigation }: any) => {
  const [offset, setOffset] = useState(0);

  const { data, loading, refetch, fetchMore } = useQuery(FEED_QUERY, {
    variables: {
      offset,
    },
  });

  const renderPhoto = ({ item: photo }: any) => {
    return <Photo {...photo} />;
  };

  const [refreshing, setRefreshing] = useState(false);
  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const MessagesButton = () => (
    <TouchableOpacity onPress={() => navigation.navigate("메세지")}>
      <Ionicons
        name="paper-plane"
        color={mainTheme.mainColor}
        size={23}
      ></Ionicons>
    </TouchableOpacity>
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: MessagesButton,
    });
  }, []);

  return (
    <ScreenLayout loading={loading}>
      <FlatList
        onEndReachedThreshold={0.1}
        onEndReached={() =>
          fetchMore({
            variables: {
              offset: data?.seeFeed?.length,
            },
          })
        }
        refreshing={refreshing}
        onRefresh={refresh}
        style={{ width: "100%" }}
        data={data?.seeFeed}
        keyExtractor={(photo: any) => photo.id}
        renderItem={renderPhoto}
        showsVerticalScrollIndicator={false}
      />
    </ScreenLayout>
  );
};

export default Feed;
