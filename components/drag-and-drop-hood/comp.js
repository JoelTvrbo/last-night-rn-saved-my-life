import React, { Component } from "react";
import {
  StyleSheet,
  View,
  PanResponder,
  Animated,
  Dimensions,
  Text
} from "react-native";

import { width} from "../../constants/device";
import Theme from "../../constants/theme";


export default class Hood extends React.Component {
  state = {
    dropArea: {},
    gridAuto: [],
    cellWidth: 0,
    items: [],
    // merge
    showDraggable: true,
    pan: new Animated.ValueXY(),
    opacity: new Animated.Value(1),
    dragging: false,
    animtest: new Animated.Value(1),
    neighboursIdx: false,
    targetDropped: 0,
    isError: false,
    string:0
  };

  componentWillMount() {
    this._val = { x: 0, y: 0 };
    this.state.pan.addListener(value => (this._val = value));

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,

      onPanResponderGrant: (e, gesture) => {

        this.state.pan.setOffset({
          x: this._val.x,
          y: this._val.y
        });
        this.state.pan.setValue({ x: 0, y: 0 });

      },
      onPanResponderMove: (e, gestureState) => {
        const { moveX, moveY, dx, dy } = gestureState;

        const hoverPoint = {
          hoverY: moveY,
          hoverX: moveX
        };

        Animated.event([null, { dx: this.state.pan.x, dy: this.state.pan.y }])(
          e,
          gestureState
        );
        if (moveY > this.state.dropArea.y + this.state.dropArea.height) {
          // + 10 de gap
          this.setState({
            isError: true
          });
        } else {
          this.setState({
            isError: false,
            dragging: true
          });
          this.findIdxOnHover(hoverPoint, this.state.cellWidth);
        }
      },

      onPanResponderRelease: (e, gesture) => {
        const point = {
          newY: gesture.moveY,
          newX: gesture.moveX
        };
        this.findIdxOnDrop(point, this.state.cellWidth);
      }
    });
  }


  // HELPERS TO FIND CLOSE CELLS TO THE ONE CURRENTLY DRAGGING OVER // ATROCIUS CODE, NEEDS REFRACTORING
  isNeighbour = numb => {
    const toNumb = ~~numb;
    const firstCell = [toNumb, toNumb + 1, toNumb + 4];
    const startCells = [toNumb, toNumb + 1, toNumb + 4, toNumb - 4];
    const endCells = [toNumb - 1, toNumb, toNumb + 4, toNumb - 4];
    const rule = [toNumb - 1, toNumb, toNumb + 1, toNumb + 4, toNumb - 4];
    const lastRow = [toNumb - 1, toNumb, toNumb + 1, toNumb - 4];

    if (toNumb === 1) {
      this.setState({
        neighboursIdx: firstCell
      });
    } else if (toNumb === 5 || toNumb === 9 || toNumb === 13) {
      this.setState({
        neighboursIdx: startCells
      });
    } else if (toNumb === 4 || toNumb === 8 || toNumb === 12) {
      this.setState({
        neighboursIdx: endCells
      });
    } else if (toNumb > 13 && toNumb <= 16) {
      this.setState({
        neighboursIdx: lastRow
      });
    } else {
      //(numb === 6 || numb === 7 || numb === 10 || numb === 11 )
      this.setState({
        neighboursIdx: rule
      });
    }
  };

  idxToMultiplierXi = idx => {
    if (idx === 1 || idx === 5 || idx === 9 || idx === 13) return 0;
    if (idx === 2 || idx === 6 || idx === 10 || idx === 14) return 1;
    if (idx === 3 || idx === 7 || idx === 11 || idx === 15) return 2;
    if (idx === 4 || idx === 8 || idx === 12 || idx === 16) return 3;
  };

  idxToMultiplierXf = idx => {
    if (idx === 1 || idx === 5 || idx === 9 || idx === 13) return 1;
    if (idx === 2 || idx === 6 || idx === 10 || idx === 14) return 2;
    if (idx === 3 || idx === 7 || idx === 11 || idx === 15) return 3;
    if (idx === 4 || idx === 8 || idx === 12 || idx === 16) return 4;
  };

  idxToMultiplierYi = idx => {
    if (idx < 5) return 0;
    if (idx >= 5 && idx < 9) return 1;
    if (idx >= 8 && idx < 13) return 2;
    if (idx >= 12 && idx <= 16) return 3;
  };
  idxToMultiplierYf = idx => {
    if (idx < 5) return 1;
    if (idx >= 5 && idx < 9) return 2;
    if (idx >= 8 && idx < 13) return 3;
    if (idx >= 12 && idx <= 16) return 4;
  };

  findIdxOnHover = (coord, cellWidth) => {
    const { hoverY, hoverX } = coord;

    const cells = this.createGrid(
      this.state.items.length,
      this.state.cellWidth
    );

    const res = cells
      .filter(
        x =>
          hoverY <= x.yf && hoverY >= x.yi && (hoverX <= x.xf && hoverX >= x.xi)
      )
      .map(x => x.idx);

    this.isNeighbour(res);

    Animated.spring(this.state.animtest, {
      toValue: 0.5,
      // friction: 3,
      useNativeDriver: true
    }).start(
      this.setState({
        string:res
      })
    );
  };

  findIdxOnDrop = (coord, cellWidth) => {
    const { newY, newX } = coord;
    const cells = this.createGrid(
      this.state.items.length,
      this.state.cellWidth
    );

    const res = cells
      .filter(
        x => newY <= x.yf && newY >= x.yi && (newX <= x.xf && newX >= x.xi)
      )
      .map(x => x.idx);

    const toNumber = ~~res;
    this.setState({
      neighboursIdx: false,
      targetDropped: toNumber,
    });


    Animated.spring(this.state.pan, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: true
    }).start(() =>
      this.setState({
        dragging: false
      })
    );

    Animated.timing(this.state.opacity, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true
    });
    // .start(() =>
    //   this.setState({
    //     showDraggable: false
    //   })
    // );
  };

  // STORE A FAKE GRID ON STATE SO THAT WE CAN FIGURE OUT LATER COORDINATES OF MOVE/DROP POSITIONS 
  createGrid = amount => {
    const grid = [];
    for (let i = 1; i <= amount; i++) {
      grid.push({
        idx: i,
        xi: ~~this.state.cellWidth * this.idxToMultiplierXi(i),
        xf: ~~this.state.cellWidth * this.idxToMultiplierXf(i),
        yi: ~~this.state.cellWidth * this.idxToMultiplierYi(i),
        yf: ~~this.state.cellWidth * this.idxToMultiplierYf(i)
      });
    }
    return grid;
  };

    
  initDrop = e => {
    this.setState({
      dropArea: {
        width: e.nativeEvent.layout.width.toFixed(0),
        height: e.nativeEvent.layout.height.toFixed(0),
        x: e.nativeEvent.layout.x.toFixed(0),
        y: e.nativeEvent.layout.y.toFixed(0)
      },
      cellWidth: Math.floor(e.nativeEvent.layout.width.toFixed(0) / 4) //num of cols
    });

    this.setState({
      items: this.props.items
    });
  };

  render() {
    const { items, ctnStyles, itemStyles, labelStyles, } = this.props;

    const { dropArea, cellWidth, neighboursIdx, animtest, targetDropped, isError } = this.state;

    const panStyle = {
      transform: this.state.pan.getTranslateTransform()
    };

    const ctnDraggie = {
      width: width,
      height: 150,
      backgroundColor: "yellow",
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
    };

    const gridLabelStyles = {
      textAlign: "center"
    };

    return (
      <View style={styles.ctn}>
        <View
          style={{
            width: width,
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            height: cellWidth * 4 + 10,
            backgroundColor: isError ? Theme.color.alpha: Theme.color.white
          }}
          onLayout={this.initDrop}
        >
          {items.map(item => (
            <Animated.View
              key={item.key}
              style={{
                width: cellWidth,
                height: cellWidth,
                borderWidth: 1,
                justifyContent: "center",
                alignItems: "center",
                opacity:
                  neighboursIdx && neighboursIdx.includes(item.key) ? 0.2 : 1,
                backgroundColor:
                  this.state.targetDropped === item.key ? Theme.color.beta : "yellow"
              }}
            >
              <Text style={Object.assign(gridLabelStyles, labelStyles)}>
                {item.key}
              </Text>
            </Animated.View>
          ))}
        </View>

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
                  backgroundColor: this.state.dragging ? Theme.color.alpha : Theme.color.disabled,
                  opacity: this.state.opacity
                }
              ]}
            >
              <Text style={{backgroundColor:"transparent"}}>{this.state.string} </Text>
            </Animated.View>)
          }
        </View>
      </View>
    );
  }
}

let radix = 30;

let styles = StyleSheet.create({
  ctn: {
    flex: 1,
    backgroundColor: Theme.color.bg,
    flexDirection:"column",
    justifyContent:'space-between',
    alignItems:"center"
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
