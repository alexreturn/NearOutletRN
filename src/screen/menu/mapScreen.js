import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  Alert,
  TouchableOpacity,
  TextInput,
  LayoutAnimation,
  Platform,
  UIManager,
  FlatList,
  SafeAreaView,
  StatusBar,
  Picker,AsyncStorage
} from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import {ListItem} from 'react-native-elements';
import axios from 'axios';
import MapView, {Marker, ProviderPropType} from 'react-native-maps';
import GetLocation from 'react-native-get-location';
import {ClusterMap} from 'react-native-cluster-map';
import RNPickerSelect from 'react-native-picker-select';
import {Actions} from 'react-native-router-flux'; // New code

const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = -8.6836902;
const LONGITUDE = 115.2237984;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class FindDriverScreen extends Component<props> {
  constructor(props) {
    console.disableYellowBox = true;
    super(props);
    this.state = {
      latuser: 0,
      lotuser: 0,
      categories: [],
      films: [],
      query: '',
      namaOutlet: '',
      idOutlet: '',
      klasOutlet: '',
      isHidden: true,
      pickervalue: 'All',
      statusklik: false,
    };
  }

  componentDidMount() {
    this.setState({categories: []});

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
              latuser +
              '&longitudeUser=' +
              lotuser +
              '&zoom=1' +
              '&klasifikasi=' +
              this.state.pickervalue,
          )
          .then(res => {
            const categories = res.data;
            console.log(categories.length + this.state.pickervalue);
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
        <ClusterMap
          style={styles.map}
          showsUserLocation={true}
          showsMyLocationButton={true}
          userLocationPriority="high"
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
              onPress={() => {
                this.setState({namaOutlet: mape.nama_outlet}),
                  this.setState({idOutlet: mape.id_outlet_digipos}),
                  this.setState({klasOutlet: mape.klasifikasi}),
                  AsyncStorage.setItem('idOutlet', mape.id_outlet_digipos);
                  this.setState({statusklik: true});
              }}
              title={mape.nama_outlet}
              description={mape.distance_KM}>
              <View style={styles.markersnya}>
                <Text>{mape.nama_outlet}</Text>
                <Text>{mape.distance_KM} KM</Text>
              </View>
              {mape.klasifikasi == 'BRONZE' ? (
                <Image source={require('../../image/place_24px_bronze.png')} />
              ) : mape.klasifikasi == 'PLATINUM' ? (
                <Image
                  source={require('../../image/place_24px_platinum.png')}
                />
              ) : mape.klasifikasi == 'SILVER' ? (
                <Image source={require('../../image/place_24px_silver.png')} />
              ) : (
                <Image source={require('../../image/place_24px.png')} />
              )}
            </Marker>
          ))}
        </ClusterMap>

        <View style={styles.KotakAtas}>
          <Autocomplete
            containerStyle={styles.autocompleteContainer}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Find Outlet"
          />
          <RNPickerSelect
            onValueChange={pickervalue => this.setState({pickervalue})}
            onDonePress={this.handleChange}
            placeholder={{
              label: 'All Classification',
              value: 'All',
              color: 'red',
            }}
            items={[
              {label: 'PLATINUM', value: 'PLATINUM'},
              {label: 'SILVER', value: 'SILVER'},
              {label: 'BRONZE', value: 'BRONZE'},
            ]}
          />
        </View>
        {this.state.statusklik == true ? (
          <View style={styles.Kotakbawah}>
            <View style={styles.flexRow}>
              <Text style={{fontSize: 10, color: '#000000'}}>Nama Outlet </Text>
              <TouchableOpacity
                onPress={() => this.setState({statusklik: false})}>
                <Text style={{fontSize: 12, color: '#000000'}}>(X) Close</Text>
              </TouchableOpacity>
            </View>
            <Text style={{fontSize: 30, color: '#000000'}}>
              {this.state.namaOutlet}
            </Text>
            <View style={{height: 3, backgroundColor: '#f1f1f1'}} />

            <View style={styles.input}>
              <TouchableOpacity
                style={styles.btnDetail}
                onPress={() =>
                  Actions.tabbar({
                    paramNama: this.state.namaOutlet,
                    paramId: this.state.idOutlet,
                    hideNavBar: false,
                  })
                }>
                <Text style={styles.text}>Detail Outlet</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <Text />
        )}
      </View>
    );
  }
}

FindDriverScreen.propTypes = {
  provider: ProviderPropType,
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  flexRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'space-between',
  },
  markersnya: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
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
  PickerStyle: {
    backgroundColor: 'transparent',
    borderTopWidth: 10,
    borderTopColor: 'gray',
    borderRightWidth: 10,
    borderRightColor: 'transparent',
    borderLeftWidth: 10,
    borderLeftColor: 'transparent',
    width: 0,
    height: 0,
  },
  txtHeader: {
    height: 33,
  },
  autocompleteContainer: {
    borderRadius: 20,
    borderColor: '#f1f1f1',
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
  KotakAtas: {
    width: '90%',
    height: 120,
    padding: 10,
    position: 'absolute', //Here is the trick
    margin: 20,
    backgroundColor: '#ffffff',
    borderColor: '#f1f1f1',
    borderWidth: 2,
    borderRadius: 20,
  },
  Kotakbawah: {
    width: '90%',
    height: 120,
    backgroundColor: '#ffffff',
    padding: 10,
    position: 'absolute', //Here is the trick
    bottom: 0, //Here is the trick
    margin: 20,
    borderColor: '#f1f1f1',
    borderWidth: 2,
    borderRadius: 20,
  },

  input: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnDetail: {
    width: 325,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#64AB23',
    borderRadius: 6,
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
  text: {
    color: '#ffffff',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
