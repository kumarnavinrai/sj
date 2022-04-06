import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  
} from 'react-native-responsive-screen';

import {StyleSheet} from 'react-native';
import theme from '../../Constants/theme';

export const styles = StyleSheet.create({
  parent: {
    padding: theme.SIZES.small * 0.3,
  },
  dropdownStyle: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: `${theme.COLORS.BORDER_TEXT}90`,
  },
  modal: {
    marginBottom: 0,
    marginHorizontal: 2,
    height:hp('100%'),
    justifyContent: 'flex-end',
    width: '100%',
  },
  mainModal:{
    display: 'flex',
    alignItems: 'center',
    paddingBottom: theme.SIZES.large,
    borderRadius: 8,
    bottom:0,
    backgroundColor:theme.COLORS.DEFAULT,
    paddingVertical:theme.SIZES.large * 1.3
  },

  iconTouchable: {
    borderRadius: 6,
    paddingHorizontal: theme.SIZES.small / 4,
    alignSelf: 'flex-end',
    marginRight: theme.SIZES.large ,
    backgroundColor: `${theme.COLORS.PRIMARY}30`,
  },
  leftIcon: {
    // marginRight: theme.SIZES.small * 0.6,
  },
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderBottomWidth: 1.2,
    borderBottomColor: `${theme.COLORS.BORDER_TEXT}90`,
    paddingHorizontal:theme.SIZES.small * 0.2,
    paddingVertical:theme.SIZES.small * 0.4
  },
  selected: {
    fontSize: theme.SIZES.normal,
    letterSpacing: 1,
  },
});
