import React from "react";
import { ScrollView, View, StyleSheet, Text } from "react-native";
import { StackNavigator } from "react-navigation";
import { Ionicons } from "@expo/vector-icons";
import {
  TitleAlpha,
  TitleBeta,
  Body
} from "../components/bootstrap/typography";
import Toggle from "../components/bootstrap/toggle";
import { WIDE, TALL, HEIGHT, WIDTH } from "../constants/device";
import Theme from "../constants/theme";

const Spacer = _ => <View style={{ height: TALL, opacity: 0 }} />;

export default class ConnectScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <ScrollView
        contentContainerStyle={{
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          paddingVertical: 15,
          backgroundColor: Theme.color.bg,
          flexGrow: 1,
          minHeight: HEIGHT * 2
        }}
      >
        <Spacer />

        <Toggle
          minHeight={150}
          label={"C'eci n'est pas un toggle widget"}
        >
          <Body>
            we are united,we are one, we old. We love, run, padel, jump,
            love,cool
          </Body>
        </Toggle>

        <Spacer />

        <Toggle
          minHeight={150}
          label={"C'eci n'est pas un toggle"}
        >
          <Body>
            we are united,we are one
          </Body>
        </Toggle>

        <Spacer />

        <Toggle
          minHeight={150}
          label={"C'eci n'est"}
        >
          <Body>
            we are united,we are one, we old. We love, run, padel, jump,
            love,cool. we are united,we are one, we old. We love, run, padel, jump,
            love,cool.
          </Body>
        </Toggle>

        <Spacer />

        <Toggle
          minHeight={150}
          label={"C'eci "}
        >
          <Body>
            we are united,we are one, we old. We love, run, padel, jump,
            love,cool
          </Body>
        </Toggle>

        <Spacer />

        <Toggle
          minHeight={150}
          label={"C'eci n'est pas un toggle widget"}
        >
          <Body>
            we are united,we are one, we old. We love, run, padel, jump,
            love,cool
          </Body>
        </Toggle>

        <Spacer />

        <Toggle
          minHeight={150}
          label={"C'eci n'est pas un toggle widget"}
        >
          <Body>
            we are united,we are one, we old. We love, run, padel, jump,
            love,cool. we are united,we are one, we old. We love, run, padel, jump,
            love,cool. we are united,we are one, we old. We love, run, padel, jump,
            love,cool
          </Body>
        </Toggle>

        <Spacer />
      </ScrollView>
    );
  }
}
