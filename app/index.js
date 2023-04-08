import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";

const App = () => {
  const router = useRouter();
  const [chapters, setChapters] = useState([]);
  useEffect(() => {
    const loadChapters = async () => {
      const response = await fetch("https://api.quran.com/api/v3/chapters");
      const data = await response.json();
      setChapters(data.chapters);
    };

    loadChapters();
  }, []);

  return (
    <ScrollView>
      <Stack.Screen
        options={{
          title: "Al-Quran",
          headerTitleAlign: "center",
        }}
      />
      <FlatList
        data={chapters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/verses/${item.id}`)}
            style={{
              backgroundColor: "#fff",
              padding: 20,
              marginVertical: 8,
              marginHorizontal: 16,
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 5,
            }}
          >
            <Text
              style={{ fontSize: 20, fontWeight: "500", textAlign: "left" }}
            >
              {item.name_simple} {item.name_arabic}
            </Text>
            <Text>{item.translated_name.name}</Text>
          </TouchableOpacity>
        )}
      />
    </ScrollView>
  );
};

export default App;
