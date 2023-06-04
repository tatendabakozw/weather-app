import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import GeneralLayout from "../layouts/GeneralLayout";
import tw from "twrnc";
import * as Location from "expo-location";
import axios from "axios";
import { data } from "../utils/data";
import { useRoute } from "@react-navigation/native";
import { recomment_clothing } from "../utils/recommend";

let weatherApiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${data.weatherApiKey}&q=chinhoyi&days=1&aqi=no&alerts=no`;
type Props = {};

const Toutrist = (props: Props) => {
  const [forecast, setForecast] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);
  const route = useRoute();
  // @ts-ignore
  const { user_type } = route.params;

  const loadForecast = async () => {
    setRefreshing(true);
    // ask for permision to access location
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }
      ``;
      // get current location
      const location = await Location.getCurrentPositionAsync({});

      const { data } = await axios.get(
        `${weatherApiUrl}&latitude=${location.coords.latitude}&longitude=${location.coords.longitude}`
      );
      setForecast(data);
      setRefreshing(false);
    } catch (error) {
      console.log(error);
      Alert.alert("Something went wrong");
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadForecast();
  }, []);

  if (!forecast) {
    return (
      <SafeAreaView
        style={tw`h-full w-full items-center content-center justify-center`}
      >
        {/* <Text>Item Loading...</Text> */}
        <ActivityIndicator size={"large"} color="#0f172a" />
      </SafeAreaView>
    );
  }

  return (
    <GeneralLayout header_title={`Tourists Page`}>
      <View style={tw`w-full flex-col items-center`}>
        <View style={tw`p-2 bg-white rounded my-4`}>
          <Image
            style={tw`h-40 w-40`}
            source={require("../assets/tourist.png")}
          />
        </View>
      </View>
      <View style={tw`py-8 bg-white rounded-lg border p-8 border-slate-200`}>
        <View style={tw`flex flex-row items-center w-full`}>
          <Text
            style={tw`text-slate-700 w-full text-center text-xl font-semibold`}
          >
            {recomment_clothing(
              forecast?.current?.condition?.text?.toLowerCase()
            )}
          </Text>
        </View>
      </View>
            <View style={tw`py-8 bg-white rounded-lg border p-8 my-4 border-slate-200`}>
            <Text
            style={tw`text-slate-700 w-full text-center text-xl font-semibold`}
          >
            {recomment_clothing(
              forecast?.current?.condition?.text?.toLowerCase()
            )}
          </Text>
            </View>
    </GeneralLayout>
  );
};

export default Toutrist;

const styles = StyleSheet.create({});
