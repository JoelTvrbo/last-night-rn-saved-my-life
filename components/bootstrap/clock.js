import React, { Component } from "react";
import { AppRegistry, StyleSheet, View,Text } from "react-native";

const Base = (props) => <Text>{props.time}</Text>

export default class Clock extends Component {
  state = {
    time: ""
  };

  componentDidMount() {
    setInterval(() => {
      this.setState({ time: new Date().toLocaleString().split(" ")[1] });
    }, 1000);
  }

  render() {
    return(
    <View style={styles.container}>
      <Base time={this.state.time} />
    </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
