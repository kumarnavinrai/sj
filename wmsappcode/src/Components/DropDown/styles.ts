import {StyleSheet} from 'react-native';
import baseStyles from '../Common/styles';
import {moderateScale} from '../../Services/CustomSizes';
import theme from '../../Constants/theme';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  parent: {
    // paddingVertical: theme.SIZES.small * 0.3,
  },
  title: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
    color: 'rgb(80,80,80)',
    lineHeight: 21,
    marginBottom: 3,
    marginLeft: 3,
  },

  dropdownStyle: {
    borderWidth: 0,
    borderBottomWidth: 1.2,
    borderBottomColor: `${theme.COLORS.BORDER_TEXT}90`,
    paddingLeft: 0,
    paddingBottom:2,
    borderRadius:0
  },
  dropdown: {
    backgroundColor: theme.COLORS.DEFAULT,
    borderWidth: 0,
    ...baseStyles.shadow_minimal,
    borderRadius: 5,
    marginTop: 3,
    paddingLeft: 5,
  },
});
