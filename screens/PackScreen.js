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

import Pack from '../components/drag-and-drop-pack/comp';

const fake = [ { key: 1, nom: "Catalina" }, { key: 2, nom: "Romulo" }, { key: 3, nom: "Noooollo" }, { key: 4, nom: "Moro" }, { key: 5, nom: "Nura" }, { key: 6, nom: "Paura" }, { key: 7, nom: "Bulma" } , { key: 8, nom: "ulma" }, { key: 9, nom: "Serotonina" }, { key: 10, nom: "melonomina" }, { key: 11, nom: "Poll" }, { key: 12, nom: "Sonia" }, { key: 13, nom: "Noa" }, { key: 14, nom: "Xop3" }, { key: 15, nom: "Bulma" } , { key: 16, nom: "ema" } ];

import { Ionicons } from "@expo/vector-icons";
export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'app.json',
  };

  render() {
    return (
      <SafeAreaView style={styles.ctn}>

<DroppieFlatlist
            items={fake}
            Pressed={() => navigate("Read")}
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

