import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  View,
  PanResponder,
  Animated,
  Text,
  TouchableOpacity,
  Easing,
  findNodeHandle,
  UIManager
} from "react-native";

import { 
    gestureIsClick, 
    getSwipeDirection,
    oneTouch, 
    pulledFarVertical,
    pulledFarHorizontal } from "../../constants/touches";

swipeConfig = {
  fast:0.75,
  far:20,
};

export default class Surface extends React.Component {
  
  state = {
    opacity: new Animated.Value(0),
    panXY: new Animated.ValueXY({ x: 0, y: 0 }),
  };


  componentWillMount() {

    this._animatedX = 0;
    this._animatedY = 0;

    this.state.panXY.x.addListener(event => (this._animatedX = event.value));
    this.state.panXY.y.addListener(event => (this._animatedY = event.value));

    this.swipePanConfig = Object.assign(swipeConfig, this.props.panConfig);

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => {
        return oneTouch(e);
      },
      onMoveShouldSetPanResponder: (e, gestureState) => {
        return oneTouch(e) && !gestureIsClick(gestureState)
      },

      onPanResponderGrant: (e, gesture) => {
        const { locationX, locationY } = e.nativeEvent;
        
        this.state.panXY.setOffset({
            x: this._animatedX,
            y: this._animatedY
          });
        this.state.panXY.setValue({ x: 0, y: 0 });

        this.props.onStartSwipe(true)
       
      },

      onPanResponderMove: (e, gestureState) => {
        if (!oneTouch(e)) return;
        return true;
      },

      onPanResponderRelease: (e, gestureState) => {
  
        if (!pulledFarVertical(gestureState,swipeConfig) || !pulledFarHorizontal(gestureState,swipeConfig)) return;

        this.state.panXY.flattenOffset();

        const pos = getSwipeDirection(gestureState,swipeConfig);
        return this.props.onRelease(pos)
            
      }
    });
  }


componentWillUnmount() {
    this.state.panXY._animatedX.removeAllListeners();
    this.state.panXY._animatedY.removeAllListeners();
  }

componentWillReceiveProps(props) {
    this.swipePanConfig = Object.assign(swipeConfig, this.props.config);
}


render() {
    const { animating,shadowX,shadowY } = this.state;
    const { propsStyles } = this.props;


    return (
      <Animated.View
        {...this.panResponder.panHandlers}
        ref={el => { this.surface = el; }}
        style={propsStyles}>
          { this.props.renderContent && this.props.renderContent()}
      </Animated.View>
    );
  }
}

Surface.propTypes = {
  onStartSwipe: PropTypes.func,
  // propsStyles:PropTypes.object,
  onRelease: PropTypes.func,
  renderContent: PropTypes.func,
  panConfig: PropTypes.object,
};


