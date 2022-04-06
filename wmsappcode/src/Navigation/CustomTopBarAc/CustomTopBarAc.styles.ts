import {Platform, StyleSheet, Dimensions} from 'react-native';
import { red100 } from 'react-native-paper/lib/typescript/styles/colors';
import theme, {width} from '../../Constants/theme';
let deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  filter_icon: {
    height:27,
    width:27, 
    marginHorizontal: 5
  },
  search_icon: {
    height:25,
    width:25, 
    marginHorizontal: 5
  },
  icon_container: {
    flex:0.25, 
    flexDirection:'row'
  },
  labelStyle: {
    fontSize: theme.SIZES.small + 2,
    fontFamily: 'Montserrat-SemiBold',
    fontWeight: '700',
    color: theme.COLORS.DEFAULT,
  },
  titlestyle:{
    textAlign:'center', 
    color:'#fff', 
    fontFamily: 'Montserrat-Bold', 
    fontSize: 21, 
    fontWeight: 'bold', 
    lineHeight: 25
  },
  subParent: { 
    backgroundColor: '#1a448c', 
    width: deviceWidth - 70, 
    height: 55, 
    flex: 1, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  mainParent: {
    position: 'absolute',
    elevation: 1,
    height: '100%',
    zIndex: 1000,
    flex:1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a448c',
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
