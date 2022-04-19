import { useNavigation } from "@react-navigation/native";
import React from "react";
import styled from "styled-components/native";
import { buttonTheme, mainTheme } from "../styles";

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 7px;
`;

const Column = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;
const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  padding: 10px;
  border-radius: 25px;
  margin-right: 10px;
`;
const UserName = styled.Text`
  font-weight: 600;
`;

const FollowBtn = styled.TouchableOpacity`
  background-color: ${buttonTheme.bgColor};
  justify-content: center;
  align-items: center;
  padding: 7px 10px;
  border-radius: 5px;
`;
const FollowBtnText = styled.Text`
  color: white;
  font-weight: 500;
`;

const UserRow = ({ avatar, id, userName, isFollowing, isMe }: any) => {
  const navigation: any = useNavigation();
  return (
    <Wrapper>
      <Column
        onPress={() =>
          navigation.navigate("타인프로필", {
            userName,
            id,
          })
        }
      >
        <Avatar source={{ uri: avatar }} />
        <UserName>{userName}</UserName>
      </Column>
      {!isMe ? (
        <FollowBtn>
          <FollowBtnText>{isFollowing ? "언팔로우" : "팔로우"}</FollowBtnText>
        </FollowBtn>
      ) : null}
    </Wrapper>
  );
};

export default UserRow;
