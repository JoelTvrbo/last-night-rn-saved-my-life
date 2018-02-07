import React, { Component } from "react";
import {
  View,
  Text,
  Animated,
  Easing,
  StyleSheet,
  TouchableOpacity,
  findNodeHandle,
  UIManager
} from "react-native";
import {wide, tall, statusbar} from "../../constants/device";

import Theme from "../../constants/theme";
import { Entypo } from "@expo/vector-icons";
const EntypoIcon = Animated.createAnimatedComponent(Entypo);

// USE IT
// <Toggle
//  label={}
//  message={}
// />

export default class Toggle extends Component {
  state = {
    isOpen: false,
    opacity: new Animated.Value(0),
    animation: new Animated.Value(this.props.minHeight)
  };

  //  componentWillReceiveProps(nextProps) {
  //     if (!this.props.isOpen && nextProps.isOpen) {
  //       this.animateOpen();
  //     } else if (this.props.isOpen && !nextProps.isOpen) {
  //       this.animateClose();
  //     }
  //   }

  //   componentWillUpdate(nextProps, nextState) {
  //   if (nextState.isOpen == true && this.state.isOpen == false) {
  //     this.animateOpen();
  //   } else if (nextState.isOpen == true && this.state.isOpen == false) {
  //     this.animateClose();
  //   }
  // }
  // ,useNativeDriver:'true'

  toggle = () => {
    let initialValue = this.state.isOpen
        ? this.props.maxHeight + this.props.minHeight
        : this.props.minHeight,
      finalValue = this.state.isOpen
        ? this.props.minHeight
        : this.props.maxHeight + this.props.minHeight;

    this.setState({
      isOpen: !this.state.isOpen
    });

    this.state.animation.setValue(initialValue);

    Animated.timing(this.state.opacity, {
      toValue: this.state.isOpen ? 0 : 1,
      delay: this.state.isOpen ? 0 : 100,
      duration: this.state.isOpen ? 1 : 500
    }).start(
      Animated.spring(this.state.animation, {
        toValue: finalValue,
        duration: 1000
      }).start()
    );
  };

  getStyles = () => {
    return {
      ctn: this.state.isOpen
        ? {
            shadowOpacity: 0.4,
            shadowOffset: { x: 0, y: 2 },
            shadowColor: "black",
            shadowRadius: 5
          }
        : {},

      animated: {
        opacity: this.state.opacity
      },

      title: this.state.isOpen
        ? {
            opacity: 0.8,
            backgroundColor: "transparent",
            marginBottom: tall
          }
        : {
            opacity: 1,
            backgroundColor: "transparent"
          },
      msg: this.state.isOpen
        ? {
            textAlign: "center",
            fontFamily: Theme.type.regular,
            backgroundColor: "transparent"
          }
        : {
            backgroundColor: "transparent"
          },
      bubbleStyle: {
        width: 15,
        height: 15,
        backgroundColor: "rgb(252, 100, 77)",
        borderRadius: 10,
        position: "absolute",
        right: "10%", // POS DYNAMIC ?¿
        top: "10%",
        opacity: this.state.rippleOpacity
      },
      row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start"
      }
    };
  };

  render() {
    let { label } = this.props;
    let { isOpen } = this.state;

    const ctnStyles = {
      width: "90%",
      alignSelf: "center",
      backgroundColor: "rgba(255,255,255,1)",
      position: "relative",
      borderRadius: 5,
      borderColor: "white",
      borderWidth: 2,
      height: this.state.animation,
      paddingHorizontal: wide,
      paddingVertical: tall,
      marginBottom: tall
    };
    const titleStyles = {
      fontSize: Theme.type.lg - 10,
      fontFamily: Theme.type.bold,
      maxWidth: "90%"
    };
    const icoColor = this.state.opacity.interpolate({
      inputRange: [0, 1],
      outputRange: ["black", "#444"]
    });

    const icoColorStyle = {
      color: icoColor
    };

    return (
      <Animated.View style={[ctnStyles, this.getStyles().ctn]}>
        <View style={this.getStyles().row}>
          <Text
            numberOfLines={isOpen ? 2 : 1}
            style={[titleStyles, this.getStyles().title]}
          >
            {label}
          </Text>
          <TouchableOpacity
            onPress={this.toggle}
            style={{ position: "relative" }}
          >
            {isOpen ? (
              <EntypoIcon
                name="chevron-up"
                size={42}
                style={[icoColorStyle, { backgroundColor: "transparent" }]}
              />
            ) : (
              <EntypoIcon
                name="chevron-down"
                size={42}
                style={[icoColorStyle, { backgroundColor: "transparent" }]}
              />
            )}
          </TouchableOpacity>
        </View>

        <Animated.View style={this.getStyles().animated}>
          {this.props.children}
        </Animated.View>
      </Animated.View>
    );
  }
}
