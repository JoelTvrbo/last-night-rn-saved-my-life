import React, { Component } from "react";
import { Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { height } from "../../constants/device";
import Theme from "../../constants/theme";

export const looks = {
  alpha: "alpha",
  beta: "beta",
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
  if (look === "alpha") return { backgroundColor: Theme.color.alpha };
  if (look === "beta") return { backgroundColor: Theme.color.beta };
  if (look === "disabled") return { backgroundColor: Theme.color.disabled};
  if (look === "first") return { width: "50%", backgroundColor: Theme.color.alpha };
  if (look === "last") return { width: "50%", backgroundColor: Theme.color.beta };
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

// <Button look={looks.alpha} handleClick={this.toggleNotification} label={"Ok, thanks!"} />

// <View style={{ flexDirection: "row" }}>
//   <Button look={looks.first} handleClick={this.toggleNotification} label={"Ok, thanks!"} />
//   <Button look={looks.last} handleClick={this.toggleNotification} label={"Ok, thanks!"} />
// </View>