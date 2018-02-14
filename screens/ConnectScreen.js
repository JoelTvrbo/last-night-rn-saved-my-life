import React from "react";
import { ScrollView, View, StyleSheet, Text } from "react-native";
import { StackNavigator } from "react-navigation";
import { Ionicons } from "@expo/vector-icons";
import { TitleAlpha, TitleBeta, Body } from "../components/bootstrap/typography";
import Button, { looks } from "../components/bootstrap/btn";
import Header from "../components/bootstrap/header";
import Switch from "../components/bootstrap/switch";
import Clock from "../components/bootstrap/clock";
import { WIDE, TALL, HEIGHT, WIDTH } from "../constants/device";
import Theme from "../constants/theme";

const Title = _ => <TitleAlpha>Connect!</TitleAlpha>;
const SubTitle = _ => <TitleBeta>Use your fav service</TitleBeta>;
const Spacer = _ => <View style={{ height: TALL, opacity: 0 }} />;

export default class ConnectScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  goToToggle = () => {
    this.props.navigation.navigate("Toggle");
  };

  goToSlideIn = () => {
    this.props.navigation.navigate("SlideIn");
  };

  goToReOrder = () => {
    this.props.navigation.navigate("ReOrder");
  };

  goToDeck = () => {
    this.props.navigation.navigate("Deck");
  };

  goToHood = () => {
    this.props.navigation.navigate("Hood");
  };

  goToPack = () => {
    this.props.navigation.navigate("Pack");
  };

  goToOnBoard = () => {
    this.props.navigation.navigate("OnBoarding");
  };

  goToDropZones = () => {
    this.props.navigation.navigate("DropZones");
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
        <Header
          style={{
            backgroundColor: "rgba(255,255,255,.2)",
            width: "100%",
            padding: 40
          }}
          title={<Title />}
          subtitle={<SubTitle />}
        />

        <Spacer />

        <View style={{ flexDirection: "row" }}>
          <Button look={looks.first} label={"Login"} />
          <Button look={looks.last} label={"Register"} />
        </View>

        <Spacer />

        <Button
          look={looks.beta}
          handleClick={this.goToToggle}
          label={"Toggle"}
        />
        <Spacer />

        <Button
          look={looks.alpha}
          handleClick={this.goToSlideIn}
          label={"SlideIn"}
        />
        <Spacer />

        <Button
          look={looks.alpha}
          handleClick={this.goToOnBoard}
          label={"OnBoarding"}
        />
        <Spacer />

        <Button
          look={looks.alpha}
          handleClick={this.goToDropZones}
          label={"Drop zones"}
        />
        <Spacer />

        <Button look={looks.alpha} handleClick={this.goToHood} label={"Hood"} />
        <Spacer />

        <Button look={looks.alpha} handleClick={this.goToPack} label={"Pack"} />
        <Spacer />

        <Button
          look={looks.alpha}
          handleClick={this.goToReOrder}
          label={"Reorder"}
        />
        <Spacer />

        <Button
          look={looks.disabled}
          handleClick={this.goToDeck}
          label={"Deck"}
        />
        <Spacer />

        <Spacer />
        <Switch
          current={1}
          disableScroll={value => {
            console.log("scrollEnabled", value);
            // this.scrollView.setNativeProps({
            //     scrollEnabled: value
            // });
          }}
          isParentScrollEnabled={false}
          onStatusChanged={idx => {
            console.log("Current idx ", idx);
          }}
        />
        <Spacer />

        <Clock />
      </ScrollView>
    );
  }
}
