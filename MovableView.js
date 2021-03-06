import React, { useRef } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import Constants from "expo-constants";

const { width, height } = Dimensions.get("screen");
const start = { x: width / 2, y: height / 2 };

const calcVelocity = (pos, prevPos) => {
  const dx = pos.x - prevPos.x;
  const dy = prevPos.y - pos.y;
  const dt = (pos.t - prevPos.t) / 1000;
  return { x: dx / dt, y: dy / dt };
};
let prevPos = { x: null, y: null, t: null };
let pos = { x: null, y: null, t: null };

export default function MovableView() {
  const swipeAlreadyReleased = React.useRef(false);
  const element = useRef();
  const handleFirstTouch = (ev) => {
    console.log("firstTouch");
    // console.log(Object.keys(ev.nativeEvent));
    console.log(ev.nativeEvent);
    element.current.setNativeProps({ backgroundColor: "green" });
    return true;
  };
  const translateElement = (pos) => {
    const relativeX = pos.x - start.x;
    const relativeY = pos.y - start.y;
    element.current.setNativeProps({
      transform: [{ translateX: relativeX }, { translateY: relativeY }],
    });
  };

  const handleResponderGrant = (event) => {
    console.log("responderGrant");
  };

  const handleMove = (ev) => {
    prevPos = { ...pos };
    pos.x = ev.nativeEvent.pageX;
    pos.y = ev.nativeEvent.pageY;
    pos.t = ev.nativeEvent.timestamp;
    console.log("velocity", calcVelocity(pos, prevPos));
    translateElement(pos);
  };

  const handleTouchReleased = (ev) => {
    element.current.setNativeProps({
      backgroundColor: "blue",
      // transform: [{ translateX: 0 }, { translateY: 0 }], // translate to the starting position
    });
  };

  return (
    <View
      ref={element}
      style={{ ...styles.card, ...shadow }}
      onResponderGrant={handleResponderGrant}
      onMoveShouldSetResponder={handleFirstTouch}
      onResponderMove={handleMove}
      onResponderRelease={handleTouchReleased}
    >
      <Text>Helloo</Text>
    </View>
  );
}
const platform = Object.keys(Constants.platform)[0];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "blue",
    width: width / 2,
    height: height / 3,
    borderRadius: 20,
  },
  ios: {
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.3,
    shadowColor: "black",
    borderRadius: 15,
  },
  android: {
    elevation: 21,
    borderRadius: 15,
    overflow: "hidden",
  },
});
const shadow = platform === "ios" ? styles.ios : styles.android;
