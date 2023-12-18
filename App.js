import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SlotGame from "./components/SlotGame";

export default function App() {
  return (
    <View style={styles.container}>
      <SlotGame />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent", // Set background color to transparent
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
