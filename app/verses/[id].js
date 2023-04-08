import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useSearchParams } from "expo-router";

const Verses = () => {
  const { id } = useSearchParams();
  const [verses, setVerses] = useState([]);

  useEffect(() => {
    const loadVerses = async () => {
      const response = await fetch(
        `https://api.quran.com/api/v3/chapters/${id}/verses?recitation=1&translations=21`
      );
      const data = await response.json();
      setVerses(data.verses);
    };
    loadVerses();
  }, [id]);

  return (
    <View>
      <Stack.Screen
        options={{
          title: `Surah ${verses?.[0]?.verse_key || ""}`,
          headerTintColor: "#A020F0",
        }}
      />

      <FlatList
        style={{
          paddingHorizontal: 20,
          backgroundColor: "#fff",
        }}
        data={verses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderBottomWidth: 1,
              borderBottomColor: "#eee",
              marginVertical: 10,
            }}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: "600",
                paddingVertical: 5,
                marginVertical: 5,
              }}
            >
              {item.text_madani}
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "500",
                color: "gray",
                lineHeight: 20,
              }}
            >
              {item.translations?.[0].text}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default Verses;
