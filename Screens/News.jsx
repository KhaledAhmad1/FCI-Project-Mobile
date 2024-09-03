import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from "react-native";
import Card from "../components/NewCard/Card";
import { useNavigation } from "@react-navigation/native";

export default function NewsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch("http://192.168.1.7:5000/login/check-login", {
          method: "GET",
          credentials: "include",
        });

        const result = await response.json();

        if (!result.loggedIn) {
          navigation.navigate("Login");
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        navigation.navigate("Login");
      }
    };

    checkLoginStatus();
  }, [navigation]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://192.168.1.7:5000/news/get");
        if (!res.ok) {
          throw new Error(`Fetch Failed, status: ${res.status}`);
        }
        const result = await res.json();
        if (!result.cards) {
          throw new Error("Invalid data structure received");
        }
        setData(result);
      } catch (error) {
        console.error("Fetch Failed:", error);
        setError("Failed to load news. Please try again later.");
      }
    };

    if (!loading) {
      fetchData();
    }
  }, [loading]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  if (!data) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView style={styles.cardContainer}>
      <View>
        {data.cards.map((card) => (
          <Card key={card.id} {...card} image={{ uri: card.image }} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "90%",
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden",
    marginVertical: 20,
    marginHorizontal: "5%",
    paddingBottom: 20,
  },
  cardImage: {
    width: "100%",
    height: 300,
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  cardText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 20,
  },
  cardButton: {
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    alignItems: "center",
  },
  cardButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  cardContainer: {
    flexDirection: "column",
    padding: 20,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 20,
    fontSize: 16,
  },
});
