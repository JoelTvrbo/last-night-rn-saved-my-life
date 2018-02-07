import React,{cloneElement,Component} from "react";
import {  Animated,Image,View, PanResponder, StyleSheet, Text, TouchableOpacity, LayoutAnimation, UIManager,Platform } from "react-native";
import PropTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";
import {width,wide} from "../../lib/device";

export default class Switch extends React.Component {

  state = {
    isComponentReady: false,
    position: new Animated.Value(0),
    posValue: 0,
    selectedPosition: 0,
    duration: 100,
    thresholdDistance: width / 2.4, // fix it
    ctn:0,
  }


  measureRef(ref, key) {
    if(!ref) return;
    if(this.state.ctn === 0) {
    requestAnimationFrame(() => {
      ref.measure((ox, oy, width, height, px, py) => {
        this.setState({ [key]: width });
      });
    });
  }
  else return;
  }

    componentDidMount(){
        this.isParentScrollDisabled = false;
    }
    componentWillMount(){
    
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
            },

            onPanResponderMove: (evt, gestureState) => {
                let finalValue = gestureState.dx + this.state.posValue;
                if (
                    finalValue >= 0 &&
                    finalValue <= this.state.thresholdDistance
                )
                    this.state.position.setValue(
                        this.state.posValue + gestureState.dx
                    );
            },

            onPanResponderTerminationRequest: () => true,

            onPanResponderRelease: (evt, gestureState) => {
                let finalValue = gestureState.dx + this.state.posValue;
                this.isParentScrollDisabled = false;
                this.props.disableScroll(true);
                if (gestureState.dx > 0) {
                    if (finalValue >= 0 && finalValue <= 30) {
                        this.notStartedSelected();
                    } else if (finalValue >= 30 && finalValue <= 121) {
                        this.inProgressSelected();
                    } else if (finalValue >= 121 && finalValue <= 280) {
                        if (gestureState.dx > 0) {
                            this.completeSelected();
                        } else {
                            this.inProgressSelected();
                        }
                    }
                } else {
                    if (finalValue >= 78 && finalValue <= 175) {
                        this.inProgressSelected();
                    } else if (finalValue >= -100 && finalValue <= 78) {
                        this.notStartedSelected();
                    } else {
                        this.completeSelected();
                    }
                }
            },

            onPanResponderTerminate: () => {},
            onShouldBlockNativeResponder: () => {
                // Returns whether this component should block native components from becoming the JS
                // responder. Returns true by default. Is currently only supported on android.
                return true;
            }
        });
    }


    notStartedSelected = () => {
        Animated.timing(this.state.position, {
            toValue: Platform.OS === 'ios' ? -2 : 0,
            duration: this.state.duration
        }).start();
        setTimeout(() => {
            this.setState({
                posValue: Platform.OS === 'ios' ? -2 : 0,
                selectedPosition: 0
            });
        }, 100);
        if (this.state.isComponentReady) this.props.onStatusChanged('Open');
    };

    inProgressSelected = () => {
        Animated.timing(this.state.position, {
            toValue: this.state.ctn / 2 - (this.state.ctn / 3) / 2,
            duration: this.state.duration
        }).start();
        setTimeout(() => {
            this.setState({
                posValue:
                    this.state.ctn / 2 - (this.state.ctn / 3) / 2,
                selectedPosition: 1
            });
        }, 100);
        if (this.state.isComponentReady)
            this.props.onStatusChanged('In Progress');
    };

    completeSelected = () => {
        Animated.timing(this.state.position, {
            toValue:
                Platform.OS === 'ios'
                    ? this.state.ctn - (this.state.ctn / 3)
                    : this.state.ctn - (this.state.ctn / 3) - 2,
            duration: this.state.duration
        }).start();
        setTimeout(() => {
            this.setState({
                posValue:
                    Platform.OS === 'ios'
                        ? this.state.ctn - (this.state.ctn / 3)
                        : this.state.ctn - (this.state.ctn / 3) - 2,
                selectedPosition: 2
            });
        }, 100);
        if (this.state.isComponentReady) this.props.onStatusChanged('Complete');
    };

    getStatus = () => {
        switch (this.state.selectedPosition) {
        case 0:
            return 'Open';
        case 1:
            return 'In Progress';
        case 2:
            return 'Complete';
        }
    };
  
    render() {
      return (
        <View style={styles.container}
        ref={el => {
            this.measureRef(el,"ctn");
          }}
          >
                <Button type="Open" onPress={this.notStartedSelected} />
                <Button type="In Progress" onPress={this.inProgressSelected} />
                <Button type="Complete" onPress={this.completeSelected} />
                <Animated.View
                    {...this._panResponder.panHandlers}
                    style={[
                        styles.switcher,
                        {
                            transform: [{ translateX: this.state.position }]
                        }
                    ]}
                >
                    <Button type={this.getStatus()} active={true} />
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
        flexDirection: 'row',
        backgroundColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor:'#ccc',
        borderRadius: 27.5,
        alignSelf:"center"
    },
    
    switcher: {
        flexDirection: 'row',
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: '#fff',
        borderRadius: 28,
        height: 53,
        alignItems: 'center',
        justifyContent: 'center',
        width:  (width - wide) / 3,
        elevation: 4,
        shadowOpacity: 0.31,
        shadowRadius: 10,
        shadowColor: '#ccc'
    },
    buttonStyle: {
        flex: 1,
        width:( width - wide) / 3,
        height: 54,
        justifyContent: 'center',
        alignItems: 'center'
}
  });
  

  const getIcon = (type, active) => {
    let icn;
    switch (type) {
    case 'Open':
        icn = active ? <Ionicons name="ios-cloudy" size={25} color="cyan" />
            : <Ionicons name="ios-cloudy" size={25} color="magenta" />
        break;
    case 'In Progress':
        icn = active ? <Ionicons name="ios-aperture-outline" size={25} color="cyan" />
        : <Ionicons name="ios-aperture" size={25} color="magenta" />
        break;
    case 'Complete':
        icn = active ? <Ionicons name="ios-analytics-outline" size={25} color="cyan" />
        : <Ionicons name="ios-analytics" size={25} color="magenta" />
        break;
    }
    return icn;
};

const Button = props => {
    return (
        <View>
            <TouchableOpacity
                onPress={props.onPress}
                style={styles.buttonStyle}
            >
                {getIcon(props.type, props.active) }
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