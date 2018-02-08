
import React, { Component } from "react";
import { LayoutAnimation, PanResponder, StyleSheet, View,Text } from "react-native";
import TagsArea from "./tagsAreaReorder";
import PropTypes from "prop-types"; 
import { isPointWithinArea} from "../../constants/touches";
import { moveArrayElement} from "../../constants/funcs";


export default class TagsReorder extends React.Component {

constructor(props) {
  super(props);        
  this.tagBeingDragged =false;
    
}

  state = {
    // Convert passed array of tag titles to array of objects ,
    // so ['tag', 'another'] becomes [{ title: 'tag' }, { title: 'another' }]
    tags: [...new Set(this.props.tags)] // remove duplicates
      .map(title => ({ title })), // convert to objects
    dndEnabled: true,
    isBeingDragged:false,
  };




  componentWillMount() {
    this.panResponder = PanResponder.create({

      onMoveShouldSetPanResponder: (e,gestureState) => {
        const { dx, dy, moveX, moveY, numberActiveTouches } = gestureState;
        
        
        if (numberActiveTouches !== 1) {
          return false;
        }

        // or if there was no movement since the gesture started
        if (dx === 0 && dy === 0) {
          return false;
        }

        // Find the tag below user's finger at given coordinates
        const tag = this.findTagAtCoordinates(moveX, moveY);
        
        

        if (tag) {
        this.tagBeingDragged = tag;
          return true;
        } else {
          return false;
        }




      },
      onPanResponderGrant: (e,gestureState) => {
        this.updateTagState(this.tagBeingDragged, { isBeingDragged: true });
      },
      onPanResponderMove: (e,gestureState) => {
        const { moveX, moveY } = gestureState;
        if (!this.state.dndEnabled) {
          return;
        }
        const draggedOverTag = this.findTagAtCoordinates(
          moveX,
          moveY,
          this.tagBeingDragged
        );
        if (draggedOverTag) {
              this.swapTags(this.tagBeingDragged, draggedOverTag);
        }
      },
      onPanResponderRelease: (e,gestureState) => {
        this.updateTagState(this.tagBeingDragged, { isBeingDragged: false });
        this.setState({
          tagBeingDragged: false

        })
      }
    });
  }


  // Animate layout changes when dragging or removing a tag
  componentWillUpdate() {
    LayoutAnimation.configureNext({
      ...LayoutAnimation.Presets.easeInEaseOut,
      duration: this.props.animationDuration
    });
  }

  enableDndAfterAnimating = () => {
    setTimeout(this.enableDnd, this.props.animationDuration);
  };

  enableDnd = () => {
    this.setState({ dndEnabled: true });
  };

  findTagAtCoordinates = ( x, y,exceptTag) => {
    return this.state.tags.find(
      tag =>
        tag.tlX &&
        tag.tlY &&
        tag.brX &&
        tag.brY &&
        isPointWithinArea(x, y, tag.tlX, tag.tlY, tag.brX, tag.brY) 
        && (!exceptTag || exceptTag.title !== tag.title)
    );
  };

  removeTag = tag => {
    this.setState( state => {
      const index = state.tags.findIndex(({ title }) => title === tag.title);
      return {
        tags: [
          // Remove the tag
          ...state.tags.slice(0, index),
          ...state.tags.slice(index + 1)
        ]
      };
    });
  };

  swapTags = (draggedTag, anotherTag) => {
    this.setState((state) => {
      const draggedTagIndex = state.tags.findIndex(
        ({ title }) => title === draggedTag.title
      );
      const anotherTagIndex = state.tags.findIndex(
        ({ title }) => title === anotherTag.title
      );
      return {
        tags: moveArrayElement(state.tags, draggedTagIndex, anotherTagIndex),
        dndEnabled: false
      };
    }, this.enableDndAfterAnimating);
  };

  updateTagState = (tag, props) => {
    this.setState(state => {
      const index = state.tags.findIndex(({ title }) => title === tag.title);
      return {
        tags: [
          ...state.tags.slice(0, index),
          {
            ...state.tags[index],
            ...props
          },
          ...state.tags.slice(index + 1)
        ]
      };
    });
  };

  onRenderTag = ( tag, screenX, screenY, width, height ) => {
    this.updateTagState(tag, {
      tlX: screenX,
      tlY: screenY,
      brX: screenX + width,
      brY: screenY + height
    });
  };

  onSubmitNewTag = (title) => {
    // Remove tag if it already exists to re-add it to the bottom of the list
    const existingTag = this.state.tags.find(
      (tag) => tag.title === title
    );
    if (existingTag) {
      this.removeTag(existingTag);
    }
    this.setState((state) => {
      return {
        tags: [...state.tags, { title }]
      };
    });
  };

  render() {
    const { tags } = this.state;

    return (
      <View style={styles.container} {...this.panResponder.panHandlers}>
        <TagsArea
          tags={tags}
          onPress={this.removeTag}
          onRenderTag={this.onRenderTag}
          onPressAddNew={this.props.onPressAddNewTag}
        />
      </View>
    );
  }
}

TagsReorder.propTypes = {
  tags: PropTypes.array,
  animationDuration: PropTypes.number,
  onPressAddNewTag: PropTypes.func
};
TagsReorder.defaultProps = {
  animationDuration: 500
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor:'pink'
  }
});
