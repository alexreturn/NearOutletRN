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
  Dimensions,
  AsyncStorage,
} from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';

import axios from 'axios';
import {Actions} from 'react-native-router-flux'; // New code

const screenWidth = Dimensions.get('window').width;

export default class loginScreen extends Component<props> {
  constructor(props) {
    console.disableYellowBox = true;
    super(props);
    this.state = {
      detailOutlet: [],
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('idOutlet', (error, result) => {
      if (result) {
        this.setState({
          name: result,
        });

        axios
          .get(
            'http://10.67.98.238/apioutlet/get_detail.php?id_outlet_digipos=' +
              result,
          )
          .then(res => {
            const detailOutlet = res.data;
            console.log(+detailOutlet);
            this.setState({detailOutlet});
          });
      }
    });
  }

  render() {
    const {detailOutlet} = this.state;

    return (
      <View style={styles.container}>
        {detailOutlet.map(item => (
          <View>
            <View style={styles.barnya}>
              <View style={styles.leftContainer}>
                <Text>Nama Outlet </Text>
              </View>
              <View style={styles.rightContainer}>
                <Text>: {item.nama_outlet}</Text>
              </View>
            </View>

            <View style={styles.barnya}>
              <View style={styles.leftContainer}>
                <Text>Tanggal Register </Text>
              </View>
              <View style={styles.rightContainer}>
                <Text>: {item.tgl_register}</Text>
              </View>
            </View>
            <View style={styles.barnya}>
              <View style={styles.leftContainer}>
                <Text>MSISDN Outlet </Text>
              </View>
              <View style={styles.rightContainer}>
                <Text>: {item.msisdn_konfirmasi}</Text>
              </View>
            </View>

            <View style={styles.barnya}>
              <View style={styles.leftContainer}>
                <Text>Kategori </Text>
              </View>
              <View style={styles.rightContainer}>
                <Text>: {item.kategori}</Text>
              </View>
            </View>

            <View style={styles.barnya}>
              <View style={styles.leftContainer}>
                <Text>Tipe Outlet </Text>
              </View>
              <View style={styles.rightContainer}>
                <Text>: {item.tipe_outlet}</Text>
              </View>
            </View>
            <View style={styles.barnya}>
              <View style={styles.leftContainer}>
                <Text>Tipe Lokasi </Text>
              </View>
              <View style={styles.rightContainer}>
                <Text>: {item.tipe_lokasi}</Text>
              </View>
            </View>
            <View style={styles.barnya}>
              <View style={styles.leftContainer}>
                <Text>Jadwal Kunjungan </Text>
              </View>
              <View style={styles.rightContainer}>
                <Text>: {item.jadwal_kunjungan}</Text>
              </View>
            </View>
            <View style={styles.barnya}>
              <View style={styles.leftContainer}>
                <Text>Terakhir Kunjungan</Text>
              </View>
              <View style={styles.rightContainer}>
                <Text>: {item.tgl_terakhir_kunjungan}</Text>
              </View>
            </View>
            <View style={styles.barnya}>
              <View style={styles.leftContainer}>
                <Text>Tgl Terakhir Sales</Text>
              </View>
              <View style={styles.rightContainer}>
                <Text>: {item.tgl_terakhir_sales}</Text>
              </View>
            </View>
            <View style={styles.barnya}>
              <View style={styles.leftContainer}>
                <Text>Jumlah Trx Sales Perdana</Text>
              </View>
              <View style={styles.rightContainer}>
                <Text>: {item.jumlah_trx_sales_perdana}</Text>
              </View>
            </View>

            <View style={styles.barnya}>
              <View style={styles.leftContainer}>
                <Text>SF code</Text>
              </View>
              <View style={styles.rightContainer}>
                <Text>: {item.sf_code}</Text>
              </View>
            </View>
            <View style={styles.barnya}>
              <View style={styles.leftContainer}>
                <Text>Jumlah RS</Text>
              </View>
              <View style={styles.rightContainer}>
                <Text>: {item.jumlah_rs}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    padding: 10,
  },
  barnya: {
    height: 40,
    flexDirection: 'row',
    alignContent: 'stretch',
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
  },
});
