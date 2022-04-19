import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";
import { useForm } from "react-hook-form";
import { mainTheme } from "../styles";
import { gql, useMutation } from "@apollo/client";
import { FEED_PHOTO } from "../fragments";
import { ReactNativeFile } from "apollo-upload-client";

const UPLOAD_PHOTO_MUTATION = gql`
  mutation uploadPhoto($file: Upload!, $caption: String) {
    uploadPhoto(file: $file, caption: $caption) {
      ...FeedPhoto
    }
  }
  ${FEED_PHOTO}
`;

const Container = styled.View`
  flex: 1;
  padding: 0px 50px;
  align-items: center;
`;

const Photo = styled.Image`
  height: 350px;
  width: 135%;
  background-color: rgba(0, 0, 0, 0.08);
`;
const CaptionContainer = styled.View``;

const Caption = styled.TextInput`
  padding: 10px 20px;
  width: 300px;
  margin-top: 40px;
  border-radius: 10px;
  border: 1.5px solid rgba(0, 0, 0, 0.2);
`;

const HeaderRightText = styled.Text`
  font-size: 17px;
  color: ${mainTheme.mainColor};
  font-weight: 800;
  margin-right: -5px;
`;

const UploadForm = ({ route, navigation }: any) => {
  const updateUploadPhoto = (cache: any, result: any) => {
    const {
      data: { uploadPhoto },
    } = result;
    if (uploadPhoto.id) {
      cache.modify({
        id: `ROOT_QUERY`,
        fields: {
          seeFeed(prev: any) {
            return [uploadPhoto, ...prev];
          },
        },
      });
      navigation.navigate("탭");
    }
  };
  const [uploadPhotoMutation, { loading }] = useMutation(
    UPLOAD_PHOTO_MUTATION,
    {
      update: updateUploadPhoto,
    }
  );
  const { register, handleSubmit, setValue } = useForm();
  useEffect(() => {
    register("caption");
  }, [register]);

  const HeaderRight = () => (
    <TouchableOpacity onPress={handleSubmit(onValid)}>
      <HeaderRightText>업로드</HeaderRightText>
    </TouchableOpacity>
  );

  const HeaderRightLoading = () => (
    <ActivityIndicator size="small" color={mainTheme.mainColor} />
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: loading ? HeaderRightLoading : HeaderRight,
      ...(loading && { headerLeft: () => null }),
    });
  }, [loading]);

  const onValid = ({ caption }: any) => {
    const file = new ReactNativeFile({
      uri: route.params.photoLocal,
      name: "a.jpg",
      type: "image/jpeg",
    });

    uploadPhotoMutation({
      variables: {
        caption: caption,
        file: file,
      },
    });
  };

  return (
    <DismissKeyboard>
      <Container>
        <Photo resizeMode="contain" source={{ uri: route.params.file }} />
        <CaptionContainer>
          <Caption
            placeholder="내용을 작성해 주세요"
            onChangeText={(text) => setValue("caption", text)}
            onSubmitEditing={handleSubmit(onValid)}
            returnKeyType="done"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </CaptionContainer>
      </Container>
    </DismissKeyboard>
  );
};

export default UploadForm;
