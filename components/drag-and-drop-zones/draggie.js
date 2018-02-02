import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  View,
  PanResponder,
  Animated,
  Dimensions,
  Text,
  TouchableOpacity,
  Easing,
  findNodeHandle,
  UIManager
} from "react-native";
import {width,height} from "../../constants/device";
import Theme from "../../constants/theme";
import { gestureIsClick, getSwipeDirection } from "../../constants/touches";

swipeConfig = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 20
};

export default class Draggie extends React.Component {
  state = {
    show: true,
    panXY: new Animated.ValueXY({ x: 0, y: 0 }),
    shadowX: 0,
    shadowY: 0,
    moving: false,
    longpress: false,
    allowDrag:false
  };

  componentWillMount() {

    this._animatedX = 0;
    this._animatedY = 0;
    
    this.state.panXY.x.addListener(event => (this._animatedX = event.value));
    this.state.panXY.y.addListener(event => (this._animatedY = event.value));

    this.swipeConfig = Object.assign(swipeConfig, this.props.config);

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => {
        return e.nativeEvent.touches.length === 1;
      },
      onMoveShouldSetPanResponder: (e, gestureState) => {
        return (
          e.nativeEvent.touches.length === 1 && !gestureIsClick(gestureState) && !this.props.disabled
        );
      },
      onPanResponderGrant: (e, gesture) => {
        const { locationX, locationY } = e.nativeEvent;

        this.state.panXY.setOffset({
          x: this._animatedX,
          y: this._animatedY
        });
        this.state.panXY.setValue({ x: 0, y: 0 });
        this.setState({
          shadowX: locationX,
          shadowY: locationX
        });
      },

      onPanResponderMove: (e, gestureState) => {
        const { pageX, pageY, identifier, locationX, locationY } = e.nativeEvent;
        const { moveX, moveY, dx, dy, x0, y0, numberActiveTouches } = gestureState;

        if (numberActiveTouches > 1) return;

        this.props.onMove(Math.floor(pageX), Math.floor(pageY))
        Animated.event([
          null,
          {
            dx: this.state.panXY.x,
            dy: this.state.panXY.y
          }
        ])(e, gestureState);

        return true;
      },

      onPanResponderRelease: (e, gestureState) => {
        const { pageX, pageY, identifier, locationX, locationY } = e.nativeEvent;
        const { moveX, moveY, dx, dy, x0, y0, vx, vy, numberActiveTouches } = gestureState;
        requestAnimationFrame(() => {
        UIManager.measure(findNodeHandle(this.draggie), (x, y, width, height, pageX, pageY) => {
          this.props.onDrop( Math.floor(pageX), Math.floor(pageY),this.props.string);
          });
        });
        this.state.panXY.flattenOffset();
      }
    });
  }

  //   if (Math.abs(this.state.panXY.x._value) <  this.swipeConfig.directionalOffsetThreshold || Math.abs(vx) < this.swipeConfig.velocityThreshold) {
  //     return this._resetPan();
  // }

  componentWillUpdate(props){
    if(props.success === true) return this.resetPan();
  }

    resetPan() {
        Animated.timing(this.state.panXY, {
        delay:100,
        toValue: {x:0,y:0},
        friction: 1
        }).start();
    }

  componentWillUnmount() {
    this.state.panXY.x.removeAllListeners();
    this.state.panXY.y.removeAllListeners();
  }


  render() {
    const {  moving,shadowX, shadowY, longpress } = this.state;

    const {
      onPressLong,
      onMove,
      onDrop,
      renderChildren,
      ratio,
      msg,
      disabled
    } = this.props;

    let panStyle = {
        transform: [
          // { perspective: 500 },
          {
            translateX: this.state.panXY.x.interpolate({
              inputRange: [0, width],
              outputRange: [20, width],
              extrapolate: "clamp"
            })},
          {
            translateY:this.state.panXY.y.interpolate({
              inputRange: [0, height],
              outputRange: [ 20, height],
          })}
        ]
      };

    let shadows = {
      shadowColor:
      ratio - shadowX <= ratio / 2 ? "black" : "magenta",
      shadowOffset: { width: 0, height: 20 },
      shadowOpacity: 0.5,
      shadowRadius: 20,
      opacity: 0.5
    };

    let dragStyles = {
      width: this.props.ratio,
      height: this.props.ratio,
      opacity: 1,
      backgroundColor:'rgba(0,0,0,.6)',
    };

  
    return (
      <Animated.View
       {...this.panResponder.panHandlers}
        ref={el => {
          this.draggie = el;
        }}
        style={[panStyle, dragStyles, moving ? shadows : null]}
      >
        <TouchableOpacity style={{
            width: this.props.ratio,
            height: this.props.ratio,
        }}
        onLongPress={onPressLong}
        >
          {renderChildren && renderChildren()}
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

Draggie.propTypes = {
  opacity: PropTypes.number,
  startPos: PropTypes.object,
  onMove: PropTypes.func,
  onDrop: PropTypes.func,
  // disabled: PropTypes.bool,
  ratio: PropTypes.number,
  children: PropTypes.func,
  msg:PropTypes.string
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    top: 20,
    backgroundColor: "red"
  }
});
