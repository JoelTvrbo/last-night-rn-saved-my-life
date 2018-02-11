import React, { Component } from "react";
import { Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { height } from "../../constants/device";

// USE IT
// import Button, { looks } from "./comps/bootstrap/btn";

// <Button look={looks.secondary} handleClick={this.toggleNotification} label={"Ok, thanks!"} />
// <View style={{ flexDirection: "row" }}>
//   <Button look={looks.first} handleClick={this.toggleNotification} label={"Ok, thanks!"} />
//   <Button look={looks.last} handleClick={this.toggleNotification} label={"Ok, thanks!"} />
// </View>

export const looks = {
  primary: "primary",
  secondary: "secondary",
  disabled:"disabled",
  first: "first",
  last: "last"
};

const common = {
  minHeight:80,
  height: height / 7,
  width:'100%',
  justifyContent: "center",
  alignItems: "center"
};

propsToStyles = name => {
  if (name === "primary") return { backgroundColor: "cyan" };
  if (name === "secondary") return { backgroundColor: "magenta" };
  if (name === "disabled") return { backgroundColor: "#bbb" };
  if (name === "first") return { width: "50%", backgroundColor: "cyan" };
  if (name === "last") return { width: "50%", backgroundColor: "yellow" };
};

const defaultHandleClick = _ => alert("Feature to be coded");

const Button = props => (
  <TouchableOpacity
    style={[common, propsToStyles(props.look)]}
    onPress={props.handleClick ? props.handleClick : defaultHandleClick}
  >
    <Text>{props.label}</Text>
  </TouchableOpacity>
);

export default Button;

Button.propTypes = {
  appearance: PropTypes.oneOf(Object.keys(looks))
};