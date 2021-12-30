import { DefaultTheme } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export const Theme = {
  ...DefaultTheme,
  dark: true,
  mode: 'adaptive',
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: '#007FFF',
    accent: '#003366',
    background: '#FFFFFF',
    text: '#001933',
    placeholder: 'rgba(0,25,51,0.5)',
  },
};

export const GlobalStyle = StyleSheet.create({
  screenContainer: {
    flexGrow: 1,
    height: '100%',
    backgroundColor: '#F5F5F5',
  },
  searchBar: {
    marginHorizontal: 18,
    marginVertical: 24,
    flexGrow: 1,
    elevation: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 22,
    paddingVertical: 18,
  },
  flatGrid: {
    marginHorizontal: 8,
  },
});

export const TextStyle = StyleSheet.create({
  display1: {
    fontFamily: 'Roboto_400Regular',
    fontStyle: 'normal',
    fontSize: 64,
    lineHeight: 76,
    letterSpacing: -0.5,
  },
  display2: {
    fontFamily: 'Roboto_400Regular',
    fontStyle: 'normal',
    fontSize: 57,
    lineHeight: 64,
    letterSpacing: -0.25,
  },
  display3: {
    fontFamily: 'Roboto_400Regular',
    fontStyle: 'normal',
    fontSize: 45,
    lineHeight: 52,
    letterSpacing: 0,
  },
  headline1: {
    fontFamily: 'Inter_400Regular',
    fontStyle: 'normal',
    fontSize: 36,
    lineHeight: 44,
    letterSpacing: 0,
  },
  headline2: {
    fontFamily: 'Inter_400Regular',
    fontStyle: 'normal',
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: 0,
  },
  headline3: {
    fontFamily: 'Inter_400Regular',
    fontStyle: 'normal',
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: 0,
  },
  headline4: {
    fontFamily: 'Inter_400Regular',
    fontStyle: 'normal',
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: 0,
  },
  headline5: {
    fontFamily: 'Inter_400Regular',
    fontStyle: 'normal',
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: 0,
  },
  headline6: {
    fontFamily: 'Inter_400Regular',
    fontStyle: 'normal',
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0,
  },
  subhead1: {
    fontFamily: 'Inter_500Medium',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.1,
  },
  subhead2: {
    fontFamily: 'Inter_500Medium',
    fontStyle: 'normal',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  button: {
    fontFamily: 'Roboto_500Medium',
    fontStyle: 'normal',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  body1: {
    fontFamily: 'Roboto_400Regular',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
  },
  body2: {
    fontFamily: 'Roboto_400Regular',
    fontStyle: 'normal',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.25,
  },
  caption: {
    fontFamily: 'Roboto_400Regular',
    fontStyle: 'normal',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.4,
  },
  overline1: {
    fontFamily: 'Roboto_500Medium',
    fontStyle: 'normal',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  overline2: {
    fontFamily: 'Inter_500Medium',
    fontStyle: 'normal',
    fontSize: 10,
    lineHeight: 16,
    letterSpacing: 0.5,
  },
});

export const AppbarStyle = StyleSheet.create({
  transparent: {
    elevation: 0,
    backgroundColor: 'transparent',
  },
  padding: {
    paddingLeft: 20,
  },
  appBarContainer: {
    backgroundColor: Theme.colors.primary,
    padding: 0,
  },
  appBarSearchbar: {
    elevation: 0,
    backgroundColor: '#F5F5F5',
    height: 40,
    flexGrow: 1,
    margin: 12,
  },
  appBarTitle: {
    flexGrow: 1,
    fontSize: 18,
    color: 'white',
    marginLeft: 18,
  },
});
