import WeatherComponent from "../components/weather-component/WeatherComponent";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { Alert } from "react-native";
import axios from "axios";
import tw from "twrnc";
// import { Store } from "../context/Store";
import { useNavigation, useRoute } from "@react-navigation/native";
import { data } from "../utils/data";
import { useForecast } from "../hooks/useForecast";
import GeneralLayout from "../layouts/GeneralLayout";

let weatherApiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${data.weatherApiKey}&q=chinhoyi&days=1&aqi=no&alerts=no`;
let bulawayoWeatherUrl = `http://api.weatherapi.com/v1/forecast.json?key=${data.weatherApiKey}&q=bulawayo&days=1&aqi=no&alerts=no`;
let harareWeatherUrl = `http://api.weatherapi.com/v1/forecast.json?key=${data.weatherApiKey}&q=harare&days=1&aqi=no&alerts=no`;
let mutareWeatherUrl = `http://api.weatherapi.com/v1/forecast.json?key=${data.weatherApiKey}&q=mutare&days=1&aqi=no&alerts=no`;
let masvingoWeatherUrl = `http://api.weatherapi.com/v1/forecast.json?key=${data.weatherApiKey}&q=masvingo&days=1&aqi=no&alerts=no`;
type Props = {};

const Home = (props: Props) => {
  const [forecast, setForecast] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
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

  const bulawayo_response = useForecast(bulawayoWeatherUrl);
  const harare_response = useForecast(harareWeatherUrl);
  const mutare_response = useForecast(mutareWeatherUrl);
  const masvingo_response = useForecast(masvingoWeatherUrl);

  useEffect(() => {
    loadForecast();
  }, []);

  // console.log(user_type);

  if (!forecast) {
    return (
      <GeneralLayout header_title="Home">
        <SafeAreaView
          style={tw`h-full w-full items-center py-16 content-center justify-center`}
        >
          {/* <Text>Item Loading...</Text> */}
          <ActivityIndicator size={"large"} color="#0f172a" />
        </SafeAreaView>
      </GeneralLayout>
    );
  }

  const conditions = [
    {
      picture: data.icons.rainy,
      condition: "Rainy",
      location: "Harare",
      heading: "Zimbabwe",
      temperature: "20",
    },
    {
      picture: data.icons.cloudy,
      condition: "Cloudy",
      location: "Bulawayo",
      heading: "Zimbabwe",
      temperature: "15",
    },
    {
      picture: data.icons.cloudy,
      condition: "Cloudy",
      location: "Bulawayo",
      heading: "Zimbabwe",
      temperature: "15",
    },
  ];

  return (
    <GeneralLayout header_title={`Hello ${user_type}, Discover the weather`}>
      {user_type === "tourist" ? (
        <View style={tw`w-full flex-col items-center`}>
          <TouchableOpacity
            onPress={() =>
              // @ts-ignore
              navigation.navigate("Tourists", {
                user_type: "tourist",
              })
            }
            style={tw`p-2 bg-white rounded mt-8`}
          >
            <Image
              style={tw`h-40 w-40`}
              source={require("../assets/tourist.png")}
            />
          </TouchableOpacity>
          <Text style={tw`text-slate-500 text-sm font-semibold pt-2`}>Click Me</Text>
        </View>
      ) : user_type === "farmer" ? (
        <View style={tw`w-full flex-col items-center`}>
          <TouchableOpacity
            onPress={() =>
              // @ts-ignore
              navigation.navigate("Farmers", {
                user_type: "farmer",
              })
            }
            style={tw`p-2 bg-white rounded mt-8`}
          >
            <Image
              style={tw`h-40 w-40`}
              source={require("../assets/farmer.png")}
            />
          </TouchableOpacity>
          <Text style={tw`text-slate-500 text-sm font-semibold pt-2`}>Click Me</Text>
        </View>
      ) : null}

      <View style={tw`py-8`}>
        <WeatherComponent
          picture={forecast?.current?.condition?.icon.slice(2)}
          condition={forecast?.current?.condition?.text}
          temperature={forecast?.current?.temp_c}
          location={forecast?.location?.name}
          loading={refreshing}
          heading="Current Location"
        />
      </View>
      <Text style={tw`flex-1 text-2xl text-slate-500 text-center`}>
        Around the country
      </Text>
      <View style={tw`py-2`}>
        <WeatherComponent
          picture={bulawayo_response?.data?.current?.condition?.icon?.slice(2)}
          condition={bulawayo_response?.data?.current?.condition?.text}
          loading={bulawayo_response.status === "fetching"}
          temperature={bulawayo_response?.data?.current?.temp_c}
          location={bulawayo_response?.data?.location?.name}
          heading={harare_response?.data?.location?.country}
        />
      </View>
      <View style={tw`py-2`}>
        <WeatherComponent
          picture={harare_response?.data?.current?.condition?.icon?.slice(2)}
          condition={harare_response?.data?.current?.condition?.text}
          temperature={harare_response?.data?.current?.temp_c}
          loading={bulawayo_response.status === "fetching"}
          location={harare_response?.data?.location?.name}
          heading={harare_response?.data?.location?.country}
        />
      </View>
      <View style={tw`py-2`}>
        <WeatherComponent
          picture={mutare_response?.data?.current?.condition?.icon?.slice(2)}
          condition={mutare_response?.data?.current?.condition?.text}
          loading={bulawayo_response.status === "fetching"}
          temperature={mutare_response?.data?.current?.temp_c}
          location={mutare_response?.data?.location?.name}
          heading={mutare_response?.data?.location?.country}
        />
      </View>
      <View style={tw`py-2`}>
        <WeatherComponent
          picture={masvingo_response?.data?.current?.condition?.icon?.slice(2)}
          condition={masvingo_response?.data?.current?.condition?.text}
          temperature={masvingo_response?.data?.current?.temp_c}
          loading={bulawayo_response.status === "fetching"}
          location={masvingo_response?.data?.location?.name}
          heading={masvingo_response?.data?.location?.country}
        />
      </View>
      {/* <Text style={tw`flex-1 text-2xl py-4 text-slate-500 text-center`}>
        Around the globe
      </Text>
      <View style={tw`py-2`}>
        <WeatherComponent
          picture={masvingo_response?.data?.current?.condition?.icon?.slice(2)}
          condition={masvingo_response?.data?.current?.condition?.text}
          temperature={masvingo_response?.data?.current?.temp_c}
          loading={bulawayo_response.status === "fetching"}
          location={masvingo_response?.data?.location?.name}
          heading={masvingo_response?.data?.location?.country}
        />
      </View> */}
    </GeneralLayout>
  );
};

export default Home;
