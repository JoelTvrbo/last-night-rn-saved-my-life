import React, { Component } from "react";
import { Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { height } from "../../constants/device";
import Theme from "../../constants/theme";

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

const requiredParam = () => {
  throw new Error('Missing required look parameter');
}

propsToStyles = (look = requiredParam() ) => {
  if (look === "primary") return { backgroundColor: Theme.color.primary };
  if (look === "secondary") return { backgroundColor: Theme.color.secondary };
  if (look === "disabled") return { backgroundColor: Theme.color.disabled};
  if (look === "first") return { width: "50%", backgroundColor: Theme.color.primary };
  if (look === "last") return { width: "50%", backgroundColor: Theme.color.secondary };
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


// USE IT

// import Button, { looks } from "./comps/bootstrap/btn";

// <Button look={looks.secondary} handleClick={this.toggleNotification} label={"Ok, thanks!"} />

// <View style={{ flexDirection: "row" }}>
//   <Button look={looks.first} handleClick={this.toggleNotification} label={"Ok, thanks!"} />
//   <Button look={looks.last} handleClick={this.toggleNotification} label={"Ok, thanks!"} />
// </View>