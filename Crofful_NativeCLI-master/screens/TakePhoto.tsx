import React, { useEffect, useRef, useState } from "react";
import { Alert, Image, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import styled from "styled-components/native";
import { mainTheme } from "../styles";
import Slider from "@react-native-community/slider";
import { StatusBar } from "expo-status-bar";
import { useIsFocused } from "@react-navigation/native";
import * as MediaLibrary from "expo-media-library";

const Container = styled.View`
  flex: 1;
`;

const Actions = styled.View`
  flex: 0.35;
  align-items: center;
  justify-content: center;
`;

const TakePhotoBtn = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  background-color: rgba(0, 0, 0, 0.09);
  border: 4px solid ${mainTheme.mainColor};
  border-radius: 50px;
  align-items: center;
  justify-content: center;
`;

const ActionsBtn = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const SliderContainer = styled.View``;

const ActionsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ActionsSave = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 39px;
  width: 10px;
  background-color: ${mainTheme.mainColor};
  margin: 15px;
  border-radius: 14px;
`;

const SavePhotoText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 800;
`;

const TakePhoto = ({ navigation }: any) => {
  const [takenPhoto, setTakenPhoto] = useState("");

  const camera: any = useRef();
  const [cameraReady, setCameraReady] = useState(false);

  const [ok, setOk] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [zoom, setZoom] = useState(0);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);

  const getPermissions = async () => {
    const { granted } = await Camera.requestCameraPermissionsAsync();
    setOk(granted);
  };

  useEffect(() => {
    getPermissions();
  }, []);

  const onCameraSwitch = () => {
    if (cameraType === Camera.Constants.Type.back) {
      setCameraType(Camera.Constants.Type.front);
    } else {
      setCameraType(Camera.Constants.Type.back);
    }
  };
  const onZoomValueChange = (e: any) => {
    setZoom(e);
  };
  const onFlashChanged = () => {
    if (flashMode === Camera.Constants.FlashMode.off) {
      setFlashMode(Camera.Constants.FlashMode.on);
    } else {
      setFlashMode(Camera.Constants.FlashMode.off);
    }
  };

  const onCameraReady = () => setCameraReady(true);

  const takePhoto = async () => {
    if (camera.current && cameraReady) {
      const { height, uri, width } = await camera.current.takePictureAsync({
        quality: 1,
        exif: true,
      });
      setTakenPhoto(uri);
    }
  };

  const onDismiss = () => {
    setTakenPhoto("");
  };

  const goToUpload = async (save: any) => {
    if (save) {
      await MediaLibrary.saveToLibraryAsync(takenPhoto);
    }
    navigation.navigate("업로드폼", {
      file: takenPhoto,
    });
  };

  const onUpload = () => {
    Alert.alert("업로드 전에", "사진을 저장하겠습니까?", [
      {
        text: "응",
        onPress: () => goToUpload(true),
      },
      { text: "아니", onPress: () => goToUpload(false) },
    ]);
  };

  const isFocused = useIsFocused();

  return (
    <Container>
      {isFocused ? <StatusBar hidden={true} /> : null}
      {takenPhoto === "" ? (
        <Camera
          type={cameraType}
          style={{ flex: 1 }}
          zoom={zoom}
          flashMode={flashMode}
          ref={camera}
          onCameraReady={onCameraReady}
        >
          <TouchableOpacity onPress={() => navigation.navigate("탭")}>
            <Ionicons
              name="close"
              style={{
                fontSize: 35,
                margin: 10,
                color: "rgba(0,0,0,0.8)",
              }}
            />
          </TouchableOpacity>
        </Camera>
      ) : (
        <Image source={{ uri: takenPhoto }} style={{ flex: 1 }} />
      )}
      {takenPhoto === "" ? (
        <Actions>
          <SliderContainer>
            <Slider
              style={{
                width: 290,
                height: 35,
              }}
              minimumValue={0}
              maximumValue={0.1}
              minimumTrackTintColor={mainTheme.mainColor}
              maximumTrackTintColor="rgba(130,130,130,1)"
              onValueChange={onZoomValueChange}
            />
          </SliderContainer>
          <ActionsContainer>
            <ActionsBtn onPress={onFlashChanged}>
              <Ionicons
                name={
                  flashMode === Camera.Constants.FlashMode.off
                    ? "flash-off"
                    : "flash"
                }
                style={{
                  fontSize: 30,
                }}
              />
            </ActionsBtn>
            <TakePhotoBtn onPress={takePhoto}>
              <Ionicons name="camera" style={{ fontSize: 40 }} />
            </TakePhotoBtn>
            <ActionsBtn onPress={onCameraSwitch}>
              <Ionicons
                name="camera-reverse"
                style={{
                  fontSize: 35,
                }}
              />
            </ActionsBtn>
          </ActionsContainer>
        </Actions>
      ) : (
        //여기서 캡션등 작성하면 됨!
        <Actions>
          <ActionsContainer>
            <ActionsSave onPress={onDismiss}>
              <SavePhotoText>다시찍기</SavePhotoText>
            </ActionsSave>
            <ActionsSave onPress={onUpload}>
              <SavePhotoText>업로드</SavePhotoText>
            </ActionsSave>
          </ActionsContainer>
        </Actions>
      )}
    </Container>
  );
};

export default TakePhoto;
