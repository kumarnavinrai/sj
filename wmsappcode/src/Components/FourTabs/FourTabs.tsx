import React from 'react';
import {FC} from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import styles from './FourTabs.styles';
import { allcontent_tabs } from '../../Constants/Lists';


type props = {
  tabselected: any;
  tabclicked: any;
  onPress: () => void;
};
const FourTabs: FC<props> = ({
  tabselected,
  tabclicked,
}) => {
  return (
    
    <View style={styles.outerview}>
      <FlatList
        data={allcontent_tabs}
        horizontal={true}
        horizontal
        keyExtractor={({ id }, index) => id}
        renderItem= {({ item, index }) => (
          <View style={styles.segmentview}>
            <TouchableOpacity onPress={() => tabclicked(item.tabname)}>
                <Text style={tabselected === item.tabname?styles.selecttedtab:styles.notselecttedtab}>{item.tabtext}</Text>
            </TouchableOpacity>    
          </View>
      
        )}
      />
     
    </View>
  );
};

export default FourTabs;
