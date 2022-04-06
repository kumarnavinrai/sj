import React from 'react';
import {TouchableOpacity} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import theme from '../../Constants/theme';
import styles from './CustomBottomBar.styles';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomBottomBar = ({state, descriptors, navigation}: any) => {
  return (
    <View style={styles.bottomMainBar}>
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
            style={[styles.tabStyle]}>
            <>
              {label === 'live' && (
                <>
                  <Icon
                    name="document-text"
                    color={
                      isFocused
                        ? theme.COLORS.PRIMARY
                        : theme.COLORS.BORDER_COLOR
                    }
                    size={25}
                  />
                  <Text
                    style={[
                      styles.labelStyle,
                      {
                        color: isFocused
                          ? theme.COLORS.PRIMARY
                          : theme.COLORS.INACTIVE_COLOR,
                      },
                    ]}>
                    Live
                  </Text>
                </>
              )}
              {label === 'motor' && (
                <>
                  <Icon
                    name="logo-youtube"
                    color={
                      isFocused
                        ? theme.COLORS.PRIMARY
                        : theme.COLORS.BORDER_COLOR
                    }
                    size={25}
                  />
                  <Text
                    style={[
                      styles.labelStyle,
                      {
                        color: isFocused
                          ? theme.COLORS.PRIMARY
                          : theme.COLORS.INACTIVE_COLOR,
                      },
                    ]}>
                    Motor
                  </Text>
                </>
              )}
              {label === 'setting' && (
                <>
                  <Icon
                    name="download"
                    color={
                      isFocused
                        ? theme.COLORS.PRIMARY
                        : theme.COLORS.BORDER_COLOR
                    }
                    size={25}
                  />
                  <Text
                    style={[
                      styles.labelStyle,
                      {
                        color: isFocused
                          ? theme.COLORS.PRIMARY
                          : theme.COLORS.INACTIVE_COLOR,
                      },
                    ]}>
                    Settings
                  </Text>
                </>
              )}
              {label === 'dashboard' && (
                <>
                  <Icon
                    name="search"
                    color={
                      isFocused
                        ? theme.COLORS.PRIMARY
                        : theme.COLORS.BORDER_COLOR
                    }
                    size={25}
                  />
                  <Text
                    style={[
                      styles.labelStyle,
                      {
                        color: isFocused
                          ? theme.COLORS.PRIMARY
                          : theme.COLORS.INACTIVE_COLOR,
                      },
                    ]}>
                    Dashboard
                  </Text>
                </>
              )}
            </>
          </TouchableRipple>
        );
      })}
    </View>
  );
};

export default CustomBottomBar;
