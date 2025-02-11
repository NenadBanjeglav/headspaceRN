import { View, Text, Pressable } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { meditations } from "../../data";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Slider from "@react-native-community/slider";

const MeditationDetails = () => {
  const { id } = useLocalSearchParams();

  const meditation = meditations.find((med) => Number(id) === med.id);

  if (!meditation) {
    return <Text>Meditation not found</Text>;
  }

  return (
    <SafeAreaView className="bg-orange-400 flex-1 p-2 justify-between">
      <View className="flex-1">
        <View className=" flex-1">
          <View className="flex-row justify-between items-center p-10">
            <AntDesign name="infocirlceo" size={24} color="black" />
            <View className="bg-zinc-800 p-2 rounded-md">
              <Text className="text-zinc-100 font-semibold">
                Today's Meditation
              </Text>
            </View>
            <AntDesign
              onPress={() => router.back()}
              className=""
              name="close"
              size={26}
              color="black"
            />
          </View>
          <Text className="text-3xl mt-10 text-center font-semibold text-zinc-800">
            {meditation?.title}
          </Text>
        </View>

        <Pressable className="bg-zinc-800 rounded-full p-6 justify-center items-center size-24 mx-auto">
          <FontAwesome6 name="play" size={24} color="snow" />
        </Pressable>

        <View className="flex-1">
          <View className="p-4 mt-auto gap-5">
            <View className="flex-row justify-between">
              <MaterialIcons name="airplay" size={24} color="#3A3937" />

              <MaterialCommunityIcons
                name="cog-outline"
                size={24}
                color="#3A3937"
              />
            </View>

            <Slider
              style={{ width: "100%", height: 3 }}
              value={0.5}
              onSlidingComplete={(value) => console.log(value)}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="#3A393755"
              maximumTrackTintColor="#3A3937"
              thumbTintColor="#3A3937"
            />

            <View className="flex-row justify-between">
              <Text>03:24</Text>
              <Text>13:14</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MeditationDetails;
