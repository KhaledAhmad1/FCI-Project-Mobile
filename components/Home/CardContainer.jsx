import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const featureData = [
  {
    image: require("../../assets/images/news.jpg"),
    title: "News",
    text: "Stay updated with the latest news and events happening in the college.",
    link: "News",
  },
];

const FeatureContainer = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.cardContainer}>
      {featureData.map((feature, index) => (
        <View key={index} style={styles.card}>
          <Image
            source={feature.image}
            style={styles.cardImage}
            resizeMode="cover"
          />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{feature.title}</Text>
            <Text style={styles.cardText}>{feature.text}</Text>
            {feature.link && (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(feature.link);
                }}
                style={styles.cardButton}
              >
                <Text style={styles.cardButtonText}>Details</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "column",
    padding: 20,
  },
  card: {
    width: "90%",
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden",
    marginVertical: 20,
    marginHorizontal: 20,
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
});

export default FeatureContainer;
