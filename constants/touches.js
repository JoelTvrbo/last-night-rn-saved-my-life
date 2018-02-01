
// GESTURES 

export const tapped = gestureState => gestureState.dx === 0 && gestureState.dy === 0;
export const gestureIsClick = gestureState => { return Math.abs(gestureState.dx) < 5 && Math.abs(gestureState.dy) < 5; };
export const pulledUp = gestureState => gestureState.dy < 0;
export const pulledDown = gestureState => gestureState.dy > 0;
export const pulledFast = (gestureState,config) => Math.abs(gestureState.vy) > config.fast; 
export const pulledFarVertical = (gestureState,config) => Math.abs(gestureState.dy) > config.far;  
export const pulledFarHorizontal = (gestureState,config) => Math.abs(gestureState.dx) > config.far;  
export const oneTouch = e => e.nativeEvent.touches.length === 1;

export const getSwipeDirection = (gestureState, config) => {
  const { dx, dy } = gestureState;
    const h = (dx > 0) ? 'East' : 'West';
    const v = (dy < 0) ? 'North' : 'South';
    return {horizontal:h,vertical:v}
}

// COORDS
export const findTagAtCoordinates = (x, y, exceptTag) => {
  return this.state.tags.find(
    tag =>
      tag.tlX &&
      tag.tlY &&
      tag.brX &&
      tag.brY &&
      isPointWithinArea(x, y, tag.tlX, tag.tlY, tag.brX, tag.brY) &&
      (!exceptTag || exceptTag.title !== tag.title)
  );
};

export const isPointWithinArea = (pointX,pointY,areaTlX,areaTlY,areaBrX,areaBrY ) => {
  return (
    areaTlX <= pointX &&
    pointX <= areaBrX && // is within horizontal axis
    areaTlY <= pointY &&
    pointY <= areaBrY
  ); // is within vertical axis
};

export const insideAllowedRange = (curr,min,max) => curr >= min && curr <= max;
