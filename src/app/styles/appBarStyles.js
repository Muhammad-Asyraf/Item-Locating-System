import { StyleSheet } from 'react-native';

export const appBarStyles = StyleSheet.create({
  appBarContainer: {
    backgroundColor: 'white',
    padding: 0,
    zIndex: 1,
  },
  appBarSearchbar: {
    elevation: 0,
    backgroundColor: '#F5F5F5',
    height: 40,
    flexGrow: 1,
    margin: 12,
  },
  appBarTitle: {
    fontSize: 18,
    color: '#007AFF',
    marginLeft: 18,
  },
});
