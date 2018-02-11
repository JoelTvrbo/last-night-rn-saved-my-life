// MEASURE 

// measureRef(ref, key) {
//   requestAnimationFrame(() => {
//     ref.measure((ox, oy, width, height, px, py) => {
//       this.setState({ [key]: height });
//     });
//   });
// }

//only on native views
// ref={el => {
//   this.measureRef(el,"outerHeight");
// }}
// collapsable={false}

// MEASURE IN WINDOW

// ref={el => {
//   this.view = ref
// }}
// onLayout={()=> this.saveLayout()}

// saveLayout(){
//   this.view.measureInWindow( ({x,y,width,height}) => {
//   })
// }


// ANIMATED 

// state = {
//   scale: new Animated.Value(0),
//   animations: [
//     new Animated.Value(0),
//     new Animated.Value(0),
//     new Animated.Value(0),
//     new Animated.Value(0),
//     new Animated.Value(0),
//   ]
// };
// style={[ styles.explodeHeart, getTransformAnimation( this.state.animations[3], 0.8, -120, -40, "-45deg", 0.3 ) ]}

const getTransformAnimation = (animation, scale, y, x, rotate, opacity) => {
  const scaleAnimation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, scale]
  });
  const xAnimatoin = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, x]
  });

  const yAnimation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, y]
  });

  const rotationAnimation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", rotate]
  });

  const opacityAnimation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, opacity]
  });

  return {
    opacity: opacityAnimation,
    transform: [
      { scale: scaleAnimation },
      { translateX: xAnimatoin },
      { translateY: yAnimation },
      { rotate: rotationAnimation }
    ]
  };
};



getStyles = () => {
  return {
    animated: this.state.isOpen ? {
      width: Device.width,
      height:this.state.position        
    } : {
      height:this.state.position,  
      backgroundColor:Theme.cyan
    },
    movieContainer: this.state.expanded ? {
      flexDirection: 'column',  // arrange image and movie info in a column
      alignItems: 'center',     // and center them
    } : {
      flexDirection: 'row',     // arrange image and movie info in a row
    },
    movieInfo: this.state.expanded ? {
      flex: 0,
      alignItems: 'center',     // center horizontally
      paddingTop: 20,
    } : {
      flex: 1,
      justifyContent: 'center', // center vertically
    },
    title: this.state.expanded ? {
      textAlign: 'center',
    } : {},
  };
}
// style={[styles.movieContainer, this.getStyles().movieContainer]}