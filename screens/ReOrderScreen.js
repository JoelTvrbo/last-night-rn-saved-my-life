import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView
} from 'react-native';

import TagsReorder from '../components/drag-and-drop-reorder/comp';


const TAGS = [
    '#1',
    '#2',
    '#3',
    '#4',
    '#5',
    '#6',
    '#7',
    '#8',
    '#9',
    '#10',
    // '#follow',
    // '#followme',
    // '#picoftheday',
    // '#me',
    // '#selfie',
    // '#summer',
    // '#instadaily',
    // '#photooftheday',
    // '#friends',
    // '#girl',
    // '#fun',
    // '#style',
    // '#instalike',
    // '#food',
    // '#family',
    // '#tagsforlikes',
    // '#igers',
  ];
  
import { Ionicons } from "@expo/vector-icons";

export default class ReOrderScreen extends React.Component {
  static navigationOptions = {
    title: 'orden !',
  };

  onSubmitNewTag = (tag) => {
    this._tagsComponent && this._tagsComponent.onSubmitNewTag(tag);
  };
  render() {
    return (
      <SafeAreaView style={styles.ctn}>
   <TagsReorder
   ref={component => this._tagsComponent = component }
   tags={TAGS}
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

