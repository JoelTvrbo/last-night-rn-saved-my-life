import React,{cloneElement} from "react";
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
import { Ionicons } from "@expo/vector-icons";
import {width,height} from "../../constants/device";
import Theme from "../../constants/theme";
import {crudRender,crudCreate,crudUpdate,crudDelete,measureNode} from "../../constants/funcs";
import Draggie from "./draggie";

const dnd = [ { key: 1, nom: "Catalina",success:false,nope:false,animating:false,disabled:false }, { key: 2, nom: "Romulo",success:false,nope:false,animating:false,disabled:false }, { key: 3, nom: "Noooollo",success:false,nope:false,animating:false,disabled:false },
 { key: 4, nom: "Moro",success:false,nope:false,animating:false,disabled:false }, { key: 5, nom: "Nura",success:false,nope:false,animating:false,disabled:false }, { key: 6, nom: "Paura",success:false,nope:false,animating:false,disabled:false }, { key: 7, nom: "Bulma",success:false,nope:false,animating:false,disabled:false } , 
 { key: 8, nom: "ulma",success:false,nope:false,animating:false,disabled:false }, { key: 9, nom: "Serotonina",success:false,nope:false,animating:false,disabled:false }];


export default class DropZones extends React.Component {
  state = {
    opacity: new Animated.Value(0.4),
    panXY: new Animated.ValueXY({ x: 0, y: 0 }),
    // background: new Animated.Value(0),
    dragabbleItems:[],
    dropZones: [],
    success: false,
    animating: false,
    droppedZone: null,
    disabled: true,
    dragging:null,
    wishlist:[],
    cart:[],
    empty:[],
    dx:10,
    dy:0,
    list:null,
  };


findX = k => {
      if (k === 1 || k === 4 + 1 || k === 8 + 1 || k === 16 + 1  ) return 10;
      if ( k === 2 || k === 4 + 2 || k === 8 + 2  ) return 100;
      if ( k === 3 || k === 4 + 3 || k === 8 + 3  ) return 200;
}

findY = k => {
    if (k < 5) return this.state.list + 10;
    if (k >= 5 && k < 9) return this.state.list + 100;
    if (k >= 8 && k < 13) return  this.state.list + 90*2;
    if (k >= 12 && k <= 16) return this.state.list +  90*3;
}


  startDrag = k => {
    console.log('start')
    this[k].setNativeProps({ style: { backgroundColor: "#bbb" } });
    const dax = this.findX(k);
    const day = this.findY(k);
    this.setState({
      animating: true,
      disabled: false,
      dragging:k,
      backupx:dax,
      backupy:day,
      dx:dax,
      dy:day
    });
  };


  drop(pos) {
    if (!pos || pos.x === 0 || pos.y === 0) return;
    console.log('drop')

    const dd = this.state.dropZones
      .filter(
        zone =>
          pos.y <= zone.yd &&
          pos.y >= zone.y &&
          pos.x <= zone.xd &&
          pos.x >= zone.x
      )
      .map(zone => zone.ref);
      const string = dd;
      const idx = this.state.dragging;
      if ( string.length === 0) return this.resetPan();
      if (string === 'empty') {
        this[idx].setNativeProps({
          style: { backgroundColor: "pink" }
        });
        this.resetPan();
        return;

      } else {
        
        this.setState({
          droppedZone: string,
          animating: false,
          disabled: true,
          success: true,
          dragging:null,
          backupx:null,
          backupy:null
        });
  
        this[string].setNativeProps({
          style: { backgroundColor: "cyan" }
        });
      }
    }
  

  componentWillMount() {
    this._animatedX = 0;
    this._animatedY = 0;
    this.state.panXY.x.addListener(event => (this._animatedX = event.value));
    this.state.panXY.y.addListener(event => (this._animatedY = event.value));
  }
  
  componentWillUpdate() {
    LayoutAnimation.configureNext({
      ...LayoutAnimation.Presets.easeInEaseOut,
      duration: 200
    });
  }

  panResponder = PanResponder.create({
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderGrant: (e, gesture) => {
      const { locationX, locationY } = e.nativeEvent;

      this.draggie.setNativeProps({
        style: { borderWidth: 3 }
      });

      this.state.panXY.setOffset({
        x: this._animatedX,
        y: this._animatedY
      });
      this.state.panXY.setValue({ x: 0, y: 0 });
   
    },
    onPanResponderMove: (event) => {
  this.setState({
    dx:event.nativeEvent.pageX, 
    dy:event.nativeEvent.pageY,
  });

    },
    onPanResponderRelease: (e, gestureState) => {
      const { pageX, pageY, identifier, locationX, locationY } = e.nativeEvent;
      const { moveX, moveY, dx, dy, x0, y0, vx, vy, numberActiveTouches } = gestureState;

      requestAnimationFrame(() => {
      UIManager.measure(findNodeHandle(this.draggie), (x, y, width, height, pageX, pageY) => {
        const pos = { x:Math.floor(pageX), y:Math.floor(pageY)}
        this.drop(pos);
        });
      });

      this.state.panXY.flattenOffset();
  }

  })




