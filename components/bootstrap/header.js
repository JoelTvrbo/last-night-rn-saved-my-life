import React from "react";

/*
props should now be built like this:
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
  
// USE IT
  
// <Header title={<Title />} subtitle={<SubTitle />} /> 



