import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./Screens/Home";
import NewsScreen from "./Screens/News";
import LoginScreen from "./Screens/User/Login";
import AvailabilityScreen from "./Screens/Availability";
import SchedulesScreen from "./Screens/Schedules";
import RegisterScreen from "./Screens/User/Register";
import RegulationScreen from "./Screens/Regulation/Regulation";
import ImagesScreen from "./Screens/Images";
import ChatbotScreen from "./Screens/Chatbot";
import BuildingScreen from "./Screens/Map/Buildings/Buildings";
import PlacesScreen from "./Screens/Map/Places/Places";
import PlaceImage from "./Screens/Map/Places/Images";
import About from "./components/Home/About"
import { AuthProvider } from './AuthContext';
import NotificationPopup from "./components/NotificationPopup"

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="News"
            component={NewsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Schedules"
            component={SchedulesScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Availability"
            component={AvailabilityScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Regulation"
            component={RegulationScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Images"
            component={ImagesScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Chatbot"
            component={ChatbotScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Map"
            component={BuildingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Places"
            component={PlacesScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PlaceImage"
            component={PlaceImage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="About"
            component={About}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>

        <NotificationPopup />

      </NavigationContainer>
    </AuthProvider>
  );
}
