import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import GeneralLayout from "../layouts/GeneralLayout";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Location from "expo-location";
import axios from "axios";
import { data } from "../utils/data";
import WeatherComponent from "../components/weather-component/WeatherComponent";
import { Feather, Entypo } from "@expo/vector-icons";
import { returnIcon } from "../helpers/returnIcon";

type Props = {
  route?: any;
};

const SearchResults = ({ route }: Props) => {

  const { loc } = route.params;
  const routerr = useRoute();
  // @ts-ignore
  const { query } = routerr.params;

  let weatherApiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${data.weatherApiKey}&q=${query}&days=7&aqi=no&alerts=no`;

  const [forecast, setForecast] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);

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

      // console.log(location)

      // fetch(`${url}&lat=${location.coords.latitude}&lon=${location.coords.longitude}`)

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

  console.log(
    "first item in object days ==---- ",
    forecast?.forecast.forecastday[2]
  );

  return (
    <GeneralLayout header_title={`Results for ${query}`}>
      <View style={tw`h-full flex-1 flex-col w-full bg-slate-100`}>
        <View style={tw` flex`}>
          <WeatherComponent
            loading={refreshing}
            picture={forecast.current.condition.icon.slice(2)}
            condition={forecast.current.condition.text}
            temperature={forecast.current.temp_c}
            location={forecast.location.name}
            heading={forecast.location.name}
          />
        </View>
        <View
          style={tw`flex flex-row items-center border border-slate-200 justify-around my-4 bg-white p-4 rounded-xl`}
        >
          <View style={tw`flex flex-col items-center`}>
            <Feather name="wind" size={24} color="#0f172a" />
            <Text style={tw`text-lg font-semibold text-slate-900`}>
              {forecast.current.wind_kph}km/h
            </Text>
            <Text style={tw`text-slate-500`}>Wind</Text>
          </View>
          <View style={tw`flex flex-col items-center`}>
            <Entypo name="air" size={24} color="#0f172a" />
            <Text style={tw`text-lg font-semibold text-slate-900`}>
              {forecast.current.humidity}%
            </Text>
            <Text style={tw`text-slate-500`}>Humidity</Text>
          </View>
          <View style={tw`flex flex-col items-center`}>
            <Feather name="cloud" size={24} color="#0f172a" />
            <Text style={tw`text-lg font-semibold text-slate-900`}>
              {forecast.current.cloud}%
            </Text>
            <Text style={tw`text-slate-500`}>Clouds</Text>
          </View>
        </View>
        <View style={tw`bg-white rounded-3xl h-full flex-1 p-4 `}>
          {forecast?.forecast?.forecastday?.map((item: any, index: number) => (
            <View
              key={index}
              style={tw`flex flex-row  items-center justify-between py-2`}
            >
              <Text style={tw`text-slate-500 mr-8`}>{item.date}</Text>
              <View style={tw`flex flex-row items-center flex-1 self-start`}>
                <Image
                  source={returnIcon(item.day.condition.text)}
                  style={tw`h-8 w-8 mr-2`}
                />
                <Text style={tw`text-slate-900 font-semibold`}>
                  {item.day.condition.text}
                </Text>
              </View>
              <View style={tw`flex flex-row items-center`}>
                <Text style={tw`text-slate-500`}>{item.day.maxtemp_c}</Text>
                <Text>/</Text>
                <Text style={tw`text-slate-500`}>{item.day.mintemp_c}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </GeneralLayout>
  );
};

export default SearchResults;

const styles = StyleSheet.create({});
