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
import { width, wide } from "../../constants/device";

const config = {
  duration: 50,
  iconSize: 25
};
const items = [
  {
    uid: 1,
    label: "Left",
    icon: "ios-cloudy",
    iconActive: "ios-cloudy",
    color: "#333",
    colorActive: "magenta"
  },
  {
    uid: 2,
    label: "Middle",
    icon: "ios-aperture-outline",
    iconActive: "ios-aperture",
    color: "#333",
    colorActive: "magenta"
  },
  {
    uid: 3,
    label: "right",
    icon: "ios-analytics-outline",
    iconActive: "ios-analytics",
    color: "#333",
    colorActive: "magenta"
  }
];

export default class Switch extends React.Component {
  state = {
    isComponentReady: false,
    position: new Animated.Value(0),
    current: items[0],
    idx: 1,
    ctn: 0
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
        const pos = this.output(this.state.idx);
        this.state.position.setOffset(pos);
        this.state.position.setValue(0);
      },

      onPanResponderMove: (evt, gestureState) => {
        const { dx,moveX, numberActiveTouches } = gestureState;
        

        if (numberActiveTouches > 1) return;

            this.state.position.setValue(
                dx
            );
      
          },

      onPanResponderTerminationRequest: () => true,

      onPanResponderRelease: (evt, gestureState) => {
        const { moveX } = gestureState;
        this.isParentScrollDisabled = false;
        this.props.disableScroll(true);

        if (moveX >= 0 && moveX <= this.state.ctn / 3) {
          this.handleChange(1);
        } else if (
          moveX >= this.state.ctn / 3 &&
          moveX <= this.state.ctn / 3 * 2
        ) {
          this.handleChange(2);
        } else {
          this.handleChange(3);
        } 
        
    this.state.position.flattenOffset();
      },

      onPanResponderTerminate: () => {},
      onShouldBlockNativeResponder: () => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      }
    });
  }

  output(idx){
    if (idx == 1) return 0;
    if (idx == 2) return this.state.ctn / 3;
    if (idx == 3) return this.state.ctn / 3 * 2;
  }

  handleChange(idx) {
    const curr = items.find(item => item.uid === idx);

    const pos = this.output(idx);

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
    )
    );
  }


  render() {
    return (
      <View
        style={styles.container}
        ref={el => {
          this.measureRef(el, "ctn");
        }}
      >
        {items.map(button => (
          <Button
            key={button.uid}
            icon={button.icon}
            iconActive={button.iconActive}
            color={button.color}
            colorActive={button.colorActive}
            onPress={() => this.handleChange(button.uid)}
            size={config.iconSize}
          />
        ))}

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
    width: width - wide,
    height: 55,
    flexDirection: "row",
    backgroundColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 27.5,
    alignSelf: "center"
  },

  switcher: {
    flexDirection: "row",
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#fff",
    borderRadius: 28,
    height: 53,
    alignItems: "center",
    justifyContent: "center",
    width: (width - wide) / 3,
    elevation: 4,
    shadowOpacity: 0.31,
    shadowRadius: 10,
    shadowColor: "#ccc"
  },
  buttonStyle: {
    flex: 1,
    width: (width - wide) / 3,
    height: 54,
    justifyContent: "center",
    alignItems: "center"
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
