import React from 'react';
import {FC} from 'react';
import {View, Text, Image} from 'react-native';
import styles from './BannerListItem.styles';
type props = {
  source: any;
};
const BannerListItem: FC<props> = ({source}) => {
  return (
    <View style={styles.parent}>
      <Image source={source} style={styles.image} />
    </View>
  );
};

export default BannerListItem;
