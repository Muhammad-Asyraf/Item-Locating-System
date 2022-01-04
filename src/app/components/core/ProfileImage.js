import React from 'react';
import { Image, StyleSheet } from 'react-native';
import person from '../../assets/icons/person.png';

export default ProfileImage = (props) => {
  return (
    <Image {...props} source={{ uri: Image.resolveAssetSource(person).uri }} />
  );
};
