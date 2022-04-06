import React from 'react';
import {FC} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from './BePediaItem.styles';
type props = {
  image: any;
  onPress: () => void;
};
const BePediaItem: FC<props> = ({image, onPress}) => {
  return (
    <TouchableOpacity style={styles.parent} onPress={onPress}>
      <Image
        source={typeof image === 'string' ? {uri: image} : image}
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

export default BePediaItem;
