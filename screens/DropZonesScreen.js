import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import Theme from "../constants/theme";

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
    backgroundColor:Theme.color.bg,
  }
});
