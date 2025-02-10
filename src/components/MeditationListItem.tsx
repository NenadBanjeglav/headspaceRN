import { View, Text } from "react-native";
import React from "react";
import { Meditation } from "../types";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const MeditationListItem = ({ meditation }: { meditation: Meditation }) => {
  return (
    <View className="flex-row items-center gap-4">
      <View className="bg-green-600 p-2 rounded-full">
        <FontAwesome name="check" size={16} color="white" />
      </View>
      <View className="flex-1 p-5 py-8 border rounded-2xl border-gray-300">
        <Text className="font-semibold text-2xl">{meditation.title}</Text>
        <View className="flex flex-row gap-1 items-center mt-2">
          <FontAwesome6 name="clock" size={16} color="gray" />
          <Text className="text-gray-600">{meditation.duration} min</Text>
        </View>
      </View>
    </View>
  );
};

export default MeditationListItem;
