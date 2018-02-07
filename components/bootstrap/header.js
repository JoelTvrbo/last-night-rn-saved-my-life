import React from "react";

/*
The props should now be built like this:
{
  styles: {},
}
*/

import { View } from "react-native";

export default Header = props =>
  <View {...props}>
    {props.title}
    {props.subtitle}
  </View>
  
// <Header title={<Title />} subtitle={<SubTitle />} /> 



