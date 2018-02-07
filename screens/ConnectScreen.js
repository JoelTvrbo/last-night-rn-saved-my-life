import React from 'react';
import { ScrollView, View,StyleSheet } from 'react-native';
import Button, { looks } from "../components/btn";
import Header from "../components/bootstrap/header";
import Switch from "../components/bootstrap/switch";
import Clock from "../components/bootstrap/clock";
import Toggle from "../components/bootstrap/toggle";
import OnBoarding from '../components/on-boarding/comp';

import { Ionicons } from "@expo/vector-icons";
import {
  StackNavigator,
} from 'react-navigation';





const Title = _ => <Text>Connect!</Text>;
const SubTitle = _ => <Text>Use your fav service</Text>;

const Spacer = _ => <View style={{ height: tall, opacity: 0 }} />;



export default class ConnectScreen extends React.Component {
  static navigationOptions = {
    title: 'Connect',
  };


  goToReOrder= () => {
    this.props.navigation.navigate("ReOrder");
  }
  
  goToDeck = () => {
    this.props.navigation.navigate("Deck");
  }

  goToHood = () => {
    this.props.navigation.navigate("Hood");
  }
  
  goToPack = () => {
    this.props.navigation.navigate("Pack");
  }

  goToOnBoard = () => {
    this.props.navigation.navigate("OnBoarding");
  }
 
  goToDropZones = () => {
    this.props.navigation.navigate("DropZones");
  } 
  click = () => {
    console.log('clicked')
  }
  render() {
    return (
      <ScrollView 
      contentContainerStyle={{
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
      }}>
         <Header
            style={{ backgroundColor: "pink", width: "100%", padding: 40 }}
            title={<Title />}
            subtitle={<SubTitle />}
          />

          <Spacer />
     <View style={{ flexDirection: "row" }}>
          <Button look={looks.comboLeft} handleClick={this.click} label={"Login"} />
          <Button look={looks.comboRight} handleClick={this.click} label={"Register"} />
        </View>

        <Button look={looks.primary} handleClick={this.goToOnBoard} label={"OnBoarding"} />
        <Button look={looks.primary} handleClick={this.goToDropZones} label={"Drop zones"} />
        <Button look={looks.primary} handleClick={this.goToHood} label={"Hood"} />
        <Button look={looks.primary} handleClick={this.goToPack} label={"Pack"} />
      
        <Button look={looks.primary} handleClick={this.goToReOrder} label={"Reorder"} />
        <Button look={looks.primary} handleClick={this.goToDeck} label={"Deck"} />
      
        <Spacer />
          <Switch
            currentStatus={"Open"}
            disableScroll={value => {
              console.log("scrollEnabled", value);
              // this.scrollView.setNativeProps({
              //     scrollEnabled: value
              // });
            }}
            isParentScrollEnabled={false}
            onStatusChanged={text => {
              console.log("Change Status ", text);
            }}
          />
          <Spacer />

          <Toggle label={"aloha world"}>
            <Text>we are united,we are one, we old</Text>
          </Toggle>
          <Spacer />

          <Clock />

      </ScrollView>
    );
  }
}

