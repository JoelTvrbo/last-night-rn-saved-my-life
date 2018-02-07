import React,{cloneElement,Component} from "react";
import {  View, PanResponder, StyleSheet, Text, TouchableOpacity, LayoutAnimation, UIManager, } from "react-native";

export default class Card extends React.Component {

  state = {
    move: {},
    bodyColor: {backgroundColor: 'white'}
  }

    componentDidMount(){
        this.setState({
            init: this.props.customStyle
        })
    }
    componentWillMount(){
		this._panResponder = PanResponder.create({
		  onStartShouldSetPanResponder: (evt, gestureState) => true,
	      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
	      onMoveShouldSetPanResponder: (evt, gestureState) => true,
	      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
	      onPanResponderTerminationRequest: (evt, gestureState) => true,
	      onPanResponderGrant: (evt,gestureState) =>{
	      	this.setState({
	      		bodyColor: {backgroundColor: 'rgba(59,55,56,0.5)'}
	      	})
	      },
	      onPanResponderMove: (evt, gestureState) => {
	      	this.setState({
	      		move: {transform: [{translateX: gestureState.dx},{translateY: gestureState.dy}]}
	      	})
	      },
	      onPanResponderRelease: (evt,gestureState) => {
	      	this.setState({
	      		bodyColor: {backgroundColor: 'white'},
	      		move: {},
	      		init: {top: this.state.init.top + gestureState.dy,left: this.state.init.left+gestureState.dx}
              })
              this.props.onDismiss(this.props.title)
	      }
		})
}
  
    render() {
      return (
        <View {...this._panResponder.panHandlers} style={[styles.card,this.state.bodyColor,this.state.init,this.state.move]}>
        <View style={styles.leftTop}>
            <Text style={[styles.title,{color: this.props.color}]}>{this.props.title}</Text>
            <Text style={[styles.order,{color: this.props.color}]}>{this.props.order}</Text>
        </View>
        <View style={styles.rightBottom}>
            <Text style={[styles.title,{color: this.props.color}]}>{this.props.title}</Text>
            <Text style={[styles.order,{color: this.props.color}]}>{this.props.order}</Text>
        </View>
        <View style={styles.center}>
            <Text style={[styles.centerLogo,{color: this.props.color}]}>{this.props.title}</Text>
        </View>
</View>
      );
    }
  }

  const styles = StyleSheet.create({
    card: {
		width: 124,
		height: 176,
		backgroundColor: 'white',
		borderRadius: 12,
		position: 'absolute',
		alignItems: 'center',
		justifyContent: 'center'
	},
	leftTop: {
		width: 20,
		height: 40,
		flexDirection: 'column',
		position: 'absolute',
		top: 0,
		left: 0,
		backgroundColor: 'transparent'
	},
	rightBottom: {
		width: 20,
		height: 40,
		flexDirection: 'column',
		position: 'absolute',
		bottom: 0,
		right: 0,
		backgroundColor: 'transparent',
		transform: [{rotateX:'180deg'}]
	},
	title: {
		height: 20,
		textAlign: 'center',
	},
	order: {
		height: 20,
		textAlign: 'center',
	},
	center: {
		width: 80,
		height: 80,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'transparent'
	},
	centerLogo: {
		fontSize: 80,
		flex: 1,
		textAlign: 'center',
		lineHeight: 90
},
    cardBeingDragged:{
      backgroundColor: "#999",
    }
  });
  

