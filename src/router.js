import React from 'react';
import {Drawer, Router, Scene, Tabs} from 'react-native-router-flux';

import {StyleSheet, Text} from 'react-native';

import LoginScreen from './screen/LoginSignup/loginScreen';
import MapScreen from './screen/menu/mapScreen';
//import signupScreen from './screen/LoginSignup/signupScreen';
import detailScreen from './screen/menu/detail/Detail';

import DetailScreen from './screen/menu/detail/Detail';

import RechScreen from './screen/menu/detail/Rech';

//import SplashScreen from './screen/LoginSignup/splashScreen';

const TabIcon = ({selected, title}) => {
  return <Text style={{color: selected ? 'red' : 'black'}}>{title}</Text>;
};

const AppRouter = () => (
  <Router
    navigationBarStyle={styles.navBar}
    titleStyle={styles.navBarTitle}
    barButtonTextStyle={styles.barButtonTextStyle}
    barButtonIconStyle={styles.barButtonIconStyle}
    tintColor="#ffffff">
    <Scene key="root">
      <Scene
        key="Maps"
        component={MapScreen}
        title="NeRo - Nearby Outlet"
        initial
        hideNavBar={false}
      />
      <Scene
        key="DetailScreen"
        component={DetailScreen}
        title="Detail Outlet"
        hideNavBar={false}
      />
      <Scene tabBarPosition="top" key="tabbar" tabs tabBarStyle={styles.tabBar}>
        <Scene key="Detail" title="Detail" icon={TabIcon}>
          <Scene
            key="DetailScreen1"
            component={DetailScreen}
            hideNavBar={true}
          />
        </Scene>
        <Scene key="Detail1" title="Detail1" icon={TabIcon}>
          <Scene
            key="DetailScreen2"
            component={DetailScreen}
            hideNavBar={true}
          />
        </Scene>
        <Scene key="Detail2" title="Detail2" icon={TabIcon}>
          <Scene
            key="DetailScreen3"
            component={DetailScreen}
            hideNavBar={true}
          />
        </Scene>
        <Scene key="Recass" title="Recass" icon={TabIcon}>
          <Scene key="RechScreen" component={RechScreen} hideNavBar={true} />
        </Scene>
      </Scene>
    </Scene>
  </Router>
);
const styles = StyleSheet.create({
  navBar: {
    backgroundColor: '#B90606',
  },
  navBarTitle: {
    color: '#ffffff',
  },
  barButtonTextStyle: {
    color: '#000000',
  },
  barButtonIconStyle: {
    tintColor: 'rgb(0,0,255)',
  },
  tabBar: {
    height: 50,
    borderTopColor: '#B90606',
    borderTopWidth: 1,
    backgroundColor: '#B90606',
    opacity: 0.98,
    justifyContent: 'space-between',
  },
});

export default AppRouter;
