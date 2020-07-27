import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import axios from 'axios';
import MapView, {Marker, ProviderPropType} from 'react-native-maps';
import GetLocation from 'react-native-get-location';

const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
export default class autocompletete extends Component<props> {
  constructor(props) {
    console.disableYellowBox = true;
    super(props);
    this.state = {
      categories: [],
      films: [],
      query: '',
      pickervalue: 'All',
    };
  }
  static renderFilm(film) {
    const {nama_outlet} = film;
    return (
      <View>
        <Text style={styles.titleText}>{nama_outlet}</Text>

        <Text>
          asdasdasdasdsadasddasdasdasdasdasdsad asd asd asdasd asd asd asd as
        </Text>
        {console.log('kasdasdsds')}
      </View>
    );
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
              latuser +
              '&longitudeUser=' +
              lotuser +
              '&zoom=1' +
              '&klasifikasi=' +
              this.state.pickervalue,
          )
          .then(res => {
            const categories = res.data;
            console.log("asds"+categories);
            this.setState({categories});
          });
      })
      .catch(error => {
        const {code, message} = error;
      });
  }
  findFilm(query) {
    if (query === '') {
      return [];
    }

    const {categories} = this.state;
    const regex = new RegExp(`${query.trim()}`, 'i');
    return categories.filter(film => film.nama_outlet.search(regex) >= 0);
  }

  render() {
    const {query} = this.state;
    const categories = this.findFilm(query);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

    return (
      <View style={styles.container}>
        <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.autocompleteContainer}
          data={
            categories.length === 1 && comp(query, categories[0].nama_outlet)
              ? []
              : categories
          }
          defaultValue={query}
          onChangeText={text => this.setState({query: text})}
          placeholder="Enter Star Wars film title"
          renderItem={({nama_outlet}) => (
            <TouchableOpacity
              onPress={() => this.setState({query: nama_outlet})}>
              <Text style={styles.itemText}>{nama_outlet}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

autocompletete.propTypes = {
  provider: ProviderPropType,
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop: 25,
  },
  autocompleteContainer: {
    marginLeft: 10,
    marginRight: 10,
  },
  itemText: {
    fontSize: 15,
    margin: 2,
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
