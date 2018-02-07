import React, { Component } from "react";
import { View } from "react-native";


// USE IT 
// <CompCtn 
//  leftSide={<SomeSmartComponent/>}
//  rightSide={<SomeOtherComponent/>}
// />

export default class CompCtn extends Component {
 
  shouldComponentUpdate() {
  // it won't trigger re-render on children, won't be owner of child 
      return false;
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



    