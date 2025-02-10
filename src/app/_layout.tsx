import React from "react";
import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Meditations" }} />
    </Stack>
  );
};

export default RootLayout;
