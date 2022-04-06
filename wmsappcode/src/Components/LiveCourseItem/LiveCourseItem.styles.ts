import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {StyleSheet} from 'react-native';
import theme from '../../Constants/theme';
import {heightPercentageToDP} from '../../Services/CustomSizes';
import baseStyles from '../Common/styles';

const styles = StyleSheet.create({
  image: {
    width: theme.SIZES.large * 3,
    height: theme.SIZES.large * 3,
    aspectRatio: 1,
  },
  imageContainer: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBar: {
    height: theme.SIZES.small / 1.7,
    borderRadius: 2,
  },
  titleContainer: {
    width: '80%',
    paddingLeft: theme.SIZES.small / 2,
  },
  title: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: theme.SIZES.normal - 1,
    fontWeight: 'bold',
    width: '100%',
    color: theme.COLORS.FONT_COLOR_2,
  },
  subTitle: {
    fontFamily: 'Montserrat-Medium',
    fontSize: theme.SIZES.small + 2,
    color: '#8d989d',
  },
  coursecompleated: {
    color:'#1a448c', 
    fontFamily: 'Montserrat-Regular', 
    fontSize: 14
  },
  progressParent: {
    paddingVertical: theme.SIZES.small,
  },
  rowContainer: {
    width: '100%',
    paddingVertical: 10,
    flexDirection: 'row',
  },
  parent: {
    borderRadius: 10,
    backgroundColor: theme.COLORS.DEFAULT,
    ...baseStyles.shadow_minimal,
    marginHorizontal: 5,
    marginBottom: theme.SIZES.normal,
    paddingHorizontal: 10,
    marginTop: 10,
  },
});
export default styles;
