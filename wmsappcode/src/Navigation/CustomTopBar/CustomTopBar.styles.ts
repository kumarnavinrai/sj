import {Platform, StyleSheet} from 'react-native';
import theme, {width} from '../../Constants/theme';

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: theme.SIZES.small + 2,
    fontFamily: 'Montserrat-SemiBold',
    fontWeight: '700',
    color: theme.COLORS.DEFAULT,
  },
  mainParent: {
    position: 'absolute',
    elevation: 1,
    zIndex: 1000,
  },
  bottomMainBar: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    paddingVertical: theme.SIZES.large,
  },
  tabStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: theme.SIZES.small,
    borderRadius: 25,
    paddingHorizontal: theme.SIZES.small + 2,
    paddingVertical: theme.SIZES.small,
  },
});

export default styles;
