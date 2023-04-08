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
          headerTitleAlign: "center",
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
              borderRadius: 10,
              marginVertical: 10,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
                paddingVertical: 10,
              }}
            >
              {item.text_madani}
            </Text>
            <Text
              style={{
                textAlign: "center",
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
