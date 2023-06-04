import React, { useState } from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Platform,
  TouchableOpacity,
  TextInput,
} from "react-native";
import tw from "twrnc";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

type Props = {
  heading__title: string;
};

const CustomHeader = ({ heading__title }: Props) => {
  const navigation = useNavigation();
  const [open_search, setOpenSearch] = useState(false);
  const [results, setResults] = useState("");
  return (
    <SafeAreaView style={[tw`relative bg-slate-50 w-full mt-2`, styles.header]}>
      <ExpoStatusBar style="auto" />
      {open_search ? (
        <View style={tw`flex-row items-center`}>
          <TextInput
            placeholder="Search area"
            onChangeText={(text) => setResults(text)}
            style={tw`bg-white flex-1 py-2 mx-2 rounded-full px-4`}
          />
          <TouchableOpacity
            style={tw`bg-white p-2 rounded-full`}
            onPress={() => {
              // @ts-ignore
              navigation.navigate("Results", {
                query: results,
              });
            }}
          >
            <Ionicons name="ios-search" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setOpenSearch(false);
            }}
            style={tw`mx-1 p-2 bg-white rounded-full`}
          >
            <Feather name="x" size={24} color="#64748b" />
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={[tw` mx-4 flex-row items-center absolute`, styles.belowHeader]}
        >
          <Text style={tw`flex-1 text-2xl text-slate-500`}>
            {heading__title}
          </Text>
          <View style={tw`mx-1`} />
          <TouchableOpacity
            onPress={() => setOpenSearch(true)}
            activeOpacity={0.7}
            style={tw`bg-white rounded-full p-4`}
          >
            <Feather name="search" size={16} color="#64748b" />
          </TouchableOpacity>
          <View style={tw`mx-1`} />
          <TouchableOpacity
            onPress={() =>
              // @ts-ignore
              navigation.navigate("Settings")
            }
            activeOpacity={0.7}
            style={tw`bg-white rounded-full p-4`}
          >
            <Feather name="bell" size={16} color="#64748b" />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default CustomHeader;

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
  header__colorItem: {
    backgroundColor: "#1E3A8A",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginRight: 10,
    flex: 1,
  },

  header__search: {
    backgroundColor: "#F9FAFB",
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 50,
    marginRight: 10,
    flex: 1,
  },
});
