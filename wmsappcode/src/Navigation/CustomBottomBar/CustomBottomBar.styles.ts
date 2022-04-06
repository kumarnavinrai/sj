import {Platform, StyleSheet} from 'react-native';
import theme, {width} from '../../Constants/theme';

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: theme.SIZES.small + 2,
    fontFamily: 'Montserrat-Regular',
  },

  bottomMainBar: {
    flexDirection: 'row',
    width: width,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: theme.COLORS.DEFAULT,
    elevation: 5,
    paddingVertical: theme.SIZES.small / 2,
  },
  tabStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: theme.SIZES.large,
    borderRadius: 7,
    padding: 2,
  },
});

export default styles;
