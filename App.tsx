// In App.js in a new project
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SelectUser from "./screens/SelectUser";
import Home from "./screens/Home";
import Intro from "./screens/Intro";
import PlaceWeather from "./screens/PlaceWeather";
import Toutrist from "./screens/Tourists";
import Farmers from "./screens/Farmers";
import Settings from "./screens/Settings";
import SearchResults from "./screens/SearchResults";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Intro"
      >
        <Stack.Screen name="Intro" component={Intro} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SelectUser" component={SelectUser} />
        <Stack.Screen name="PlaceWeather" component={PlaceWeather} />
        <Stack.Screen name="Tourists" component={Toutrist} />
        <Stack.Screen name="Farmers" component={Farmers} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Results" component={SearchResults} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
