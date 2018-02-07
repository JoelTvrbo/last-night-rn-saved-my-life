import React, { Component } from "react";
import { LayoutAnimation, PanResponder, StyleSheet, View,Text } from "react-native";

import PropTypes from "prop-types"; // ES6
import Tag from "./tagReorder";

export default class TagsAreaReorder extends React.Component {
  render() {
    const { tags, onPress, onPressAddNew, onRenderTag } = this.props;
    return (
      <View style={styles.container}>
        {tags.map(tag => (
          <Tag
            key={tag.title}
            tag={tag}
            onPress={onPress}
            onRender={onRenderTag}
          />
        ))}

        <Text style={styles.add} onPress={onPressAddNew}>
          Add new
        </Text>
      </View>
    );
  }
}

TagsAreaReorder.propTypes = {
  tags: PropTypes.array,
  onPressAddNew: PropTypes.func,
  onPress: PropTypes.func,
  onRenderTag: PropTypes.func // (tag: TagObject, screenX: number, screenY: number, width: number, height: number)
};

const styles = {
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderColor: "rgba(255,255,255,0.5)",
    borderRadius: 5,
    borderWidth: 2,
    paddingBottom: 10,
    paddingHorizontal: 15,
    paddingTop: 15
  },
  add: {
    backgroundColor: "transparent",
    color: "#FFFFFF",
    paddingHorizontal: 5,
    paddingVertical: 5,
    textDecorationLine: "underline"
  }
};
