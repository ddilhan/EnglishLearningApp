import React from "react";
import { StyleSheet, Text, View } from "react-native";
import QuestionContainer from "./src/QuestionContainer";

export default function App() {
  return (
    <View style={styles.container}>
      <View
        style={{
          height: "20%",
          justifyContent: "center",
        }}
      >
        <Text style={styles.mainText}>MEASURE YOUR ENGLISH KNOWLEDGE</Text>
      </View>
      <QuestionContainer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b3e6ff",
    alignItems: "center",
    justifyContent: "center",
  },
  mainText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
