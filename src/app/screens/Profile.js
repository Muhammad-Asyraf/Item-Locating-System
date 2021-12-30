// Components
import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import {
  Appbar,
  Button,
  Title,
  Text,
  Card,
  Headline,
  Subheading,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProfileImage from '../components/core/ProfileImage';

// Utilities
import auth from '@react-native-firebase/auth';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { removeUser } from '../redux/user/userSlice';

// Styling
import { Theme, GlobalStyle, TextStyle, AppbarStyle } from '../styles/Theme';

export default function Profile({ navigation }) {
  const dispatch = useDispatch();
  const { userObject } = useSelector((state) => state.user);

  const logout = () => {
    auth()
      .signOut()
      .then(() => {
        dispatch(removeUser());
        console.log('Signed out');
      });
  };

  const editProfile = () => {
    console.log('Open edit profile page');

    // Open ProfileEdit screen
    navigation.dangerouslyGetParent().navigate('Edit Profile', {});
  };

  return (
    <View style={GlobalStyle.screenContainer}>
      <Appbar.Header style={[AppbarStyle.transparent, AppbarStyle.padding]}>
        <Title style={[TextStyle.headline5]}>Profile</Title>
      </Appbar.Header>

      <View style={GlobalStyle.contentContainer}>
        <Card style={styles.profileCard}>
          <View style={styles.profileContainer}>
            <View>
              <ProfileImage style={styles.profileImage} />
            </View>
            <View style={styles.profileTextContainer}>
              <Text style={[TextStyle.subhead1, styles.profileText]}>
                {userObject.username}
              </Text>
              <Text style={[TextStyle.caption, styles.profileText]}>
                {userObject.email}
              </Text>
            </View>
            <Icon.Button
              name="edit"
              size={24}
              iconStyle={styles.profileEditIcon}
              backgroundColor="transparent"
              onPress={editProfile}
            ></Icon.Button>
          </View>
        </Card>

        <ScrollView style={styles.scrollViewContainer} scrollEnabled={false}>
          <Button onPress={logout}>Change Password</Button>
          <Button onPress={logout}>Log Out</Button>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  scrollViewContainer: {
    marginTop: 18,
  },
  profileCard: {
    padding: 16,
    backgroundColor: Theme.colors.primary,
  },
  profileContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileImage: {
    height: 56,
    width: 56,
    borderRadius: 1000,
  },
  profileTextContainer: {
    justifyContent: 'center',
    marginHorizontal: 16,
    marginVertical: 16,
  },
  profileText: {
    color: 'white',
    textAlign: 'center',
  },
  profileEditIcon: {
    marginRight: 0,
    alignSelf: 'center',
  },
});
