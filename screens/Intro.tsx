import {
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { useContext } from "react";
  import tw from "twrnc";
  import { StatusBar as ExpoStatusBar } from "expo-status-bar";
//   import SvgUri from "react-native-svg-uri";
  import { useNavigation } from "@react-navigation/native";
  type Props = {};
  
  const Intro = (props: Props) => {
    const navigation = useNavigation();
    return (
      <SafeAreaView style={[tw`bg-white h-full py-8`]}>
        <View style={styles.header} />
        <ExpoStatusBar />
        <View style={tw`relative flex flex-1 flex-col items-center px-4`}>
          <View style={tw`h-80 flex-1`}>
            {/* <SvgUri
              width="300"
              height="200"
              source={require("../assets/intro_pic.svg")}
            /> */}
          </View>
          <View style={tw`flex p-8 bg-white rounded-2xl`}>
            <Text style={tw`text-2xl font-semibold text-center`}>
              Explore global map of weather and climate conditions
            </Text>
            <Text style={tw`text-slate-500 text-lg text-center pt-8 pb-16`}>
              Weather forecast should not be a problem to anyone. Climate changes
              should be viewed by everyone at anypoint in time, at any location.
              This is what this DaM is for
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              // @ts-ignore
              onPress={() => navigation.navigate("SelectUser")}
              style={tw`bg-[#048BA8] text-white rounded-full p-4`}
            >
              <Text style={tw`w-full text-white text-center font-semibold`}>
                Get Started
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  };
  
  export default Intro;
  
  const styles = StyleSheet.create({
    header: {
      height: 110,
      paddingVertical: 20,
      overflow: "hidden",
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    belowHeader: {
      top: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
  });
  