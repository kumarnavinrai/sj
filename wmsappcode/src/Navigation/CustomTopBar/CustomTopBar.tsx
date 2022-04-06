import React from 'react';
import styles from './CustomTopBar.styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import theme from '../../Constants/theme';
const CustomTopBar = ({state, descriptors, navigation}: any) => {
  return (
    <ScrollView
      style={styles.mainParent}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.bottomMainBar}>
      {state.routes.map((route: any, index: any) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: false,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableRipple
            key={route.name}
            rippleColor={`${theme.COLORS.PRIMARY}70`}
            borderless={true}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[
              styles.tabStyle,
              {
                backgroundColor: isFocused ? theme.COLORS.PRIMARY : `#dddddd`,
              },
            ]}>
            <>
              {label === 'waterlevel' && (
                <Text style={[styles.labelStyle]}>Level</Text>
              )}
              {label === 'live' && (
                <Text style={[styles.labelStyle]}>Live</Text>
              )}
              {label === 'motor' && (
                <Text style={[styles.labelStyle]}>Motor</Text>
              )}
              {label === 'setting' && (
                <Text style={[styles.labelStyle]}>Setting</Text>
              )}
              {label === 'schedule' && (
                <Text style={[styles.labelStyle]}>Schedule</Text>
              )}
              {label === 'alarm' && (
                <Text style={[styles.labelStyle]}>Alarm</Text>
              )}
              {label === 'hotspot' && (
                <Text style={[styles.labelStyle]}>Hot Spot</Text>
              )}
            </>
          </TouchableRipple>
        );
      })}
    </ScrollView>
  );
};

export default CustomTopBar;
