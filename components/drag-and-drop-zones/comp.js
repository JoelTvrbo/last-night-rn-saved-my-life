import React, { cloneElement } from "react";
import {
  Animated,
  Easing,
  View,
  PanResponder,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  LayoutAnimation,
  findNodeHandle,
  UIManager
} from "react-native";
import {width,height} from "../../constants/device";
import Theme from "../../constants/theme";
import { Ionicons } from "@expo/vector-icons";

const arr = [ { key: 1, nom: "Catalina" }, { key: 2, nom: "Romulo" }, { key: 3, nom: "Noooollo" }, { key: 4, nom: "Moro" }, { key: 5, nom: "Nura" }, { key: 6, nom: "Paura" }, { key: 7, nom: "Bulma" }, { key: 8, nom: "ulma" }, { key: 9, nom: "Serotonina" } ];

const config = {
  margin: 10,
  width: Math.floor(width / 4 - 20)
};

const getProp = (src, k, output) => {
  return src.filter(el => el.ref === k).map(el => el[output])[0];
};

export default class App extends React.Component {
  state = {
    opacity: new Animated.Value(0),
    panXY: new Animated.ValueXY({ x: 0, y: 0 }),
    draggables: [],
    dropZones: [],
    success: false,
    animating: false,
    droppedZone: null,
    dragging: 0,
    wishlist: [],
    cart: [],
    dx: config.margin,
    dy: 0,
    list: null,
  };

  componentDidMount() {
    this.setState({
      data: arr
    });
  }

  componentWillMount() {
    this._animatedX = 0;
    this._animatedY = 0;
    this.state.panXY.x.addListener(event => (this._animatedX = event.value));
    this.state.panXY.y.addListener(event => (this._animatedY = event.value));
  }

  panResponder = PanResponder.create({
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderGrant: (e, gesture) => {
      this.draggie.setNativeProps({
        style: { opacity:.8 }
      });

      this.state.panXY.setOffset({
        x: this._animatedX,
        y: this._animatedY
      });
      this.state.panXY.setValue({ x: 0, y: 0 });
    },
    onPanResponderMove: event => {
      this.setState({
        dx: event.nativeEvent.pageX,
        dy: event.nativeEvent.pageY
      });
    },
    onPanResponderRelease: (e, gestureState) => {
      requestAnimationFrame(() => {
        UIManager.measure(
          findNodeHandle(this.draggie),
          (x, y, width, height, pageX, pageY) => {
            const pos = { x: Math.floor(pageX), y: Math.floor(pageY) };
            this.drop(pos);
          }
        )
      });
      this.state.panXY.flattenOffset();
    }
  });

  
  // START DRAG AND DROP FROM DRAG

  start = k => {
    const xx = getProp(this.state.draggables, k, "x");
    const yy = getProp(this.state.draggables, k, "pageY");
    
    this.setState(
      {
          animating: true,
          dragging: k,
          dx: xx,
          dy: yy
      },
      () =>
        Animated.timing(this.state.opacity, {
          toValue: 1,
          delay: 300
        }).start()
    );
  };

  drop(pos) {
    if (!pos || pos.x === 0 || pos.y === 0) return this.resetPan();
    const rawString = this.state.dropZones
      .filter(
        zone =>
          pos.y <= zone.yd &&
          pos.y >= zone.y &&
          pos.x <= zone.xd &&
          pos.x >= zone.x
      )
      .map(zone => zone.ref);
  
      const string = rawString[0];
console.log(this.state.dropZones)
console.log(string)
    if (!string) {
      return this.resetPan();
    } else if (string === "empty") {
      alert('Remove')
    } else {

      const k = this.state.dragging;

      this[k].setNativeProps({
        style: { opacity: 0.2 }
      })

      this.setState(
        prevState => {
          return {
            droppedZone: string,
            animating: false,
            dragging: 0,
          }
        },
        () => {
          this[string].setNativeProps({
            style: { backgroundColor: "cyan" }
          })
        }
      );
      return this.resetPan();
    }
  }


  // RESET DRAGGABLE ELEMENT

  resetPan() {
    Animated.timing(this.state.opacity, {
      toValue: 0
    }).start();
  }

  // MEASUREMENTS 

  updateZone(iam) {
    this.setState(prevState => {
      return {
        dropZones: [...prevState.dropZones, iam]
      };
    });
  }

  updateDraggables(iam) {
    this.setState(prevState => {
      return {
        draggables: [...prevState.draggables, iam]
      }
    });
  }

  setUpList(y) {
    const val = y + config.margin;
    this.setState({
      list: y,
      dy: val
    });
  }

  // SPLIT CONTENT INTO FUNCTIONS FOR A SLIMMER CLASS RENDER

