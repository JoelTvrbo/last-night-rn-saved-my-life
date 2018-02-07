

import React, { Component } from "react";
import { LayoutAnimation, PanResponder, StyleSheet, View,Text,TouchableOpacity } from "react-native";

import PropTypes from "prop-types"; // ES6
import { Ionicons } from '@expo/vector-icons';

export default class TagReorder extends React.Component {
  
    
  // Append styles.tagBeingDragged style if tag is being dragged
  getTagStyle = () => ({
    ...styles.tag,
    ...(this.props.tag.isBeingDragged ? styles.tagBeingDragged : {}),
  });

  // Call view container's measure function to measure tag position on the screen
  onLayout = () => {
    this.container && this.container.measure(this.onMeasure);
  };

  // Pass tag coordinates up to the parent component
  onMeasure = (x,
               y,
               width,
               height,
               screenX,
               screenY) => {

    this.props.onRender(this.props.tag, screenX, screenY, width, height);


  };

  // Handle tag taps
  onPress = () => {
    this.props.onPress(this.props.tag);
  };

  

  render() {
    const { tag: { title } } = this.props;
    return (
      <View
        ref={el => this.container = el}
        style={styles.container}
        onLayout={this.onLayout}
      >
        <TouchableOpacity
          style={this.getTagStyle()}
          onPress={this.onPress}
        >
          <Ionicons name="ios-close-circle-outline" size={16} color="#FFF" />
          <Text>{' '}</Text>
          <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
</View>
    );
  }
}


TagReorder.propTypes = {
  tag: PropTypes.object,
  onPress: PropTypes.func,
  onPress: PropTypes.func // (tag: TagObject, screenX: number, screenY: number, width: number, height: number)
  
};



const styles = {
    container: {
      marginBottom: 8,
      marginRight: 6,
    },
    tag: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, .33)',
      borderColor: 'rgba(255, 255, 255, .25)',
      width:60,
      height:60,
      borderRadius: 30,
      borderWidth: 1,
      // paddingHorizontal: 10,
      // paddingVertical: 13,
    },
    tagBeingDragged: {
      backgroundColor: 'rgba(255, 255, 255, .01)',
      borderStyle: 'dashed',
    },
    title: {
      color: '#FFFFFF',
      fontSize: 15,
      fontWeight: 'normal',
    },
  };