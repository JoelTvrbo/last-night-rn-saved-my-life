import React from 'react';
import { ScrollView, View,StyleSheet } from 'react-native';
import Button, { looks } from "../components/btn";
import OnBoarding from '../components/on-boarding/comp';
import {
  StackNavigator,
} from 'react-navigation';

export default class ConnectScreen extends React.Component {
  static navigationOptions = {
    title: 'Connect',
  };



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
      <ScrollView style={styles.container}>
     
     <View style={{ flexDirection: "row" }}>
          <Button look={looks.comboLeft} handleClick={this.click} label={"Login"} />
          <Button look={looks.comboRight} handleClick={this.click} label={"Register"} />
        </View>

        <Button look={looks.primary} handleClick={this.goToOnBoard} label={"OnBoarding"} />
        <Button look={looks.primary} handleClick={this.goToDropZones} label={"Drop zones"} />


      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
