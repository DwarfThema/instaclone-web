import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity } from "react-native";
import { useWindowDimensions } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { lightTheme, mainTheme } from "../styles";
import { gql, useMutation } from "@apollo/client";

const Contiainer = styled.View``;
const Header = styled.View`
  padding: 10px 10px;
  flex-direction: row;
  align-items: center;
`;
const HeaderTextContainer = styled.View``;
const UserAvatar = styled.Image`
  width: 40px;
  height: 40px;
  margin-right: 10px;
  border-radius: 25px;
  border-color: ${(p) => p.theme.accent};
  border-width: 2px;
`;
const TouchableToStory = styled.TouchableOpacity``;
const Username = styled.Text`
  font-size: 15px;
  font-weight: 600;
`;
const TouchableToProfile = styled.TouchableOpacity``;
const GameName = styled.Text`
  font-weight: 300;
`;

const TouchableToGame = styled.TouchableOpacity``;
const File = styled.Image``;
const Actions = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-left: 4px;
`;
const LikeAndMessage = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin-right: 10px;
`;

const Action = styled.TouchableOpacity`
  margin-left: 7px;
`;

const Cpation = styled.View`
  flex-direction: row;
`;
const CaptionText = styled.Text``;
const Likes = styled.Text`
  margin: 5px 0px;
  font-weight: 600;
`;

const ExtraContainer = styled.View`
  padding: 10px;
`;

interface IPhoto {
  id: number;
  user: any;
  file: string;
  isLiked: boolean;
  likes: number;
  caption?: string;
  comments?: any[];
  fullView?: boolean;
}

interface Inavigation {
  navigation?: any;
}

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

const Photo = ({
  id,
  user,
  caption,
  file,
  isLiked,
  likes,
  fullView,
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

  const { width: deviceWidth, height: deviceHeight } = useWindowDimensions();
  const navigation: any = useNavigation();
  const [imageHeight, setImageHeight] = useState(deviceHeight - 500);
  useEffect(() => {
    Image.getSize(file, (width, height) => {
      setImageHeight(height / 3);
    });
  }, []);
  const goToProfile = () => {
    navigation.navigate("타인프로필", {
      id: user.id,
      userName: user.userName,
    });
  };
  return (
    <Contiainer>
      <Header>
        <TouchableToStory>
          <UserAvatar resizeMode="cover" source={{ uri: user.avatar }} />
        </TouchableToStory>
        <HeaderTextContainer>
          <TouchableToProfile onPress={goToProfile}>
            <Username> {user.userName} </Username>
          </TouchableToProfile>
          <TouchableToGame>
            <GameName> "모여봐요 동물의 숲" </GameName>
          </TouchableToGame>
        </HeaderTextContainer>
      </Header>
      <File
        resizeMode="contain"
        style={{ width: deviceWidth, height: deviceHeight - 500 }}
        source={{ uri: file }}
      />
      <ExtraContainer>
        <Actions>
          <TouchableOpacity
            onPress={() => navigation.navigate("좋아요", { photoId: id })}
          >
            <Likes>
              {likes === 0 ? "좋아요가 없습니다 🥲" : `${likes}개의 좋아요`}
            </Likes>
          </TouchableOpacity>
          <LikeAndMessage>
            <Action>
              <Ionicons
                onPress={() => toggleLikeMutation()}
                style={{ color: isLiked ? `${mainTheme.heartColor}` : "black" }}
                name={isLiked ? "heart" : "heart-outline"}
                size={28}
              />
            </Action>
            <Action onPress={() => navigation.navigate("댓글")}>
              <Ionicons
                style={{ color: "black" }}
                name={"chatbubble-outline"}
                size={26}
              />
            </Action>
          </LikeAndMessage>
        </Actions>
        <Cpation>
          <TouchableToProfile onPress={goToProfile}>
            <Username> {user.userName} </Username>
          </TouchableToProfile>
          <CaptionText> {caption} </CaptionText>
        </Cpation>
      </ExtraContainer>
    </Contiainer>
  );
};

export default Photo;
