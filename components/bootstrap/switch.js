import React, { cloneElement, Component } from "react";
import {
  Animated,
  Image,
  View,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  UIManager,
  Platform
} from "react-native";
import PropTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";

import { WIDE, WIDTH } from "../../constants/device";
import Theme from "../../constants/theme";

const config = {
  height:55,
  duration: 50,
  iconSize: 25,
  radius:28,
  border:1,
  transparency:0.3,
  offset:1
};

const items = [
  {
    uid: 1,
    label: "Left",
    icon: "ios-cloudy",
    iconActive: "ios-cloudy",
    color: Theme.color.base,
    colorActive: Theme.color.beta
  },
  {
    uid: 2,
    label: "Middle",
    icon: "ios-aperture-outline",
    iconActive: "ios-aperture",
    color: Theme.color.base,
    colorActive: Theme.color.beta
  },
  {
    uid: 3,
    label: "right",
    icon: "ios-analytics-outline",
    iconActive: "ios-analytics",
    color: Theme.color.base,
    colorActive: Theme.color.beta
  }
];

export default class Switch extends React.Component {
  state = {
    isComponentReady: false,
    position: new Animated.Value(0),
    current: items[0],
    idx: 1,
    ctn: 0,
    xx: new Animated.Value(0)
  };

  measureRef(ref, key) {
    if (!ref) return;
    if (this.state.ctn === 0) {
      requestAnimationFrame(() => {
        ref.measure((ox, oy, width, height, px, py) => {
          this.setState({
            [key]: width
          });
        });
      });
    } else return;
  }

  componentDidMount() {
    this.isParentScrollDisabled = false;
    this.xx =0;
    this.panListener = this.state.xx.addListener((value) => this.xx = value);
  }
  componentWillUnmount(){
    this.state.xx.removeListener(this.panListener);
  }
  componentWillMount() {

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        // disable parent scroll if slider is inside a scrollview
        if (!this.isParentScrollDisabled) {
          this.props.disableScroll(false);
          this.isParentScrollDisabled = true;
        }
        this.state.xx.setOffset(this.xx);
        this.state.xx.setValue(0);
      },
      onPanResponderMove: (evt, gestureState) =>  { Animated.event([null, { dx: this.state.xx }])(
              evt,
              gestureState
            )
          },

      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: (evt, gestureState) => {
        const { moveX } = gestureState;
        this.isParentScrollDisabled = false;
        this.props.disableScroll(true);

        if (moveX >= 0 && moveX <= this.state.ctn / 3) {
          this.goTo(1);
        } else if (
          moveX >= this.state.ctn / 3 &&
          moveX <= this.state.ctn / 3 * 2
        ) {
          this.goTo(2);
        } else {
          this.goTo(3);
        } 
        
        this.state.xx.setOffset(this.xx);
        this.state.xx.setValue(0);
      },
      onPanResponderTerminate: () => {},
      onShouldBlockNativeResponder: () => {
        return true;
      }
    });
  }

  output(idx){
    if (idx == 1) return 0;
    if (idx == 2) return this.state.ctn / 3;
    if (idx == 3) return this.state.ctn / 3 * 2;
  }

  goTo(idx) {
    const curr = items.find(item => item.uid === idx),
      pos = this.output(idx);

    this.setState(
      {
        current: curr,
        idx: idx,
      },
      () =>
        Animated.timing(this.state.position, {
          toValue:pos,
          duration: config.duration
        }).start(
          this.state.isComponentReady && this.props.onStatusChanged(idx)
    ))
  }

  render() {
    return (
      <View
        style={styles.container}
        ref={el => {
          this.measureRef(el, "ctn");
        }}
      >

        {
          items.map(button => (
            <Button
              key={button.uid}
              icon={button.icon}
              iconActive={button.iconActive}
              color={button.color}
              colorActive={button.colorActive}
              onPress={() => this.goTo(button.uid)}
              size={config.iconSize}
            />
          ))
        }

        <Animated.View
          {...this._panResponder.panHandlers}
          style={[
            styles.switcher,
            {
              transform:[
              {translateX:this.state.position //translation
              }]
            }
          ]}
        >
          <Button
            key={this.state.current.uid}
            icon={this.state.current.icon}
            iconActive={this.state.current.iconActive}
            size={config.iconSize}
            active={true}
          />
        </Animated.View>
      </View>
    );
  }
}

Switch.propTypes = {
  disableScroll: PropTypes.func,
  onStatusChanged: PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    width: WIDTH - WIDE,
    height: config.height,
    flexDirection: "row",
    backgroundColor: Theme.color.bg,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderWidth: config.border,
    borderColor: Theme.color.rey,
    borderRadius: config.radius,
  },

  switcher: {
    position: "absolute",
    top: 0,
    left: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: (WIDTH - WIDE) / 3,
    height: config.height - 2, // MAGIC NUMBER, SORRY GODS
    backgroundColor: Theme.color.rey,
    borderRadius: config.radius,
    shadowOpacity: config.transparency,
    shadowOffset: { x: config.offset, y: config.offset },
    shadowColor: Theme.color.palpatine,
    shadowRadius: config.radius,
    elevation: 4,
  },
  buttonStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: (WIDTH - WIDE) / 3,
    height: config.height - 1 // MAGIC NUMBER, SORRY GODS
  }
});

const Button = props => {
  return (
    <View>
      <TouchableOpacity onPress={props.onPress} style={styles.buttonStyle}>
        {props.active ? (
          <Ionicons name={props.icon} size={props.size} color={props.color} />
        ) : (
          <Ionicons
            name={props.iconActive}
            size={props.size}
            color={props.colorActive}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  active: PropTypes.bool,
  onPress: PropTypes.func
};

Button.defaultProps = {
  active: false
};
