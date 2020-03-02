import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  ImageBackground,
  Button,
  TextInput,
} from 'react-native';

import {Actions} from 'react-native-router-flux'; // New code
export default class loginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.atas}>
          <Text style={{fontSize: 48, color: '#ffffff', marginTop: 60}}>
            SmartVillage
          </Text>
        </View>
        <View style={styles.bawah}>
          <View style={styles.input}>
            <TouchableOpacity
              style={styles.btnlogin}
              onPress={() => Actions.LoginForm()}>
              <Text style={styles.text}>LOGIN</Text>
            </TouchableOpacity>
          </View>
          <Text />
          <View style={styles.input}>
            <TouchableOpacity
              style={styles.btndaftar}
              onPress={() => Actions.SignUp()}>
              <Text style={styles.text}>DAFTAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2D3C4D',
  },
  atas: {
    alignItems: 'center',
    height: '70%',
  },
  bawah: {
    height: '30%',
  },
  input: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnlogin: {
    width: 325,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6784B3',
    borderRadius: 6,
  },
  btndaftar: {
    width: 325,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#64AB23',
    borderRadius: 6,
  },
  text: {
    color: '#ffffff',
  },
});
