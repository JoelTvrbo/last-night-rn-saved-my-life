import React, { Component } from "react";
import { AppRegistry, StyleSheet, View, Image } from "react-native";

// import ImageAsync from "./comps/bootstrap/async-img";
// <ImageAsync 
// resource="https://placehold.it/350x150"/>

export default class ImageAsync extends Component {
  state = {
    curImgHeight: 0
  };

  async onImageLayout(e) {
    let { height } = e.nativeEvent.layout;
    let minimumImgHeight = this.props.minHeight; 
    if (height <= minimumImgHeight) {
      //Whenever the real height of the image is less than the minimum height
      await this.setState({ curImgHeight: minimumImgHeight }); //just change the curImgHeight state property to the minimum height.
      //This code is now synchronous, run anything you want here and it will be ran after the setState
      console.log("async success");
    }
  }

  render() {
    return (
      <View style={styles.container} pointerEvents='none'>
        <Image
          source={{ uri: this.props.resource }}
          resizeMode="cover"
          style={[
            styles.image,
            {
              height:
                this.state.curImgHeight <= 0 ? null : this.state.curImgHeight
            }
          ]}
          onLayout={this.onImageLayout.bind(this)}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    alignSelf:'center'
  }
});
