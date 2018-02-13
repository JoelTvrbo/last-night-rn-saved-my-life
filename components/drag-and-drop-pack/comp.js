import React, { Component } from "react";
import {
  StyleSheet,
  View,
  PanResponder,
  Animated,
  Dimensions,
  Text,
  TouchableOpacity,
  FlatList,
  AsyncStorage
} from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { width, height,statusbar } from "../../constants/device";
import Theme from "../../constants/theme";
import BigSlider from "react-native-big-slider";



export default class Pack extends React.Component {
  state = {
    items: this.props.items,
    packed: [],
    indexes: [],
    items: [],
    headerHeight: 0,
    qty: 3,
    showDraggable: true,
    pan: new Animated.ValueXY(),
    opacity: new Animated.Value(1),
    dragging: false,
    animtest: new Animated.Value(1),
    isError: false,
    targetDropped: 0
  };

  componentWillMount() {
    this._val = { x: 0, y: 0 };
    this.state.pan.addListener(value => (this._val = value));

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState) => true,

      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setOffset({
          x: this._val.x,
          y: this._val.y
        });
        this.state.pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: (e, gestureState) => {
        const { moveX, moveY, dx, dy, numberActiveTouches } = gestureState;

        if (numberActiveTouches > 1) return;

        Animated.event([null, { dx: this.state.pan.x, dy: this.state.pan.y }])(
          e,
          gestureState
        );

        const safeArea =
          ~~this.state.headerHeight + width + 50;

        if (moveY <= ~~this.state.headerHeight || moveY > safeArea) {
          this.setState({
            isError: true
          });

          setTimeout(() => {
            this.setState({
              isError: false
            });
          }, 1000);
        } else {
          this.setState({
            isError: false,
            dragging: true
          });
        }

        Animated.timing(this.state.opacity, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true
        }).start();
      },

      onPanResponderRelease: (e, gestureState) => {
        const point = {
          newY: gestureState.moveY,
          newX: gestureState.moveX
        };

        this.findIdxOnDrop(point);
      }
    });
  }


  // HELPERS TO FIND COORDINATES OF THE ONE CURRENTLY DRAGGING OVER // ATROCIUS CODE, NEEDS REFRACTORING
  
  Yaxis = (newY, cell) => {
    const safeArea =
      ~~this.state.headerHeight + statusbar;
    if (newY <= cell + safeArea) return [1, 2, 3, 4];
    if (newY > cell + safeArea && newY < cell * 2 + safeArea)
      return [5, 6, 7, 8];
    if (newY >= cell * 2 + safeArea && newY < cell * 3 + safeArea)
      return [9, 10, 11, 12];
    if (newY >= cell * 3 + safeArea) return [13, 14, 15, 16];
  };

  Xaxis = (newX, cell) => {
    if (newX <= cell) return [1, 5, 9, 13];
    if (newX > cell && newX < cell * 2) return [2, 6, 10, 14];
    if (newX >= cell * 2 && newX < cell * 3) return [3, 7, 11, 15];
    if (newX >= cell * 3) return [4, 8, 12, 16];
  };

  findId = (arrY, arrX) => {
    let a = new Set(arrY);
    let b = new Set(arrX);
    let c = new Set([...a].filter(x => b.has(x)));
    return [...c];
  };

  findIdxOnDrop = (coord) => {
    const { newY, newX } = coord;
    const cell = width / 4;
    const safeArea = ~~this.state.headerHeight + width + 50;

    if (newY <= ~~this.state.headerHeight || newY > safeArea) {
      Animated.timing(this.state.pan, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: true,
        duration: 500,
        bounciness:4
      }).start(() =>
        this.setState({
          isError: true,
          dragging: false
        })
      );
    } else {
      const arrY = this.Yaxis(newY, cell);
      const arrX = this.Xaxis(newX, cell);
      const result = this.findId(arrY, arrX);
      const clean = result[0];

      const found = this.state.packed.some(el => el.key === clean);

      if (!found) {
        const newItemRaw = this.props.items.find(x => x.key === clean);

        const raw = this.state.packed;
        raw.push({ ...newItemRaw, qty: this.state.qty });

        const cleanArr = [...new Set(raw)];

        this.setState({
          targetDropped: clean,
          packed: cleanArr,
          indexes: this.state.indexes.concat(clean)
        });

        Animated.timing(this.state.pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: true,
          bounciness:4,
          duration: 500
        }).start(() =>
          this.setState({
            dragging: false
          })
        );
      }

      const SETTINGS_KEY = "Packed";
      const settingsObj = this.state.packed;
      AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settingsObj));
    }
  };

  // REMOVE FROM ASYNC STORAGE
  unPack(uid) {
    const raw = this.state.packed.filter(x => x.key !== uid);
    const clean = [...new Set(raw)];

    const rawIndexes = this.state.indexes.filter(x => x !== uid);
    const cleanIndexes = [...new Set(rawIndexes)];

    this.setState({
      packed: clean,
      targetDropped: false,
      indexes: cleanIndexes
    });

    setTimeout(() => {
      const SETTINGS_KEY = "Packed";
      const settingsObj = this.state.packed;
      AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settingsObj));
    }, 1000);
  }

  initHeader = e => {
    this.setState({
      headerHeight: e.nativeEvent.layout.height.toFixed(0)
    });
  };

  _keyExtractor = (item, index) => item.key;

  render() {
    const { items, ctnStyles, itemStyles, labelStyles, Pressed } = this.props;

    const { animtest, targetDropped, isError, headerHeight, qty } = this.state;

    const panStyle = {
      transform: this.state.pan.getTranslateTransform()
    };

    const ctnDraggie = {
      width: width,
      height:
        height -
        width -
        headerHeight -
        statusbar,
      padding: 10,
      backgroundColor: Theme.color.bg,
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "space-around" // evenly
    };

    const touchableStyles = {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
      alignSelf: "stretch"
    };

    const gridLabelStyles = {
      textAlign: "center"
    };

    return (
      <View style={styles.ctn}>
        <View style={styles.header} onLayout={this.initHeader}>
          <TouchableOpacity onPress={this.props.Pressed}>
            <Text>Save &amp; view 3 nights</Text>
          </TouchableOpacity>

          <View>
            <Text>{this.state.packed.length}</Text>
          </View>
        </View>

        <FlatList
          scrollEnabled={false}
          style={{
            width: width,
            height: width,
            backgroundColor: isError ? Theme.color.alpha : Theme.color.white
          }}
          data={this.props.items}
          numColumns={4}
          keyExtractor={this._keyExtractor}
          renderItem={({ item }) => (
            <Animated.View
              key={item.key}
              style={{
                width: width / 4,
                height: width / 4,
                borderWidth: 1,
                justifyContent: "center",
                alignItems: "center",
                position:'relative',
                opacity: this.state.indexes.includes(item.key) ? 0.5 : 1,
                backgroundColor:
                  this.state.targetDropped === item.key
                    ? Theme.color.beta
                    : Theme.color.alpha
              }}
            >
              <View 
              style={[...StyleSheet.absoluteFillObject,{zIndex:1,flexDirection:'column', justifyContent:'center',alignItems:'center'}]}
              >
              <MaterialCommunityIcons name="martini" size={55} color={Theme.color.white} />
            </View>
              <TouchableOpacity
                onPress={() => this.unPack(item.key)}
                style={[touchableStyles,{zIndex:2}]}
              >
                <Text
                  style={{
                    color:
                      this.state.targetDropped === item.key
                        ? Theme.color.alpha
                        : Theme.color.beta
                  }}
                >
                  {item.key}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          )}
        />

        <View style={ctnDraggie}>
          {!this.state.showDraggable ? (
            <View style={styles.placeholder} />
          ) : (
            <Animated.View
              {...this.panResponder.panHandlers}
              style={[
                panStyle,
                styles.circle,
                {
                  backgroundColor: this.state.dragging ? Theme.color.beta : Theme.color.alpha
                  // opacity: this.state.opacity
                }
              ]}
            >
              {/* <Text>{qty.toFixed(0)} </Text> */}
            </Animated.View>
          )}

          <View>
            <BigSlider
              maximumValue={10}
              style={{ width: 80, height: 60 }}
              // ref={el => {this.slider = el}}
              // onSlidingComplete={() => {
              //   this.slider.slideTo(80)
              // }}
              //   onSlidingStart={() => {
              //   do something
              // }}
              value={qty}
              label={`${qty.toFixed(0)}`}
              style={{ backgroundColor: Theme.color.alpha}}
              trackStyle={{ backgroundColor:  Theme.color.beta }}
              minimumValue={0}
              onValueChange={value => {
                this.setState(function(prevState, props) {
                  return { qty: value };
                });
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}

let radix = 30;

let styles = StyleSheet.create({
  ctn: {
    flex: 1,
    backgroundColor:Theme.color.bg
  },
  header: {
    width: width,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 20,
    alignItems: "center"
  },
  row: {
    width: width,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden"
  },
  touchableSave: {
    width: width,
    backgroundColor: 'magenta'
  },
  circle: {
    backgroundColor: Theme.color.disabled,
    width: radix * 2,
    height: radix * 2,
    borderRadius: radix,
    flexDirection:"column",
    justifyContent:'center',
    alignItems:"center"
  },
  placeholder: {
    backgroundColor: Theme.color.bg,
    width: radix * 2,
    height: radix * 2,
    borderRadius: radix
  }
});

// READ FROM ASYNC STORAGE

// state={
//   packed:[]
// }

// componentDidMount(){

// const SETTINGS_KEY = 'Packed';
// AsyncStorage.getItem(SETTINGS_KEY).then((settingsStr)=>{
//   if (settingsStr) {
//     const settings = JSON.parse(settingsStr);
//     this.setState({
//       packed:settings
//     })
  
//   }

//  })
// }
// render() {
//   const {navigate} = this.props.navigation;

//   return (
//     <View style={styles.ctn}>

//       <View style={styles.row}> 
//       {this.state.packed.map((x)=>  <Text key={x.key}>{x.nom} {x.qty.toFixed(0)} </Text>)}
//       </View>
//       </View>
//   );
// }
// }