import React, { Component } from "react";
import { View } from "react-native";

export default class Ctn extends Component {
 
  shouldComponentUpdate() {
      return false;
  // it won't trigger re-render on children, won't be owner of child 
  };

  render() {
    let {  leftSide,rightSide } = this.props;
    return (
      <View style={{flexDirection:'row'}}>
        {leftSide}
        {rightSide}
      </View>
    );
  }
}

// USE IT 

// <Ctn 
//  leftSide={<SomeSmartComponent/>}
//  rightSide={<SomeOtherComponent/>}
// />


    