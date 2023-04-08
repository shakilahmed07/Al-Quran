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
          headerTintColor: "#A020F0",
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
              padding: 18,
              marginVertical: 6,
              marginHorizontal: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  height: 25,
                  width: 25,
                  backgroundColor: "#A020F0",
                  borderRadius: 14,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ fontSize: 14, color: "#fff", fontWeight: "bold" }}
                >
                  {item.id}
                </Text>
              </View>
              <View style={{ marginLeft: 12 }}>
                <Text
                  style={{ fontSize: 18, fontWeight: "600", textAlign: "left" }}
                >
                  {item.name_simple}
                </Text>
                <Text style={{ color: "gray", fontWeight: "500" }}>
                  {item.translated_name.name}
                </Text>
              </View>
              <View style={{ marginLeft: "auto", marginRight: 10 }}>
                <Text
                  style={{ color: "#A020F0", fontSize: 20, fontWeight: "600" }}
                >
                  {item.name_arabic}
                </Text>
                <Text style={{ color: "gray", fontWeight: "500" }}>
                  {item.verses_count} verses
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </ScrollView>
  );
};

export default App;
