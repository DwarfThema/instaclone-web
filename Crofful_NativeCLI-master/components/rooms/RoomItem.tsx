import { useNavigation } from "@react-navigation/native";
import React from "react";
import styled from "styled-components/native";
import useMe from "../../hooks/useMe";
import { mainTheme } from "../../styles";

const RoomContainer = styled.TouchableOpacity`
  padding: 15px 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Column = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Avatar = styled.Image`
  height: 50px;
  width: 50px;
  border-radius: 25px;
  border-color: ${mainTheme.mainColor};
  border-width: 2px;
  margin-right: 15px;
`;
const Data = styled.View``;

const Username = styled.Text`
  font-weight: 600;
  font-size: 16px;
`;
const UnreadText = styled.Text``;
const UnreadDot = styled.View`
  margin-right: 10px;
  background-color: red;
  height: 8px;
  width: 8px;
  border-radius: 5px;
`;

const RoomItem = ({ users, unreadTotal, id }: any) => {
  const navigation: any = useNavigation();
  const { data: meData } = useMe();
  const talkingTo = users.find(
    (user: any) => user.userName !== meData?.me?.userName
  );

  const goToRoom = () =>
    navigation.navigate("대화방", {
      id: id,
      talkingTo: talkingTo,
    });

  return (
    <RoomContainer onPress={goToRoom}>
      <Column>
        <Avatar resizeMode="cover" source={{ uri: talkingTo.avatar }} />
        <Data>
          <Username>{talkingTo.userName} </Username>
          <UnreadText>{unreadTotal} 개의 읽지 않은 메세지 </UnreadText>
        </Data>
      </Column>
      <Column>{unreadTotal !== 0 ? <UnreadDot /> : null}</Column>
    </RoomContainer>
  );
};

export default RoomItem;
