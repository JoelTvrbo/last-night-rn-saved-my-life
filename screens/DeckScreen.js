import React, { cloneElement } from "react";
import { Animated,StyleSheet, SafeAreaView, } from "react-native";

import { WIDE, TALL, HEIGHT, WIDTH } from "../constants/device";
import Theme from "../constants/theme";

import Card from '../components/drag-and-drop-deck/comp';
import Button, { looks } from "../components/bootstrap/btn";


var types = [
  {
    title :"♠︎",
    color: "black"
  },{
    title: "♦",
    color: "red",
  },{
    title: "♥︎",
    color: "red"
  },
  {
    title: "♣︎",
    color: "black"
  }]

var orders = ["A","2","3","4","5"]

  
import { Ionicons } from "@expo/vector-icons";

export default class DeckScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    opacity: new Animated.Value(0),
    scale: new Animated.Value(.9),
    selected: null
  };

 renderCards(){
		var initTop = HEIGHT/2-88
		var initLeft = WIDTH/2-62
    var count = 10
    
		var matches = types.map((type)=> {
			return orders.map((order)=>{
				count -= 0.5
				return {
					title: type.title,
					color: type.color,
					order: order
				}
			})
    })
    
    matches = matches.reduce((p,c)=>{return p.concat(c)})
    
		this.All = matches.map((item)=> {
        count -= 0.5;
        uid =  Math.random();
        return <Card 
        key={uid}
        customStyle={{top: initTop+count,left:initLeft+count}} 
        color={item.color} 
        title={item.title} 
        order={item.order} 
        onDismiss={(title) => this.report(title)}
        />
		})
		return this.All
}

 report(title){
   console.log(title)
 }

  render() {
    return (
      <SafeAreaView style={styles.ctn}>
        {this.renderCards()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  ctn: {
    flex: 1,
    backgroundColor: Theme.color.luke,
  }
});

