import { StatusBar } from "expo-status-bar";
import React, { useRef } from "react";
import { StyleSheet, Text, View, Dimensions, Pressable } from "react-native";
import Constants from "expo-constants";

export default function App() {
  const swipeAlreadyReleased = React.useRef(false);
  let prevPos = { x: null, y: null };
  let pos = { x: null, y: null, t: null };
  const element = useRef();
  const handleFirstTouch = (ev) => {
    // console.log("firstTouch");
    return true;
  };

  const handleResponderGrant = (event) => {
    // console.log("responderGrant");
    element.current.setNativeProps({ backgroundColor: "green" });
  };

  const handleMove = (ev) => {
    // console.log("touches:", ev.nativeEvent.pageX);
    prevPos.x = pos.x;
    prevPos.y = pos.y;
    prevPos.t = pos.t;
    pos.x = ev.nativeEvent.pageX;
    pos.y = ev.nativeEvent.pageY;
    pos.t = ev.nativeEvent.timestamp;

    console.log("delta", pos.t - prevPos.t);
  };

  const handleTouchReleased = (ev) => {
    element.current.setNativeProps({ backgroundColor: "blue" });
  };
  return (
    <View style={styles.container}>
      <View
        ref={element}
        style={{ ...styles.card, ...shadow }}
        onResponderGrant={handleResponderGrant}
        onMoveShouldSetResponder={handleFirstTouch}
        onResponderMove={handleMove}
        onResponderRelease={handleTouchReleased}
      ></View>
    </View>
  );
}
const platform = Object.keys(Constants.platform)[0];

const { width, height } = Dimensions.get("screen");
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
