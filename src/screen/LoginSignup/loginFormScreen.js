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
  ScrollView,
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
          <Text
            style={{
              fontSize: 48,
              color: '#000000',
              marginTop: 30,
              marginBottom: 40,
            }}>
            SmartVillage
          </Text>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              value={this.state.username}
              onChangeText={username => this.setState({username})}
              placeholder={'Email'}
              style={styles.inputText}
            />
          </View>
          <View style={{flexDirection: 'row', marginBottom: 30}}>
            <TextInput
              value={this.state.password}
              onChangeText={password => this.setState({password})}
              placeholder={'Password'}
              secureTextEntry={true}
              style={styles.inputText}
            />
          </View>
          <View style={styles.input}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={styles.btnlogin}
                onPress={() => Actions.HomeScreen()}>
                <Text style={styles.text}>MASUK</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text>Lupa Password?</Text>
        </View>
        <View style={styles.bawah}>
          <Text>Belum Punya Akun? Daftar disini</Text>
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
    backgroundColor: '#ffffff',
  },
  atas: {
    alignItems: 'center',
    justifyContent: 'center',

    marginBottom: 10,
    height: '70%',
  },
  bawah: {
    height: '30%',
  },
  inputText: {
    flex: 0.8,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  input: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  btnlogin: {
    flex: 1,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#64AB23',
    borderRadius: 6,
  },
  btndaftar: {
    width: 325,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#64AB23',
  },
  text: {
    color: '#ffffff',
  },
});
