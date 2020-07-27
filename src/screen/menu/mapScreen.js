import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  Alert,
  Button,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TextInput,
  LayoutAnimation,
  Platform,
  UIManager,
  FlatList,
  SafeAreaView,
  StatusBar,
  Picker,ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import {ListItem} from 'react-native-elements';
import axios from 'axios';
import MapView, {Marker, ProviderPropType} from 'react-native-maps';
import {ClusterMap} from 'react-native-cluster-map';
import RNPickerSelect from 'react-native-picker-select';
import {Actions} from 'react-native-router-flux'; // New code
import {Icon} from 'react-native-elements';
import GetLocation from '@react-native-community/geolocation';

import {requestMultiple, PERMISSIONS} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';

const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
// const LATITUDE = -8.6836902;
// const LONGITUDE = 115.2237984;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const API = 'https://swapi.co/api';
const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

export default class FindDriverScreen extends Component {
  constructor(props) {
    console.disableYellowBox = true;
    super(props);
    this.state = {
      latuser: -8.6836902,
      lotuser:  115.2237984,
      categories: [],
      films: [],
      query: '',
      namaOutlet: '',
      idOutlet: '',
      klasOutlet: '',
      isHidden: true,
      pickervalue: 'All',
      statusklik: false,
      loading:true,
    };
  }
  renderRightButton = () => {
    return(
        <TouchableOpacity onPress={() => null } >
           <Text>asdsads</Text>
        </TouchableOpacity>
    );
};
  componentDidMount() {
    Actions.refresh({ renderRightButton: this.renderRightButton });
    requestMultiple([PERMISSIONS.IOS.LOCATION_ALWAYS,PERMISSIONS.IOS.LOCATION_WHEN_IN_USE, 
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION]).then(
      (statuses) => {
      },
    );
    console.log('latuser');


    Geolocation.getCurrentPosition(      
       
      (position) => {
         
          console.log(position);

          //  latuser = position.coords.latitude;
          //  lotuser = position.coords.longitude;
  
          this.setState({latuser:position.coords.latitude});
          this.setState({lotuser:position.coords.longitude});
          
      },
      (error) => {
          // See error code charts below.
          console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
   
    // GetLocation.getCurrentPosition(
    //   position => {
    //     console.log(position);
    //     const latuser = position.coords.latitude;
    //     const lotuser = position.coords.longitude;
    //     console.log(latuser);
    //   },
    //   error => Alert.alert('Error', JSON.stringify(error)),
    //   {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    // );

    // this.watchID = GetLocation.watchPosition(position => {
    //   this.setState({categories: []});
    //   const lastPosition = JSON.stringify(position);
    //   console.log('LAST POSISI ' + lastPosition);
    //   this.setState({lastPosition});
    // });

    this.getData();

  }

getData(){

// this.setState({loading:false})
console.log("asdsads");
  this.setState({categories: []});

  setTimeout(() => {
   
    
  axios
  .get(
    'http://10.67.98.238/apioutlet/get_all.php?latitudeUser=' +
      this.state.latuser +
      '&longitudeUser=' +
      this.state.lotuser +
      '&zoom=1' +
      '&klasifikasi=' +
      this.state.pickervalue,
  )
  .then(res => {

    categories = res.data;
    console.log(this.state.categories);
    this.setState({categories,loading:false});


  });

}, 1000);

}

  updatelocation() {
    console.log('asdsad');
  }
  findFilm(query) {
    if (query === '') {
      return [];
    }

    const {categories} = this.state;
    // console.log(categories[1].id_outlet_digipos);
    const regex = new RegExp(`${query.trim()}`, 'i');
    return categories.filter(
      categorie => categorie.nama_outlet.search(regex) >= 0,
    );
  }

  render() {
    const {query} = this.state;
    const categories = this.findFilm(query);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
    return (
      <View style={styles.container}>
        
        {/* ///////////////////////// MAPS /////////////////////////////////// */}
        <ClusterMap
          style={styles.map}
          showsUserLocation={true}
          showsMyLocationButton={true}
          userLocationPriority="high"
          region={{
            latitude: parseFloat(this.state.latuser),
            longitude: parseFloat(this.state.lotuser),
            latitudeDelta: 1.192,
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
        {/* ///////////////////////// KOTAK ATAS /////////////////////////////////// */}
        {this.state.loading===true?
          <View  style={{zIndex: 1,position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          alignItems: 'center',
          zIndex: 1,
          backgroundColor:'#C4C4C499',
          justifyContent: 'center'}}>
            <View style={{backgroundColor:'#ffffff',height:80,width:150,padding:5, margin:5}}>
              <ActivityIndicator size="large" color="#0000ff"/>
              <Text>Tunggu sebentar yaa..</Text>
              </View>
       </View>
       :
       <View></View>  
      }
        <View style={styles.KotakAtas}>
          
          <RNPickerSelect
            style={{top: 20,color: '#000000'}}
            onValueChange={pickervalue => this.setState({pickervalue})}
            onDonePress={this.handleChange}
            placeholder={{
              label: 'All Classification',
              value: 'All',
              color: 'red',
            }}
            items={[
              {label: 'PLATINUM', value: 'PLATINUM',color: '#000000',labelColor:'black'},
              {label: 'SILVER', value: 'SILVER',color: '#000000',labelColor:'black'},
              {label: 'BRONZE', value: 'BRONZE',color: '#000000',labelColor:'black'},
            ]}
          />
        </View>

       
        <View style={{position: 'absolute', end: 10, top: 100, zIndex: 90}}>
          <TouchableOpacity  onPress={() => this.getData()}>
          <Icon
            raised
            name="location-arrow"
            type="font-awesome"
            color="black"
           
          />
          </TouchableOpacity>
        </View>

        <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode={'always'}
          containerStyle={styles.autocompleteContainer}
          data={
            categories.length === 1 && comp(query, categories[0].nama_outlet)
              ? []
              : categories
          }
          defaultValue={query}
          keyExtractor={(item, index) => index.toString()}
          onChangeText={text => this.setState({query: text, statusklik: false})}
          placeholder="Find Near Outlet"
          renderItem={({item, index}) => (
            <View style={{zIndex: 2}}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    query: item.nama_outlet,
                  });
                }}>
                <Text style={styles.inputText}>{item.nama_outlet}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
        
        {/* ///////////////////////// KOTAK BAWAH /////////////////////////////////// */}
        {this.state.statusklik == true ? (
          <View style={styles.Kotakbawah}>
            <View style={styles.flexRow}>
              <Text style={{fontSize: 10, color: '#000000'}}>Nama Outlet </Text>
              <Button
                title="X"
                style={{zIndex: 4, width: 15, height: 15}}
                onPress={() => this.setState({statusklik: false})}
              />
            </View>
            <Text style={{fontSize: 18, color: '#000000'}}>
              {this.state.namaOutlet}
            </Text>
            <Text style={{fontSize: 12, color: '#c4c4c4'}}>
              Last Visit : {this.state.tgl_terakhir_kunjungan}
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
    zIndex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
    flex: 2,
    position: 'absolute',
    zIndex: 1,
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
    flex: 1,
    width: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 4,
  },
  acContainerStyle: {
    right: 0,
    top: 102,
    width: '72%',
    flex: 1,
    position: 'absolute',
    zIndex: 10,
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
    zIndex: 3,
    flexDirection: 'column-reverse',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    height: 90,
    backgroundColor: '#ffffff',
    borderColor: '#f1f1f1',
    borderBottomLeftRadius: 20,

    borderBottomRightRadius: 20,
  },
  Kotakbawah: {
    width: '90%',
    height: 140,
    backgroundColor: '#ffffff',
    padding: 10,
    position: 'absolute', //Here is the trick
    bottom: 0, //Here is the trick
    margin: 20,
    borderColor: '#f1f1f1',
    borderWidth: 2,
    borderRadius: 20,
    zIndex: 3,
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
    flex: 1,
    position: 'relative',
    width: '100%',
    height: '100%',
    borderBottomWidth: 0.2,
    zIndex: 0,
  },
  contentbawah: {
    height: '10%',
    borderBottomWidth: 0.2,
  },
  text: {
    color: '#ffffff',
  },
  itemText: {
    backgroundColor: 'red',
    fontSize: 15,
    margin: 2,
    flex: 1,
    zIndex: 10,
    position: 'relative',
  },
  descriptionContainer: {
    // `backgroundColor` needs to be set otherwise the
    // autocomplete input will disappear on text input.
    backgroundColor: '#F5FCFF',
    marginTop: 8,
  },
  infoText: {
    textAlign: 'center',
  },
  titleText: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center',
  },
  directorText: {
    color: 'grey',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center',
  },
  openingText: {
    textAlign: 'center',
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