  resetPan() {
    const x = this.state.backupx;
    const y = this.state.backupy;
    
   this.setState({
     dx:x,
     dy:y
   })
  }

  resetState() {
   
    this.setState({
      animating: false,
      disabled: true, 
      success: true,
      dragging:null,
      backupx:null,
      backupy:null
    })

  }


  updateZone(iam) {
    this.setState(prevState => {
      return {
        dropZones: [...prevState.dropZones, iam]
      };
    });
  }

  setUpList(y) {
    this.setState({
        list: y,
        dy:y
      })
  }

  getBgColor = (item) => {
    if (item.disabled) return '#aaa';
    if (item.animating) return '#ff5';
    if (item.success) return '#dd3';
    if (!item.disabled || !item.animating || !item.success) return "#fff";
  }

  _keyExtractor = (item, index) => item.key;

  render() {
    const { success,dropZones, draggies, dragPos, opacity, animating } = this.state;

    const DropZoneStyles = {
      width: width / 4 ,
      height:  width / 4 ,
      backgroundColor: "#bbb",
      borderWidth: 2,
      borderColor: "#eee",
    };
    const DropZoneEmptyStyles = {
      width: 80,
      height: 80,
      backgroundColor: "yellow",
      borderWidth: 2,
      borderColor: "yellow",
    };

    return (
      <SafeAreaView style={styles.safeArea} >
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
                    x: Math.floor(pageX),
                    xd: Math.floor(pageX + width),
                    y: Math.floor(pageY),
                    yd: Math.floor(pageY + height),
                    ref: "wishlist"
                  };
                  this.updateZone(iam);
                }
              );
            }}>
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
                    x: Math.floor(pageX),
                    xd: Math.floor(pageX + width),
                    y: Math.floor(pageY),
                    yd: Math.floor(pageY + height),
                    ref: "cart"
                  };
                  this.updateZone(iam);
                }
              );
            }}
            style={DropZoneStyles} >
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
                    x: Math.floor(pageX),
                    xd: Math.floor(pageX + width),
                    y: Math.floor(pageY),
                    yd: Math.floor(pageY + height),
                    ref: "empty"
                  };
                  this.updateZone(iam);
                }
              );
            }}
            style={DropZoneEmptyStyles}>
            <Text style={{ backgroundColor: "transparent" }}>Empty</Text>
          </Animated.View>

        </View>

        <FlatList
          scrollEnabled={false}
          style={{
            width: width,
          }}
          ref={el => {
            this.list = el;
          }}
          onLayout={({ nativeEvent }) => {
            UIManager.measure(
              findNodeHandle(this.list),
              (x, y, width, height, pageX, pageY) => {
                this.setUpList(y);
              }
            );
          }}
          data={dnd}
          numColumns={4}
          keyExtractor={this._keyExtractor}
          renderItem={({ item }) => (
            <View 
              style={{
                width: width / 4 - 20,
                height: width / 4 - 20,
                marginHorizontal:10,
                marginVertical:10,
                backgroundColor:this.getBgColor(item)
              }}
              ref={el => {
                this[item.key] = el;
              }}
            >
              <TouchableOpacity 
                style={{flex:1}}
                onPress={() => this.startDrag(item.key)}>
                  <Text> {item.key}</Text>
              </TouchableOpacity>
              </View>
          )}
        />


    <Animated.View
       {...this.panResponder.panHandlers}
        ref={el => {
          this.draggie = el;
        }}
        style={[styles.touchableStyles,{backgroundColor:'magenta',
        position:'absolute',
        top:this.state.dy,
        left:this.state.dx,
        opacity: animating ? 1 : 0
         }]}
        // style={[panStyle, dragStyles, moving ? shadows : null]}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ddd",
    position: "relative"
  },
  touchableStyles: {
    width: 80,
    height: 80
  },
  ctnDropZones: {
    width: width,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    minHeight: height / 4,
    backgroundColor:'transparent'
  },
  msg:{
    fontFamily:Theme.type.bold,
    fontSize:Theme.type.lg
  }
});

