import React, { Component } from "react";
import { View, Text, Animated, Easing, StyleSheet, TouchableOpacity, findNodeHandle, UIManager } from "react-native";

import { Entypo } from "@expo/vector-icons";
const EntypoIcon = Animated.createAnimatedComponent(Entypo);

import { WIDE, TALL } from "../../constants/device";
import Theme from "../../constants/theme";

const config ={
  delay:100,
  duration:1000,
  radius:5,
  transparency:.6,
  offset:2
}

export default class Toggle extends Component {
  state = {
    isOpen: false,
    opacity: new Animated.Value(0),
    animation: new Animated.Value(this.props.minHeight),
    maxHeight:0
  };

  toggle = () => {
    let initialValue = this.state.isOpen
        ? this.state.maxHeight + this.props.minHeight
        : this.props.minHeight,
      finalValue = this.state.isOpen
        ? this.props.minHeight
        : this.state.maxHeight + this.props.minHeight;

    this.setState({
      isOpen: !this.state.isOpen
    });

    this.state.animation.setValue(initialValue);

    Animated.spring(this.state.animation, {
      toValue: finalValue,
      duration: config.duration,
      bounciness:4
    }).start(
      Animated.spring(this.state.opacity, {
        toValue: this.state.isOpen ? 0 : 1,
        delay: this.state.isOpen ? 0 : config.delay,
        duration: this.state.isOpen ? 1 : config.duration,
        // useNativeDriver:'true'
      }).start()
    )

  };

  stateToStyles = () => {
    return {
      ctn: this.state.isOpen
        ? {
            shadowOpacity: config.transparency,
            shadowOffset: { x: 0, y: config.offset },
            shadowColor: Theme.color.palpatine,
            shadowRadius: config.radius
          }
        : {},

      animated: {
        opacity: this.state.opacity
      },

      title: this.state.isOpen
        ? {
            opacity: 0.8,
            backgroundColor: "transparent",
            marginBottom: TALL
          }
        : {
            opacity: 1,
            backgroundColor: "transparent"
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
    let { isOpen, opacity, animation } = this.state;

    const ctnStyles = {
      width: "90%",
      alignSelf: "center",
      backgroundColor:Theme.color.rey,
      position: "relative",
      borderRadius: config.radius,
      height: animation,
      paddingHorizontal: WIDE,
      paddingVertical: TALL,
      marginBottom: TALL
    };
    const titleStyles = {
      fontSize: Theme.type.lg - 10,
      fontFamily: Theme.type.bold,
      maxWidth: "90%"
    };
    const icoColor = opacity.interpolate({
      inputRange: [0, 1],
      outputRange: ["#111", "#555"]
    });

    const icoColorStyle = {
      color: icoColor,
      backgroundColor: "transparent",
      marginTop:-6 // MAGIC NUMBER, SORRY GODS
    };

    return (
      <Animated.View style={[ctnStyles, this.stateToStyles().ctn]}>
        <View style={this.stateToStyles().row}>
          <Text
            numberOfLines={isOpen ? 2 : 1}
            style={[titleStyles, this.stateToStyles().title]}
          >
            {label}
          </Text>
          <TouchableOpacity
            onPress={this.toggle}
          >
            {isOpen ? (
              <EntypoIcon
                name="chevron-up"
                size={42}
                style={icoColorStyle}
              />
            ) : (
              <EntypoIcon
                name="chevron-down"
                size={42}
                style={icoColorStyle}
              />
            )}
          </TouchableOpacity>
        </View>

        <Animated.View style={this.stateToStyles().animated}>
        <View 
          ref={el => {
            this.measured = el;
          }}
        onLayout={({ nativeEvent }) => {
              UIManager.measure(
                findNodeHandle(this.measured),
                (x, y, width, height, pageX, pageY) => {
                  this.setState({
                    maxHeight:Math.floor(height)
                  })
                }
              );
            }}>
          {this.props.children}
          </View>
        </Animated.View>
      </Animated.View>
    );
  }
}

// USE IT

// <Toggle
//  label={}
// />

// POSSIBLE OPTIMIZATIONS

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
// 