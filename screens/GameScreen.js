import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { DeviceMotion } from "expo-sensors";

export default function GameScreen({ navigation, route }) {
  const [paused, set_paused] = useState(false);
  const [color, set_color] = useState("pink");
  const { count } = route.params;

  useEffect(() => {
    DeviceMotion.setUpdateInterval(250);
    const subscription = DeviceMotion.addListener((data) => {
      const hue = Math.max(0, Math.round(150 + 150 * data.rotation.beta) % 360);

      // from 0% to 100% (from gray/black to fully saturated color)
      const saturation = Math.max(
        0,
        Math.round(30 + 60 * data.rotation.beta) % 100
      );
      if (!paused) {
        set_color(`hsl(${hue}, ${saturation}%, 50%)`);
      }
    });

    // cleanup on unmount
    return () => subscription.remove();
  }, [set_color, paused]);

  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        backgroundColor: color,
      }}
    >
      <Text style={{ marginBottom: 20, fontSize: 24, fontWeight: "bold" }}>
        Choose your color!
      </Text>
      <Button
        title={paused ? "Restart" : "Pause"}
        onPress={() => {
          set_paused(!paused);
        }}
      />
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate("Home", { count: count + 1 })}
      />
      <Text style={{ fontWeight: "bold", fontSize: 20, marginTop: 30 }}>
        Times i've been here: {count}
      </Text>
    </View>
  );
}
