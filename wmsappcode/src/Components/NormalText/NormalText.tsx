import React from 'react';
import {View, Text} from 'react-native';
import styles from './NormalText.styles';
const NormalText = ({title}: {title: string}) => {
  return (
    <View style={styles.parent}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default NormalText;
