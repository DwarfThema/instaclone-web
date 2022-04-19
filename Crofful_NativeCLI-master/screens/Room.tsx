import { FlatList, KeyboardAvoidingView, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  gql,
  useApolloClient,
  useMutation,
  useQuery,
  useSubscription,
} from "@apollo/client";
import ScreenLayout from "../components/ScreenLayout";
import styled from "styled-components/native";
import { useForm } from "react-hook-form";
import useMe from "../hooks/useMe";
import { Ionicons } from "@expo/vector-icons";

const ROOM_UPDATES = gql`
  subscription roomUpdates($id: Int!) {
    roomUpdates(id: $id) {
      id
      payload
      user {
        userName
        avatar
      }
      read
    }
  }
`;

const SEND_MESSAGE_MUTATION = gql`
  mutation sendMessage($payload: String!, $roomId: Int, $userId: Int) {
    sendMessage(payload: $payload, roomId: $roomId, userId: $userId) {
      ok
      id
    }
  }
`;

//userId 를 이용해서 DM 할 때 방을 만들 수 있도록 해보자.

const ROOM_QUERY = gql`
  query seeRoom($id: Int!) {
    seeRoom(id: $id) {
      id
      messages {
        id
        payload
        user {
          userName
          avatar
        }
        read
      }
    }
  }
`;

const MessageContainer: any = styled.View`
  margin-right: 30px;
  padding: 0px 10px;
  flex-direction: ${(props: any) => (props.outGoing ? "row-reverse" : "row")};
  align-items: flex-end;
  width: 95%;
`;

const Author = styled.View``;

const Avatar = styled.Image`
  height: 25px;
  width: 25px;
  border-radius: 25px;
  border-color: ${(p) => p.theme.accent};
  border-width: 2px;
`;

const Message = styled.Text`
  padding: 7px 10px;
  margin: 0px 7px 0px 7px;
  border-radius: 10px;
  border: 1.5px solid rgba(0, 0, 0, 0.2);
`;

const TextInput = styled.TextInput`
  width: 90%;
  padding: 10px 20px;
  border-radius: 15px;
  border: 1.5px solid rgba(0, 0, 0, 0.2);
  margin-right: 10px;
`;

const InputContainer = styled.View`
  margin-bottom: 30px;
  width: 95%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const SendButton = styled.TouchableOpacity`
  align-items: center;
`;

const Room = ({ route, navigation }: any) => {
  const { data: meData } = useMe();

  const { register, setValue, handleSubmit, getValues, watch } = useForm();
  const updateSendMessage = (cache: any, result: any) => {
    const {
      data: {
        sendMessage: { ok, id },
      },
    } = result;
    if (ok && meData) {
      const { message } = getValues();
      setValue("message", "");
      const messageObj = {
        id: id,
        payload: message,
        user: {
          userName: meData.me.userName,
          avatar: meData.me.avatar,
        },
        read: true,
        __typename: "Message",
      };

      const messageFragment = cache.writeFragment({
        fragment: gql`
          fragment NewMessage on Message {
            id
            payload
            user {
              userName
              avatar
            }
            read
          }
        `,
        data: messageObj,
      });

      cache.modify({
        id: `Room:${route.params.id}`,
        fields: {
          messages(prev: any) {
            return [...prev, messageFragment];
          },
        },
      });
    }
  };

  const [sendMessageMutation, { loading: sendingMessage }] = useMutation(
    SEND_MESSAGE_MUTATION,
    {
      update: updateSendMessage,
    }
  );

  const {
    data,
    loading: QueryLoading,
    subscribeToMore,
  } = useQuery(ROOM_QUERY, {
    variables: {
      id: route?.params?.id,
    },
  });

  const client = useApolloClient();
  const myUpdateQuery = (prevQuery: any, options: any) => {
    const {
      subscriptionData: {
        data: { roomUpdates: message },
      },
    } = options;

    if (message.id) {
      const incomingMessage: any = client.cache.writeFragment({
        fragment: gql`
          fragment NewMessage on Message {
            id
            payload
            user {
              userName
              avatar
            }
            read
          }
        `,
        data: message,
      });
      client.cache.modify({
        id: `Room:${route.params.id}`,
        fields: {
          messages(prev: any) {
            const existingMessage = prev.find(
              (aMessage: any) => aMessage.__ref === incomingMessage.__ref
            );
            console.log("에이", prev);
            console.log("인커밍", incomingMessage.__ref);

            if (existingMessage) {
              return prev;
            } else {
              return [...prev, incomingMessage];
            }
          },
        },
      });
    }
  };

  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    if (data?.seeRoom && !subscribed) {
      subscribeToMore({
        document: ROOM_UPDATES,
        variables: {
          id: route?.params?.id,
        },
        updateQuery: myUpdateQuery, //업데이트할 내용 넣으면 됨
      });
      setSubscribed(true);
    }
  }, [data, subscribed]);

  const onValid = ({ message }: any) => {
    if (!sendingMessage) {
      sendMessageMutation({
        variables: {
          payload: message,
          roomId: route?.params?.id,
        },
      });
    }
  };
  useEffect(() => {
    register("message", { required: true });
  }, [register]);

  useEffect(() => {
    navigation.setOptions({
      title: `${route?.params?.talkingTo?.userName}님과의 대화`,
    });
  }, []);

  const renderItem = ({ item: message }: any) => {
    return (
      <View style={{ alignItems: "center" }}>
        <MessageContainer
          outGoing={
            message.user.userName !== route?.params?.talkingTo?.userName
          }
        >
          <Author>
            <Avatar source={{ uri: message.user.avatar }} />
          </Author>
          <Message>{message.payload}</Message>
        </MessageContainer>
      </View>
    );
  };
  const messages = [...(data?.seeRoom?.messages ?? [])].reverse();
  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
      behavior="padding"
      keyboardVerticalOffset={70}
    >
      <ScreenLayout loading={QueryLoading}>
        <FlatList
          style={{ width: "98%", marginBottom: 10 }}
          inverted
          ItemSeparatorComponent={() => <View style={{ height: 12 }}></View>}
          data={messages}
          keyExtractor={(message) => message.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
        <InputContainer>
          <TextInput
            placeholder="메세지를 입력하세요."
            returnKeyLabel="보내기"
            returnKeyType="send"
            autoCompleteType="off"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) => setValue("message", text)}
            onSubmitEditing={handleSubmit(onValid)}
            value={watch("message")}
          />
          <SendButton
            disabled={!Boolean(watch("message"))}
            onPress={handleSubmit(onValid)}
          >
            <Ionicons
              name="paper-plane"
              size={22}
              color={
                !Boolean(watch("message")) ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,1)"
              }
            />
          </SendButton>
        </InputContainer>
      </ScreenLayout>
    </KeyboardAvoidingView>
  );
};
export default Room;
