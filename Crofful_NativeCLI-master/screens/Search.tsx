import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import styled from "styled-components/native";
import { TextInput } from "../components/auth/AuthShared";
import DismissKeyboard from "../components/DismissKeyboard";
import { mainTheme } from "../styles";

const SEARCH_PHOTO = gql`
  query searchPhotos($keyword: String!) {
    searchPhotos(keyword: $keyword) {
      id
      file
    }
  }
`;

const Input = styled.TextInput``;

const MessageContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const MessageText = styled.Text`
  margin-top: 10px;
  font-weight: 500;
`;

const Search = ({ navigation }: any) => {
  const { width } = useWindowDimensions();

  const { register, setValue, handleSubmit } = useForm();

  const [startQueryFn, { loading, data, called }] = useLazyQuery(SEARCH_PHOTO);

  const onValid = (data: any) => {
    startQueryFn({
      variables: {
        keyword: data.keyword,
      },
    });
  };

  const SerarchBox = () => (
    <TextInput
      style={{ right: 6, width: width / 1.01 }}
      placeholder="검색어"
      autoCapitalize="none"
      returnKeyLabel="search"
      returnKeyType="search"
      autoCorrect={false}
      onChangeText={(text: string) => setValue("keyword", text)}
      onSubmitEditing={handleSubmit(onValid)}
    />
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: SerarchBox,
    });
    register("keyword", { required: true, minLength: 3 });
  }, []);

  const renderItem = ({ item: photo }: any) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("사진", { photoId: photo.id })}
      >
        <Image
          source={{ uri: photo.file }}
          style={{ width: width / 3, height: width / 3 }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <DismissKeyboard>
      <View style={{ flex: 1 }}>
        {!called ? (
          <MessageContainer>
            <MessageText>검색어를 입력해 주세요.</MessageText>
          </MessageContainer>
        ) : null}
        {loading ? (
          <MessageContainer>
            <ActivityIndicator color={mainTheme.mainColor} size="large" />
            <MessageText>검색중...</MessageText>
          </MessageContainer>
        ) : null}
        {data?.searchPhotos !== undefined ? (
          data?.searchPhotos?.length === 0 ? (
            <MessageContainer>
              <MessageText>검색 결과가 없습니다.</MessageText>
            </MessageContainer>
          ) : (
            <FlatList
              numColumns={3}
              data={data?.searchPhotos}
              keyExtractor={(photo: any) => photo.id}
              renderItem={renderItem}
            />
          )
        ) : null}
      </View>
    </DismissKeyboard>
  );
};

export default Search;
