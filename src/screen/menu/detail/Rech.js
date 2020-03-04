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
       
        <LineChart
          data={{
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                ],
              },
            ],
          }}
          width={Dimensions.get('window').width} // from react-native
          height={220}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />

       
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
