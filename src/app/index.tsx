import React from "react";
import { meditations } from "../data";
import MeditationListItem from "../components/MeditationListItem";
import { FlatList } from "react-native";

const HomeScreen = () => {
  return (
    <FlatList
      className="bg-white"
      data={meditations}
      contentContainerClassName="gap-8 p-3"
      renderItem={({ item }) => <MeditationListItem meditation={item} />}
    />
  );
};

export default HomeScreen;
