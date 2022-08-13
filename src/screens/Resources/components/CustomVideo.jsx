import { Video, AVPlaybackStatus, VideoFullscreenUpdateEvent } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, Pressable, View } from "react-native";
import { IconButton } from "react-native-paper";

// const thumbnailVideo = require('../../../../assets/images/thumbnailVideo.png');

export default function CustomVideo({ source, videoStyle, autoPlay = false }) {
  const videoPlayer = useRef(null);
  const [videoStatus, setVideoStatus] = useState({});
  const [videoScreenStatus, setVideoScreenStatus] = useState(null);
  //eslint-disable-next-line
  const [videoLoadStatus, setVideoLoadStatus] = useState(null);

  useEffect(() => {
    if (autoPlay) {
      playVideo();
    }
  }, [autoPlay]);

  useEffect(() => {
    async function changeOrientation() {
      await ScreenOrientation.unlockAsync();
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    }
    if (videoScreenStatus?.fullscreenUpdate === 3) {
      changeOrientation();
    }
    if (videoScreenStatus?.fullscreenUpdate === 3 && videoStatus.isPlaying) {
      videoPlayer.current.pauseAsync();
    }
  }, [videoScreenStatus, videoStatus.isPlaying]);

  // Open video in full screen and autoplay, as we click on play button
  const playVideo = async () => {
    const orientation = await ScreenOrientation.getOrientationLockAsync();
    if (orientation === ScreenOrientation.OrientationLock.PORTRAIT_UP) {
      await ScreenOrientation.unlockAsync();
    }

    videoPlayer.current
      .presentFullscreenPlayer()
      .then(() => {
        ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.LANDSCAPE
        );
      })
      .catch(() => {});
    // videoPlayer.current.playAsync();
  };

  return (
    <Pressable onPress={() => playVideo()}>
      {/* <ImageBackground style={videoStyle} source={thumbnailVideo}> */}
      <Video
        ref={videoPlayer}
        style={videoStyle}
        source={source}
        posterSource={{
          uri: "https://www.kickassfacts.com/wp-content/uploads/2018/07/loading-game-life.jpg",
        }}
        usePoster={true}
        resizeMode="stretch"
        // orientation={'portrait'}
        onPlaybackStatusUpdate={(status) => setVideoStatus(() => status)}
        onFullscreenUpdate={(status) => setVideoScreenStatus(status)}
        onLoad={(status) => {
          setVideoLoadStatus(status);
        }}
      />

      <View style={styles.playButton}>
        <IconButton icon="arrow-right-drop-circle" color={"#9F9F9F"} />
      </View>
      {/* </ImageBackground> */}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  playButton: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
