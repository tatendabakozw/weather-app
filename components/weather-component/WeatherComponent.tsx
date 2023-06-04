import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import tw from "twrnc";
import { ActivityIndicator } from "react-native";
import { data } from "../../utils/data";

type Props = {
  picture: any;
  location: string;
  condition: string;
  temperature: string;
  heading: string;
  loading: boolean;
};

const WeatherComponent = (props: Props) => {
  const navigation = useNavigation();

  if (props.loading) {
    return (
      <View style={tw`rounded-3xl bg-[#048BA8] p-8`}>
        <View style={tw`flex flex-col`}>
          <View style={tw`flex flex-row items-center justify-between`}>
            <View style={tw`flex flex-col pb-8`}>
              <Text style={tw`text-slate-200 pb-2`}>loading...</Text>
              <Text style={tw`text-xl font-semibold text-white`}>
                loading...
              </Text>
            </View>
            <View>
              {/* <Image source={data.icons.sunny} style={tw`h-20 w-20`} /> */}
              <ActivityIndicator size={"small"} />
            </View>
          </View>
          <View style={tw`flex flex-row w-full justify-between`}>
            <Text style={tw`text-slate-300`}>loading...</Text>
            <Text style={tw`text-slate-300`}>&#8451;</Text>
          </View>
        </View>
      </View>
    );
  }

  const weather_icon = props?.condition?.toLowerCase()?.includes("cloudy")
    ? data.icons.cloudy
    : props?.condition?.toLowerCase()?.includes("sunny")
    ? data.icons.sunny
    : props?.condition?.toLowerCase()?.includes("rain")
    ? data.icons.rainy
    : data.icons.thunderstorm;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() =>
        // @ts-ignore
        navigation.navigate("PlaceWeather", {
          loc: props.location,
        })
      }
      style={tw`rounded-3xl bg-[#048BA8] p-8`}
    >
      <View style={tw`flex flex-col`}>
        <View style={tw`flex flex-row items-center justify-between`}>
          <View style={tw`flex flex-col pb-8`}>
            <Text style={tw`text-slate-200 pb-2`}>{props.heading}</Text>
            <Text style={tw`text-xl font-semibold text-white`}>
              {props.location}
            </Text>
          </View>
          <View>
            <Image source={weather_icon} style={tw`h-20 w-20`} />
          </View>
        </View>
        <View style={tw`flex flex-row w-full justify-between`}>
          <Text style={tw`text-slate-300`}>{props.condition}</Text>
          <Text style={tw`text-slate-300`}>{props.temperature}&#8451;</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default WeatherComponent;

const styles = StyleSheet.create({});
