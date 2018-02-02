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

import DropZones from '../components/drag-and-drop-zones/comp';

export default class DropZonesScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <SafeAreaView style={styles.ctn}>
         <DropZones/>
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
