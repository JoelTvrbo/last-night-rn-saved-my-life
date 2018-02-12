import { Dimensions, Platform, StyleSheet } from 'react-native';
const {width,height} = Dimensions.get('window');

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

const base = "#222";
const colors = {
  base,
  alpha:"#92ead3",
  beta:"#ef92ca",
  disabled:"rgb(255, 170, 213)",
  palpatine:'rgba(0,0,0,1)',
  vader:'rgba(0,0,0,.6)',
  luke: "#fbfbfb",
  bg:"#ddd"
};

const fonts = {
  sm: fontSize(12),
  md: fontSize(18),
  lg: fontSize(28),
  xl: fontSize(36),
  alpha: 'Avenir',
  bold: 'Avenir-Black',
  beta:'Cochin'
  
}

const Theme = {
    line:StyleSheet.hairlineWidth,
    color: colors,
    type: fonts
  };

 export default Theme