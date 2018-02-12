import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

import TagsReorder from '../components/drag-and-drop-reorder/comp';

const arr = [ '#1', '#2', '#3', '#4', '#5', '#6', '#7', '#8', '#9', '#10']; 
  
export default class ReOrderScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  onSubmitNewTag = (tag) => {
    this._tagsComponent && this._tagsComponent.onSubmitNewTag(tag);
  };

  render() {
    return (
      <SafeAreaView style={styles.ctn}>
          <TagsReorder
            ref={component => this._tagsComponent = component }
            tags={arr}
            onPressAddNewTag={()=> console.log('on press')}
          /> 
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  ctn: {
    flex: 1,
    backgroundColor: '#fff',
  }
});

