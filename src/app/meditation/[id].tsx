import { View, Text } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { meditations } from "../../data";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const MeditationDetails = () => {
  const { id } = useLocalSearchParams();
  const { top } = useSafeAreaInsets();

  const meditation = meditations.find((med) => Number(id) === med.id);

  if (!meditation) {
    return <Text>Meditation not found</Text>;
  }

  return (
    <SafeAreaView>
      <AntDesign
        onPress={() => router.back()}
        className="absolute  right-4 z-10"
        style={{ top: top + 16 }}
        name="close"
        size={24}
        color="black"
      />
      <Text className="text-3xl">Meditation details: {meditation?.title}</Text>
    </SafeAreaView>
  );
};

export default MeditationDetails;
