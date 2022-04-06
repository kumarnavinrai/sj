import {Dimensions} from 'react-native';
export const width = Dimensions.get('screen').width;
export const Height = Dimensions.get('screen').height;
export const fontScale = Dimensions.get('screen').fontScale;
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const generateSizes = () => {
  let aspectRatio = Math.round((Height / width + Number.EPSILON) * 100) / 100;
  // if (aspectRatio > 1.3 && aspectRatio < 1.6) {
  return {
    large: wp('5%'),
    normal: wp('4%'),
    small: wp('3%'),
    ratio: aspectRatio,
  };
  // }
  // if (aspectRatio > 1.7 && aspectRatio < 1.9) {
  //   sizes = {
  //     large: (Height / width) * 10.06,
  //     normal: (Height / width) * 7.55,
  //     small: (Height / width) * 5.66,
  //     ratio: aspectRatio,
  //   };
  // }
  // if (aspectRatio > 1.9 && aspectRatio < 2.1) {
  //   sizes = {
  //     large: (Height / width) * 11.06,
  //     normal: (Height / width) * 8.55,
  //     small: (Height / width) * 6.66,
  //     ratio: aspectRatio,
  //   };
  // }
  // if (aspectRatio > 2.1 && aspectRatio < 2.2) {
  //   sizes = {
  //     large: (Height / width) * 9.56,
  //     normal: (Height / width) * 7.55,
  //     small: (Height / width) * 5.65,
  //     ratio: aspectRatio,
  //   };
  // }
};

export default {
  COLORS: {
    DEFAULT: '#FFFFFF',
    PRIMARY: '#0a295f',
    SECONDARY: '#3d74e9',
    TEXTHEADER: '#000000', //same as primary
    BG_COLOR_1: '#add8e6',
    FONT_COLOR_1: '#303030',
    FONT_COLOR_2: '#232323',
    light_brown_COLOR: 'rgb(198,198,198)',
    BORDER_COLOR: '#898989',
    INACTIVE_COLOR: '#707070',
    BLOCK: '#E7E7E7',
    ICON: '#172B4D',
    HEADER: '#696969',
    BORDER: '#CAD1D7',
    WHITE: '#FFFFFF',
    BLACK: '#1e1e1e',
    ERROR: '#FF0000',
    Links: '#0077c0',
    ORANGE: '#F3983E',
    GREEN: '#138808',
    LIGHT_GREY: '#EFECEC',
    BORDER_TEXT: '#463F3A',
    FACEBOOK: '#3B5998',
    GOOGLE: '#F14336',
    BLUE_GREY: '#f3f3f3',
  },

  SIZES: generateSizes(),
};
