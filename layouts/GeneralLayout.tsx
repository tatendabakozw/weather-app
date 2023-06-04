import React, { ReactNode } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native";
import tw from "twrnc";
import CustomHeader from "../components/navigation/CustomHeader";

type Props = {
  children?: ReactNode;
  header_title: string;
  no_header?:boolean
};

const GeneralLayout = (props: Props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {!props.no_header && (
        <View>
          <CustomHeader heading__title={props.header_title} />
          </View>
      )}
      <ScrollView
        style={[tw`flex-1 bg-slate-100 h-full`, { paddingHorizontal: 10 }]}
      >
        {props.children}
      </ScrollView>
    </SafeAreaView>
  );
};

export default GeneralLayout;
