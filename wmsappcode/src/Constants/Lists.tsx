import Icon from 'react-native-vector-icons/Feather';
import React from 'react';
import theme from './theme';
//@ts-ignore
import RNCountry from "react-native-countries";
import {
  watch_in_hindi,
  watch_in_english,
  take_test,
  ask_doubt,
  download
} from '../Assets/Images';

export const SETTINGS = [
  {
    label: 'Feedback/issue Report',
    id: 1,
  },
  {
    label: 'Performance Analysis',
    id: 2,
  },
  {
    label: 'Download Settings',
    id: 3,
  },

  {
    label: 'Contact Us',
    id: 4,
  },
  {
    label: 'My Account',
    id: 5,
  },
  {
    label: 'Change Password',
    id: 6,
  },
  {
    label: 'Privacy Policy',
    id: 7,
  },
  {
    label: 'Terms & Conditions',
    id: 8,
  },
  {
    label: 'Logout',
    id: 9,
  },
];
export const CONTACTINFO = [
  {
    label: 'Email',
    value: 'Hello@ixambee.com',
    id: 1,
  },
  {
    label: 'Phone No',
    value: '+91-9205524028',
    id: 2,
  },
  {
    label: 'Whatsapp',
    value: '+91-9205524028',
    id: 3,
  },
];


export const allcontent_slider_one = [ 
  {icon: watch_in_hindi, text: 'Watch in Hindi'},
  {icon:   watch_in_english, text: 'Watch in English'},
  {icon: take_test, text: 'Take Test'},
  {icon: download, text: 'Download'},
  {icon: ask_doubt, text: 'Ask Doubt'}  
];

export const allcontent_tabs = [ 
  {tabname: 'tabone', tabtext: 'All Content'},
  {tabname: 'tabtwo', tabtext: 'Video'},
  {tabname: 'tabthree', tabtext: 'Notes'},
  {tabname: 'tabfour', tabtext: 'Practice Test'}
];
