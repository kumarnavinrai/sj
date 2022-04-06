import React, {useEffect} from 'react';
import {
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { NavigationContainer } from '@react-navigation/native';
import SignIn from '../Pages/SignIn/SignIn';
import SplashScreen from '../Pages/SplashScreen/SplashScreen';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { options } from './navigation.styles';
import theme from '../Constants/theme';
import WaterLevel from '../Pages/WaterLevel/WaterLevel';
import CustomBottomBar from './CustomBottomBar/CustomBottomBar';
import Live from '../Pages/Live/Live';
import Motor from '../Pages/Motor/Motor';
import Alarm from '../Pages/Alarm/Alarm';
import Hotspot from '../Pages/Hotspot/Hotspot';
import Schedule from '../Pages/Schedule/Schedule';
import Settings from '../Pages/Settings/Settings';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CustomTopBar from './CustomTopBar/CustomTopBar';
import { styles } from './navigation.styles';
import MyAccount from '../Pages/MyAccount/MyAccount';
const TopTab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const OnboardingStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="splashscreen"
      screenOptions={{
        headerLeftContainerStyle: { marginLeft: theme.SIZES.small / 2 },
        headerBackImage: () => (
          <AntIcon
            name={'arrowleft'}
            size={theme.SIZES.large * 1.5}
            color={theme.COLORS.DEFAULT}
          />
        ),
      }}>
      <Stack.Screen
        name="splashscreen"
        component={SplashScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="signin"
        component={SignIn}
        options={{
          headerShown: false,
          headerBackImage: () => (
            <AntIcon
              name={'arrowleft'}
              size={theme.SIZES.large * 1.5}
              color={theme.COLORS.BLACK}
            />
          ),
          headerBackTitle: ' ',
          title: '',
          headerStyle: {
            ...options.headerStyle,
            height: Platform.OS === 'ios' ? hp('10%') : hp('8%'),
            borderWidth: 0,
            elevation: 0,
          },
          headerTintColor: options.headerTintColor, //Set Header text color
        }}
      />
      
     
    </Stack.Navigator>
  );
};

const DashboardStack = () => {
  return (
    <TopTab.Navigator
      tabBar={(props: any) => <CustomTopBar {...props} />}
      initialRouteName="waterlevel">
      <TopTab.Screen name="waterlevel" component={WaterLevel} />
      <TopTab.Screen name="setting" component={Settings} />
      <TopTab.Screen name="motor" component={Motor} />
      <TopTab.Screen name="live" component={Live} />
      <TopTab.Screen name="alarm" component={Alarm} />
      <TopTab.Screen name="hotspot" component={Hotspot} />
      <TopTab.Screen name="schedule" component={Schedule} />
    </TopTab.Navigator>
  );
};

const DashboardStackLive = () => {
  return (
    <TopTab.Navigator
      tabBar={(props: any) => <CustomTopBar {...props} />}
      initialRouteName="live">
      <TopTab.Screen name="waterlevel" component={WaterLevel} />
      <TopTab.Screen name="setting" component={Settings} />
      <TopTab.Screen name="motor" component={Motor} />
      <TopTab.Screen name="live" component={Live} />
      <TopTab.Screen name="alarm" component={Alarm} />
      <TopTab.Screen name="hotspot" component={Hotspot} />
      <TopTab.Screen name="schedule" component={Schedule} />
    </TopTab.Navigator>
  );
};

const DashboardStackMotor = () => {
  return (
    <TopTab.Navigator
      tabBar={(props: any) => <CustomTopBar {...props} />}
      initialRouteName="motor">
      <TopTab.Screen name="waterlevel" component={WaterLevel} />
      <TopTab.Screen name="setting" component={Settings} />
      <TopTab.Screen name="motor" component={Motor} />
      <TopTab.Screen name="live" component={Live} />
      <TopTab.Screen name="alarm" component={Alarm} />
      <TopTab.Screen name="hotspot" component={Hotspot} />
      <TopTab.Screen name="schedule" component={Schedule} />
    </TopTab.Navigator>
  );
};

const DashboardStackSettings = () => {
  return (
    <TopTab.Navigator
      tabBar={(props: any) => <CustomTopBar {...props} />}
      initialRouteName="setting">
      <TopTab.Screen name="waterlevel" component={WaterLevel} />
      <TopTab.Screen name="setting" component={Settings} />
      <TopTab.Screen name="motor" component={Motor} />
      <TopTab.Screen name="live" component={Live} />
      <TopTab.Screen name="alarm" component={Alarm} />
      <TopTab.Screen name="hotspot" component={Hotspot} />
      <TopTab.Screen name="schedule" component={Schedule} />
    </TopTab.Navigator>
  );
};


const BottomTabStack = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomBottomBar {...props} />}
      initialRouteName="dashboard">
      <Tab.Screen
        name="live"
        component={DashboardStackLive}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="motor"
        component={DashboardStackMotor}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="setting"
        component={DashboardStackSettings}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="dashboard"
        component={DashboardStack}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="entrance"
        screenOptions={{
          headerStyle: { elevation: 0 },
        }}>
        <Stack.Screen
          name="entrance"
          options={{ headerShown: false }}
          component={OnboardingStack}
        />
        <Stack.Screen
          name="main"
          options={{ headerShown: false }}
          component={BottomTabStack}
        />
        <Stack.Screen
          name="myaccount"
          options={{
            title: 'My Account',
            headerTitleStyle: styles.headerTitleStyle,
          }}
          component={MyAccount}
        />
       
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
