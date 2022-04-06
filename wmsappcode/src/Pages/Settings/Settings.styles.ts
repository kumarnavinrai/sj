import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {StyleSheet} from 'react-native';
import theme from '../../Constants/theme';
import {heightPercentageToDP} from '../../Services/CustomSizes';

const styles = StyleSheet.create({
  listItemContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: theme.SIZES.large + 2,
    paddingVertical: theme.SIZES.normal + 5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listItemText: {
    fontFamily: 'Montserrat-SemiBold',
    fontWeight: 'bold',
    fontSize: theme.SIZES.normal + 2,
    color: `#232323`,
  },
  contactContainer: {
    flexDirection: 'column',
    paddingHorizontal: theme.SIZES.large + 2,
    paddingVertical: theme.SIZES.small,
    borderBottomWidth: 1,
    borderBottomColor: '#1c1c1c50',
  },
  keyValueConatainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: theme.SIZES.small / 2,
  },
  keyText: {
    color: '#8d989d',
    fontFamily: 'Montserrat-SemiBold',
    fontWeight: 'bold',
    fontSize: theme.SIZES.small + 2,
  },
  valueText: {
    color: '#8d989d',
    fontFamily: 'Montserrat-Regular',
    fontSize: theme.SIZES.small + 2,
    marginLeft: theme.SIZES.small / 2,
  },

  imageBackground: {
    flex: 1,
    paddingTop: hp('11%'),
  },
  parentContainer: {
    flex: 1,
  },
  firstContainer: {
    paddingHorizontal: theme.SIZES.normal,
  },

  accordianParentItem: {
    paddingHorizontal: theme.SIZES.small,
    paddingVertical: theme.SIZES.small + 1,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#1c1c1c50',
    backgroundColor: 'transparent',
  },
  flagIcon: {
    width: theme.SIZES.large + 2,
    height: theme.SIZES.large + 1,
    marginLeft: theme.SIZES.small / 2,
  },

  signintitletext: {
    fontSize: theme.SIZES.large,
    fontFamily: 'Montserrat-Bold',
    fontWeight: 'bold',
    color: theme.COLORS.FONT_COLOR_1,
    textAlign: 'center',
    marginVertical: hp('8%'),
  },
});
export default styles;
