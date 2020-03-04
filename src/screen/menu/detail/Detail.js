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
            <Text>Nama Outlet : {item.nama_outlet}</Text>
            <Text>Tanggal Register : {item.tgl_register}</Text>
            <Text>MSISDN Outlet : {item.msisdn_konfirmasi}</Text>
            <Text>Kategori : {item.kategori}</Text>
            <Text>Tipe Outlet : {item.tipe_outlet}</Text>
            <Text>Tipe Lokasi : {item.tipe_lokasi}</Text>
            <Text>Jadwal Kunjungan : {item.jadwal_kunjungan}</Text>
            <Text>Terakhir Kunjungan: {item.tgl_terakhir_kunjungan}</Text>
            <Text>Tgl Terakhir Sales : {item.tgl_terakhir_sales}</Text>
            <Text>
              Jumlah Trx Sales Perdana : {item.jumlah_trx_sales_perdana}
            </Text>
            <Text>SF code :{item.sf_code}</Text>
            <Text>Jumlah RS :{item.jumlah_rs}</Text>
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
});
