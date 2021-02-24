import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import MovableView from "./MovableView";
import SpringDemo from "./SpringDemo";
export default function App() {
  return (
    <View style={styles.container}>
      {/* <MovableView /> */}
      <SpringDemo />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
