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

import OnBoarding from '../components/on-boarding/comp';

export default class OnBoardingScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <SafeAreaView style={styles.ctn}>
         <OnBoarding/>
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
