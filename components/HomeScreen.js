import React from "react";
import { Text, View, Button } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View
      style={{
        alignItems: "center",
        backgroundColor: "yellow",
        justifyContent: "center",
        flex: 1,
      }}
    >
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 30,
          textAlign: "center",
        }}
      >
        Welcome to my app!
      </Text>
      <Button title="Go to Game" onPress={() => navigation.navigate("Game")} />
    </View>
  );
}
