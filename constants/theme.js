import { Dimensions,Platform,StyleSheet } from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const fontSize = (baseline) => {
    if(height === 568) {
        return baseline
    } else if(height === 667) {
        return baseline * 1.2
    } else if(height === 736) {
        return baseline * 1.4
    }
    return baseline
}


const base = "#5c41ec";
const colors = {
  base,
  a:"#92ead3",
  b:"#f9d397",
  c:"#ef92ca",
  d:"#f7ee78",
  notificationBg: base,
  notificationText: "#fff"
};

const fonts = {
  sm: fontSize(12),
  md: fontSize(18),
  lg: fontSize(28),
  xl: fontSize(36),
  regular: 'Avenir',
  bold: 'Avenir-Black',
  secondary:'Cochin'
}


const Theme = {
    hairline:StyleSheet.hairlineWidth,
    color: colors,
    type: fonts
  };

 export default Theme