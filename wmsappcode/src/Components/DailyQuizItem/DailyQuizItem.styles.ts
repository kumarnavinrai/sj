import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {StyleSheet} from 'react-native';
import theme from '../../Constants/theme';
import {heightPercentageToDP} from '../../Services/CustomSizes';
import baseStyles from '../Common/styles';

const styles = StyleSheet.create({
  secondContainer: {
    width: '68%',
    paddingLeft: theme.SIZES.small / 1.5,
  },
  image: {
    width: theme.SIZES.large * 5,
    height: theme.SIZES.large * 5,
    aspectRatio: 1.1,
  },
  imageContainer: {
    width: '32%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateString: {
    fontFamily: 'Montserrat-Medium',
    fontSize: theme.SIZES.small + 1,
    color: '#8d989d',
    marginLeft: theme.SIZES.small / 3,
    marginBottom: theme.SIZES.small / 5,
  },
  progressBar: {
    height: theme.SIZES.small / 1.7,
    borderRadius: 2,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: theme.SIZES.normal + 2,
    fontWeight: 'bold',
    width: '100%',
    marginBottom: theme.SIZES.small / 2,
    color: theme.COLORS.FONT_COLOR_2,
  },
  subTitle: {
    fontFamily: 'Montserrat-Medium',
    fontSize: theme.SIZES.small + 2,
    color: '#8d989d',
  },
  progressParent: {
    paddingVertical: theme.SIZES.small,
  },
  rowContainer: {
    width: '100%',
    paddingVertical: theme.SIZES.normal,
    flexDirection: 'row',
  },
  parent: {
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: theme.COLORS.DEFAULT,
    ...baseStyles.shadow_minimal,
    marginHorizontal: theme.SIZES.large,
    marginBottom: theme.SIZES.normal,
    paddingHorizontal: theme.SIZES.small,
    paddingTop: theme.SIZES.small,
  },
  button: {
    paddingLeft: theme.SIZES.small - 2,
    paddingRight: theme.SIZES.small / 2,
    paddingVertical: theme.SIZES.small - 1,
    marginVertical: theme.SIZES.small,
    borderRadius: 5,
    elevation: 3,
    textAlign: 'center',
    backgroundColor: theme.COLORS.PRIMARY,
  },
  buttonText: {
    fontFamily: 'Montserrat-Medium',
    fontWeight: '600',
    color: theme.COLORS.DEFAULT,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
export default styles;
