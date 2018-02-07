import React, { Component } from "react";
import { Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { wide, tall, height, width } from "../../constants/device";

// USE IT
// import Button, { looks } from "./comps/bootstrap/btn";

// <Button look={looks.secondary} handleClick={this.toggleNotification} label={"Ok, thanks!"} />
// <View style={{ flexDirection: "row" }}>
//   <Button look={looks.comboLeft} handleClick={this.toggleNotification} label={"Ok, thanks!"} />
//   <Button look={looks.comboRight} handleClick={this.toggleNotification} label={"Ok, thanks!"} />
// </View>

export const looks = {
  primary: "primary",
  secondary: "secondary",
  comboLeft: "comboLeft",
  comboRight: "comboRight"
};

const common = {
  height: 100,
  width:'100%',
  justifyContent: "center",
  alignItems: "center"
};

propsStyles = name => {
  if (name === "primary") return { backgroundColor: "cyan" };
  if (name === "secondary") return { backgroundColor: "magenta" };
  if (name === "comboLeft") return { width: "50%", backgroundColor: "cyan" };
  if (name === "comboRight") return { width: "50%", backgroundColor: "yellow" };
};

const defaultHandleClick = _ => alert("Funcionalidad aún no implementada");

const Button = props => (
  <TouchableOpacity
    style={[common, propsStyles(props.look)]}
    onPress={props.handleClick ? props.handleClick : defaultHandleClick}
  >
    <Text>{props.label}</Text>
  </TouchableOpacity>
);

export default Button;

Button.propTypes = {
  appearance: PropTypes.oneOf(Object.keys(looks))
};