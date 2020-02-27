import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Alert,
  TouchableOpacity,
  TextInput,
  LayoutAnimation,
  Platform,
  UIManager,
  FlatList,
} from 'react-native';

import {ListItem} from 'react-native-elements';
import axios from 'axios';
import MapView, {Marker, ProviderPropType} from 'react-native-maps';
import GetLocation from 'react-native-get-location';
import {ClusterMap} from 'react-native-cluster-map';

const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = -8.6836902;
const LONGITUDE = 115.2237984;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
import {Actions} from 'react-native-router-flux'; // New code

export default class FindDriverScreen extends Component<props> {
  constructor(props) {
    super(props);
    this.state = {
      latuser: 0,
      lotuser: 0,
      categories: [],
    };
  }

  componentDidMount() {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 1000,
    })
      .then(location => {
        console.log(location);

        const latuser = location.latitude;
        this.setState({latuser});

        const lotuser = location.longitude;
        this.setState({lotuser});

        console.log(latuser.toFixed(5));
        console.log(lotuser.toFixed(5));
        axios
          .get(
            'http://10.67.98.238/apioutlet/get_all.php?latitudeUser=' +
              this.state.latuser +
              '&longitudeUser=' +
              this.state.lotuser +
              '&zoom=1',
          )
          .then(res => {
            const categories = res.data;
            console.log(categories);
            this.setState({categories});
          });
      })
      .catch(error => {
        const {code, message} = error;
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header} />
        {/* <MapView
          style={styles.map}>
          <MapView.Marker
            coordinate={{
              latitude: parseFloat(this.state.latuser),
              longitude: parseFloat(this.state.lotuser),
            }}
          />
        </MapView> */}

        <ClusterMap
          style={styles.map}
          showsUserLocation={true}
          showsMyLocationButton={true}
          userLocationPriority='high'
          region={{
            latitude: -8.6836902,
            longitude: 115.2237984,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {this.state.categories.map((mape, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: parseFloat(mape.latitude),
                longitude: parseFloat(mape.longitude),
              }}
              title={mape.nama_outlet}
            />
          ))}
        </ClusterMap>
        <Text style={styles.txtHeader}>
          {' '}
          {this.state.lotuser} Kategori Budaya {this.state.latuser}{' '}
        </Text>
      </View>
    );
  }
}

FindDriverScreen.propTypes = {
  provider: ProviderPropType,
};
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
  Kotakbawah: {
    width: '90%',
    padding: 10,
    margin: 10,
    borderRadius: 3,
  },
  KotakTitle: {
    backgroundColor: '#64AB23',
    width: '100%',
    padding: 10,
    borderRadius: 6,
  },
  KotakLocation: {
    backgroundColor: '#ffffff',
    width: '100%',
    padding: 10,
    marginTop: 5,
    borderRadius: 6,
  },

  inputText: {
    width: '100%',
    borderBottomWidth: 0.2,
  },
  contentbawah: {
    height: '10%',
    borderBottomWidth: 0.2,
  },
});