  renderDrag() {
    return (
      <Animated.View
        {...this.panResponder.panHandlers}
        ref={el => {
          this.draggie = el;
        }}
        pointerEvents={this.state.animating ? "auto" : "none"}
        style={{
          width: config.width,
          height: config.width,
          backgroundColor: "magenta",
          position: "absolute",
          top: this.state.dy,
          left: this.state.dx,
          opacity: this.state.opacity,
          shadowColor: "black",
          shadowOffset: { width: 0, height: 20 },
          shadowOpacity: this.state.dragging ? 0.5 : 0,
          shadowRadius: 20
        }}
      >
        {this.state.dragging !=0 && <Text>{this.state.dragging}</Text>}
      </Animated.View>
    );
  }

  renderList() {
    return (
      <FlatList
        scrollEnabled={false}
        style={{
          width: width
        }}
        ref={el => {
          this.list = el;
        }}
        onLayout={({ nativeEvent }) => {
          UIManager.measure(
            findNodeHandle(this.list),
            (x, y, width, height) => {
              this.setUpList(y);
            }
          );
        }}
        data={this.state.data}
        numColumns={4}
        keyExtractor={this._keyExtractor}
        extraData={this.state}
        getItemLayout={(data, index) => ({
          length: config.width,
          offset: config.width * index,
          index
        })}
        renderItem={({ item, index }) => (
          <View
            style={{
              width: config.width,
              height: config.width,
              marginHorizontal: config.margin,
              marginVertical: config.margin,
              backgroundColor: this.getBgColor(item.key)
            }}
            ref={el => {
              this[item.key] = el;
            }}
            onLayout={({ nativeEvent }) => {
              UIManager.measure(
                findNodeHandle(this[item.key]),
                (x, y, width, height, pageX, pageY) => {
                  const iam = {
                    x,
                    y,
                    width,
                    height,
                    pageX,
                    pageY,
                    ref: item.key
                  };
                  this.updateDraggables(iam);
                }
              );
            }}
          >
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => this.start(item.key)}
            >
              <Text> {item.key}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    );
  }

  _keyExtractor = (item, index) => item.key;

  // STYLE HELPER

  getBgColor = index => {
    const idx = this.state.dragging;
    if (index === idx) {
      return Theme.color.primary;
    } else return Theme.color.white;
  };

  
  render() {
    const DropZoneStyles = {
      width: width / 4,
      height: width / 4,
      backgroundColor: "#bbb",
    };
    const DropZoneEmptyStyles = {
      width: 80,
      height: 80,
      backgroundColor: "yellow",
      borderWidth: 2,
      borderColor: "yellow"
    };

    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.ctnDropZones}>
          <Animated.View
            ref={el => {
              this.wishlist = el;
            }}
            style={DropZoneStyles}
            onLayout={({ nativeEvent }) => {
              UIManager.measure(
                findNodeHandle(this.wishlist),
                (x, y, width, height, pageX, pageY) => {
                  const iam = {
                    x: Math.floor(x),
                    xd: Math.floor(x + width),
                    y: Math.floor(y),
                    yd: Math.floor(y + height),
                    ref: "wishlist"
                  };
                  this.updateZone(iam);
                }
              );
            }}
          >
            <Text style={{ backgroundColor: "transparent" }}>Wishlist</Text>
          </Animated.View>

          <Animated.View
            ref={el => {
              this.cart = el;
            }}
            onLayout={({ nativeEvent }) => {
              UIManager.measure(
                findNodeHandle(this.cart),
                (x, y, width, height, pageX, pageY) => {
                  const iam = {
                    x: Math.floor(x),
                    xd: Math.floor(x + width),
                    y: Math.floor(y),
                    yd: Math.floor(y + height),
                    ref: "cart"
                  };
                  this.updateZone(iam);
                }
              );
            }}
            style={DropZoneStyles}
          >
            <Text style={{ backgroundColor: "transparent" }}>Cart</Text>
          </Animated.View>
        </View>

        <View style={styles.ctnDropZones}>
          <Text style={styles.msg}>{this.state.droppedZone}</Text>
          <Animated.View
            ref={el => {
              this.empty = el;
            }}
            onLayout={({ nativeEvent }) => {
              UIManager.measure(
                findNodeHandle(this.empty),
                (x, y, width, height, pageX, pageY) => {
                  const iam = {
                    x: Math.floor(x),
                    xd: Math.floor(x + width),
                    y: Math.floor(y),
                    yd: Math.floor(y + height),
                    ref: "empty"
                  };
                  this.updateZone(iam);
                }
              );
            }}
            style={DropZoneEmptyStyles}
          >
            <Text style={{ backgroundColor: "transparent" }}>Empty</Text>
          </Animated.View>
        </View>

        {this.renderList()}
        {this.renderDrag()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor:Theme.color.bg,
    position: "relative"
  },
  ctnDropZones: {
    width: width,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    minHeight: height / 4,
    backgroundColor: "transparent"
  },
  msg: {
    fontFamily: Theme.type.bold,
    fontSize: Theme.type.lg
  }
});
