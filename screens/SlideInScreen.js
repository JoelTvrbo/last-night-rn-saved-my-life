import React, { cloneElement } from "react";
import { Animated, View, Image, StyleSheet, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { HEIGHT, WIDTH } from "../constants/device";
import Theme from "../constants/theme";
import Artwork from "../constants/artwork";
import Button, { looks } from "../components/bootstrap/btn";
import { TitleAlpha, TitleBeta, Body } from "../components/bootstrap/typography";

export default class SlideInScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    active: false,
    animation: new Animated.Value(0)
  };

  toggle = () => {
    const toValue = this.state.active ? 0 : 1;
    Animated.spring(
      this.state.animation,
      {
        toValue,
        tension: 15
      },
      {
        nativeDriver: true
      }
    ).start(() =>
      this.setState({ active: !this.state.active })
    );
  };

  renderIcon = () => {
    const opacityInterpolate = this.state.animation.interpolate({
      inputRange: [0, 0.7, 1],
      outputRange: [0, 0, 1]
    });

    const opacityStyle = {
      opacity: opacityInterpolate
    };

    const delayOpacityInterpolatee = this.state.animation.interpolate({
      inputRange: [0, 0.95, 1],
      outputRange: [0, 0, 1]
    });

    const delayOpacityStyle = {
      opacity: delayOpacityInterpolatee
    };

    const scaleNotificationImage = this.state.animation.interpolate({
      inputRange: [0, 0.99, 1],
      outputRange: [0, 1, 1]
    });

    const transformNotificationImages = {
      transform: [
        {
          scale: scaleNotificationImage
        }
      ]
    };
    return (
      <View style={styles.imageCtn}>
        <Animated.View style={[transformNotificationImages, opacityStyle]}>
          <View style={styles.tickBackground}>
            <Ionicons
              name="md-checkmark-circle"
              size={18}
              color="rgb(242, 190, 171)"
              style={styles.tickStyle}
            />
          </View>
          <Image style={styles.avatar} source={Artwork.slideInAlpha} />
        </Animated.View>
        <Animated.View style={[transformNotificationImages, delayOpacityStyle]}>
          <View style={styles.tickBackground}>
            <Ionicons
              name="md-checkmark-circle"
              size={18}
              color="rgb(242, 190, 171)"
              style={styles.tickStyle}
            />
          </View>
          <Image style={styles.avatar} source={Artwork.slideInBeta} />
        </Animated.View>
      </View>
    );
  };
  
  render() {
    const ctnTranslateY = this.state.animation.interpolate({
      inputRange: [0, 0.7, 1],
      outputRange: [WIDTH + 100, 100, 0]
    });

    const ctnTransformStyle = {
      transform: [
        {
          translateY: ctnTranslateY
        }
      ]
    };

    const backgroundOpacity = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0.8]
    });

    const backgroundOpacityStyle = {
      opacity: backgroundOpacity
    };

    const textTranslateYEffect = this.state.animation.interpolate({
      inputRange: [0, 0.6, 1],
      outputRange: [0, 100, 0]
    });

    const textTransformStyle = {
      transform: [
        {
          translateY: textTranslateYEffect
        }
      ]
    };

    return (
      <View style={styles.ctn}>
        <Button
          look={looks.alpha}
          handleClick={this.toggle}
          label={"Tap me!"}
        />
        <View
          style={[StyleSheet.absoluteFill]}
          pointerEvents={this.state.active ? "auto" : "none"}
        >
          <Animated.View
            style={[styles.blur, backgroundOpacityStyle]}
          />
          <Animated.View
            style={[styles.slideInCtn, ctnTransformStyle]}
          >
          <View>
            {this.renderIcon()}
            <Animated.View style={textTransformStyle}>
              <TitleBeta style={styles.center}>
                I like you rebel
              </TitleBeta>
            </Animated.View>
            <Animated.View style={[styles.bodyCtn, textTransformStyle]}>
              <Body style={styles.center}>
                Lorem ipsun dolor sit amet indisciplenctur gloria matter ad hominem bacon.
              </Body>
            </Animated.View>
            </View>
            <Button
              look={looks.beta}
              handleClick={this.toggle}
              label={"Ok, thanks!"}
            />
          </Animated.View>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
    ctn: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    blur: {
      flex: 2,
      backgroundColor: "lightgrey"
    },
    slideInCtn: {
      flex: 3,
      paddingTop: 30,
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: Theme.color.rey
    },
    imageCtn: {
      flexDirection: "row",
      alignItems:'center',
      justifyContent:'center'
    },

    center: {
      textAlign: "center",
    },
    bodyCtn: {
      width: "80%"
    },
    avatar: {
      height: 80,
      width: 80,
      borderRadius: 40,
      marginHorizontal: 10,
    },
    tickStyle: {
      position: "absolute",
      right: 7,
      top: -5
    },
    tickBackground: {
      zIndex: 9,
      backgroundColor: "transparent"
    },
  });
  
  
