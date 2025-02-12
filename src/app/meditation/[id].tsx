import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { meditations } from "../../data";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Slider from "@react-native-community/slider";

import { Audio } from "expo-av";

const audioSource = require("../../../assets/meditations/audio1.mp3");

const MeditationDetails = () => {
  const { id } = useLocalSearchParams();
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const meditation = meditations.find((med) => Number(id) === med.id);

  async function togglePlayPause() {
    if (sound) {
      const status = await sound.getStatusAsync();
      if (status.isLoaded && status.isPlaying) {
        // Pause the sound if it's playing
        await sound.pauseAsync();
        setIsPlaying(false);
      } else {
        // Resume playback if it's paused
        await sound.playAsync();
        setIsPlaying(true);
      }
    } else {
      // Load and play the sound if it's not yet loaded
      console.log("Loading Sound");
      const { sound } = await Audio.Sound.createAsync(audioSource);
      setSound(sound);

      console.log("Playing Sound");
      await sound.playAsync();
      setIsPlaying(true);
    }
  }
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (sound) {
      interval = setInterval(async () => {
        const status = await sound.getStatusAsync();
        if (status.isLoaded) {
          setCurrentTime(status.positionMillis || 0);
          setDuration(status.durationMillis || 0);
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
      if (sound) {
        console.log("Unloading Sound");
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const formatTime = (millis: number) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = Math.floor((millis % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

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

        <Pressable
          className="bg-zinc-800 rounded-full p-6 justify-center items-center size-24 mx-auto"
          onPress={togglePlayPause}
        >
          <FontAwesome6
            name={isPlaying ? "pause" : "play"}
            size={24}
            color="snow"
          />
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
              value={currentTime}
              onSlidingComplete={async (value) => {
                if (sound) {
                  await sound.setPositionAsync(value); // Seek to new position

                  const status = await sound.getStatusAsync();
                  if (status.isLoaded && !status.isPlaying) {
                    await sound.playAsync(); // Resume playback if it was playing
                    setIsPlaying(true);
                  }
                }
              }}
              minimumValue={0}
              maximumValue={duration}
              minimumTrackTintColor="#3A393755"
              maximumTrackTintColor="#3A3937"
              thumbTintColor="#3A3937"
            />

            <View className="flex-row justify-between">
              <Text>{formatTime(currentTime)}</Text>
              <Text>{formatTime(duration)}</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MeditationDetails;
