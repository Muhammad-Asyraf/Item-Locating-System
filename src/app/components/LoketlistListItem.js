// Components
import React from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { Text } from 'react-native-paper';
import SmallTextChip from './core/SmallTextChip';

// Styling
import { TextStyle } from '../styles/Theme';

export default function LoketlistListItem({ item, store_count }) {
  const image = { uri: 'https://tinyurl.com/cu8nm69m' };

  return (
    <ImageBackground source={image} style={styles.listItemContainer}>
      <View style={styles.horizontalContainer}>
        <Text style={[TextStyle.headline5, styles.title]}>{item.name}</Text>
        <Text style={[TextStyle.subhead2, styles.storeCount]}>
          {store_count} stores in route
        </Text>
      </View>
      <View style={styles.horizontalContainer}>
        <Text style={[TextStyle.subhead2, styles.updatedAt]}>
          Recently added
        </Text>
        <SmallTextChip text={'RM350.00'} fill={true} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  listItemContainer: {
    paddingTop: 64,
    paddingHorizontal: 12,
    paddingBottom: 12,
    marginBottom: 18,
    borderRadius: 4,
    overflow: 'hidden',
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 2,
  },
  title: {
    color: 'white',
  },
  storeCount: {
    color: 'white',
  },
  updatedAt: {
    color: 'white',
  },
});
