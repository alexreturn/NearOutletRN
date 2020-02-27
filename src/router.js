import React from 'react';
import {Drawer, Router, Scene} from 'react-native-router-flux';

import {StyleSheet} from 'react-native';

import LoginScreen from './screen/LoginSignup/loginScreen';
import MapScreen from './screen/menu/mapScreen';
//import signupScreen from './screen/LoginSignup/signupScreen';
//import LoginFormScreen from './screen/LoginSignup/loginFormScreen';

//import HomeScreen from './screen/Menu/AppMenu';

//import SplashScreen from './screen/LoginSignup/splashScreen';

const AppRouter = () => (
  <Router
    navigationBarStyle={styles.navBar}
    titleStyle={styles.navBarTitle}
    barButtonTextStyle={styles.barButtonTextStyle}
    barButtonIconStyle={styles.barButtonIconStyle}
    tintColor="#ffffff">
    <Scene key="root">
      <Scene
        key="Login"
        component={MapScreen}
        title="Login"
        initial
        hideNavBar={true}
      />
      {/* <Scene
        key="LoginForm"
        component={LoginFormScreen}
        title="SignUp"
        hideNavBar={true}
      />

      <Scene
        key="HomeScreen"
        component={HomeScreen}
        title="HomeScreen"
        hideNavBar={true}
      /> */}
      {/* <Scene key="SignUp" component={signupScreen} title="SignUp" /> */}
    </Scene>
  </Router>
);
const styles = StyleSheet.create({
  navBar: {
    backgroundColor: '#2D3C4D',
  },
  navBarTitle: {
    color: '#FFFFFF',
  },
  barButtonTextStyle: {
    color: '#FFFFFF',
  },
  barButtonIconStyle: {
    tintColor: 'rgb(255,255,255)',
  },
});

export default AppRouter;
