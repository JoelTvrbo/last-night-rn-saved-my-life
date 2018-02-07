import React, { cloneElement, Component } from "react";
import {
  Animated,
  Easing,
  View,
  Image,
  StyleSheet,
  Text,
  LayoutAnimation,
  UIManager,
  FlatList
} from "react-native";
import {width,height} from "../../constants/device";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Button, { looks } from "../../components/bootstrap/btn";
import Surface from "./surface";

const Fake = [
  { uid: 1, label: "First" },
  { uid: 2, label: "Second" },
  { uid: 3, label: "Third" },
  { uid: 4, label: "Fourth" },
  { uid: 5, label: "Fifth" }
];

export default class OnBoarding extends React.Component {
  state = {
    total: Fake.length,
    current: 1,
    swiping: false,
    touching: false,
  };

  componentDidMount(){
    console.log(Fake)
  }
  
  startSwipe = bool => {
    if (!bool) return;
    this.setState(
      {
        swiping: true
      }
      // , callback start something
    );
  };

  slideTo = direction => {
    const option = direction === "West" ? this.nextSlide() : this.prevSlide();

    this.setState(prevState => {
      {
        swiping: !prevState.swiping;
      }
    }, () => option);
  };

  prevSlide = () => {
    const curr = this.state.current;
    const total = this.state.total;
    const isCurrentTheFirstOne = curr === 1;

    var option;

    if (isCurrentTheFirstOne) {
      option = 1;
    } else {
      option = curr - 1; // Do some bouncing animating ??¿
    }

    this.setState(
      {
        current: option
      },
      () =>
        this.list.scrollToIndex({
          animated: true,
          index: this.state.current - 1
        })
    );
  };

  nextSlide = () => {
    const curr = this.state.current;
    const total = this.state.total;
    const isCurrentTheLastOne = curr === total;

    var option;

    if (!isCurrentTheLastOne) {
      option = curr + 1;
    } else {
      option = total; // Do some bouncing animating ??¿
    }

    this.setState(
      {
        current: option
      },
      () =>
        this.list.scrollToIndex({
          animated: true,
          index: this.state.current - 1
        })
    );
  };

  _keyExtractor = (item, index) => item.uid;

  renderPagination = () => {
    const ActiveDot = <View style={[styles.dot, styles.activeDot]} />,
      Dot = <View style={styles.dot} />;

    let dots = [];
    for (let key = 1; key <= this.state.total; key++) {
      dots.push(
        key === this.state.current
          ? React.cloneElement(ActiveDot, { key })
          : React.cloneElement(Dot, { key })
      );
    }

    return (
      <View pointerEvents="none" style={styles.pagination}>
        {dots}
      </View>
    );
  };

  render() {
    return (
      <View style={{ flex: 1, position: "relative" }}>
        {this.renderPagination()}

        <FlatList
          ref={el => {
            this.list = el;
          }}
          contentInset={{
            top: 10,
            left: 0,
            bottom: 10,
            right: 0
          }}
          extraData={this.state}         
          showsHorizontalScrollIndicator={false}
          snapToInterval={width}
          snapToAlignment={"center"}
          scrollEnabled={false}
          numColumns={1}
          horizontal={true}
          style={{
            flex: 1,
            backgroundColor:'pink',
            width: width,
            height: height - 100 // altura tab
          }}
          data={Fake}
          keyExtractor={this._keyExtractor}
          renderItem={({ item }) => (
            <View style={styles.slide} key={item.uid}>
              <MaterialCommunityIcons name="martini" size={55} color="#FFF" />
              <Text>{item.label}</Text>
            </View>
          )}
        />

        <Surface
          propsStyles={styles.surface}
          onStartSwipe={bool => this.startSwipe(bool)}
          onRelease={directions => {
            const { horizontal } = directions;
            this.slideTo(horizontal);
          }}
        />

        <View style={{ flexDirection: "row" }}>
          <Button
            look={looks.comboLeft}
            handleClick={this.prevSlide}
            label={"prev!"}
          />
          <Button
            look={looks.comboRight}
            handleClick={this.nextSlide}
            label={"next!"}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    width: width,
    height:height - 200,
    backgroundColor: "magenta",
    justifyContent: "center",
    alignItems: "center"
  },
  surface: {
    ...StyleSheet.absoluteFillObject,
    width: width,
    height: height - 200,
    top: 100,
    bottom: 100,
    backgroundColor: "rgba(255,255,255,.1)"
  },

  pagination: {
    height: 100,
    width: "100%",
    backgroundColor: "rgba(0,0,0,.1)",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  dot: {
    width: 30,
    height: 30,
    backgroundColor: "cyan",
    borderRadius: 15
  },
  activeDot: {
    width: 30,
    height: 30,
    backgroundColor: "magenta",
    borderRadius: 15
  }
});
