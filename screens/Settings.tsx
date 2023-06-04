import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import GeneralLayout from "../layouts/GeneralLayout";
import tw from "twrnc";
import * as Notifications from "expo-notifications";
import { getMessage } from "../helpers/getMessage";

type Props = {};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const Settings = (props: Props) => {
  const [loading, setLoading] = useState(false);

  const extremely_hot_weather = async () => {
    try {
      setLoading(true);
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "DaM",
          body: "It's extremely hot outside. We suggest you wear sunhats or to stay indoors.",
          data: {
            data: "We might have reason to assume the weather is not safe for walking. Please stay indoors",
          },
        },
        trigger: { seconds: 1 },
      });
      setLoading(false);
    } catch (error) {
      Alert.alert("Cant sent notification", getMessage(error), [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
  };

  const extremely_cold_weather = async () => {
    try {
      setLoading(true);
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "DaM",
          body: "It's extremely cold outside. We suggest you wear warm clothing like jackets and warm shoes.",
          data: {
            data: "We might have reason to assume the weather is not safe for walking. Please stay indoors",
          },
        },
        trigger: { seconds: 1 },
      });
      setLoading(false);
    } catch (error) {
      Alert.alert("Cant sent notification", getMessage(error), [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
  };

  const thunderstorms_weather = async () => {
    try {
      setLoading(true);
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "DaM",
          body: "We predict there is going to be a thunderstom today. Please stay indoors. Warm your relatives",
          data: {
            data: "We might have reason to assume the weather is not safe for walking. Please stay indoors",
          },
        },
        trigger: { seconds: 1 },
      });
      setLoading(false);
    } catch (error) {
      Alert.alert("Cant sent notification", getMessage(error), [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
  };

  return (
    <GeneralLayout header_title="Settings">
      <View style={tw`py-16`}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={extremely_hot_weather}
          style={tw`bg-[#048BA8] text-white rounded-full p-4 my-2`}
        >
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Text style={tw`w-full text-white text-center font-semibold`}>
              Extremenly Hot
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={extremely_cold_weather}
          style={tw`bg-[#048BA8] text-white rounded-full p-4 my-2`}
        >
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Text style={tw`w-full text-white text-center font-semibold`}>
              Extremely Cold
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={thunderstorms_weather}
          style={tw`bg-[#048BA8] text-white rounded-full p-4 my-2`}
        >
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Text style={tw`w-full text-white text-center font-semibold`}>
              Thunderstorms
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </GeneralLayout>
  );
};

export default Settings;

const styles = StyleSheet.create({});
