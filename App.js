import React from 'react';
import { Button, ActivityIndicator, View, StyleSheet  } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';

var fetchUrl = require('./config').FetchUrl;
var pilots = require('./modules/pilots/pilots');
var airplanes = require('./modules/airplanes/airplanes');
var manifests = require('./modules/manifests/manifests');

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Part 135 Flight Tracker',
  };

  // I want to check a stored Token value. If it doesn't exist or does not match, I want to render log in page. If it does exist and does match, they are logged in.




  render() {
    let tokenmatch = true;
    const {navigate} = this.props.navigation;
    if (tokenmatch) {
      return (
        <View style={styles.container}>
          <View style={styles.alternativeLayoutButtonContainer}>
            <Button
              title="Create a Flight Manifest!"
              onPress={() => navigate('CreateFlightManifest')}
            />
          </View>
          <View style={styles.alternativeLayoutButtonContainer}>
           <Button
             title="Pilots List"
             onPress={() => navigate('SeeAllPilots')}
           />
         </View>
         <View style={styles.alternativeLayoutButtonContainer}>
           <Button
             title="Airplanes List"
             onPress={() => navigate('SeeAllAirplanes')}
           />
         </View>


       </View>
      );
    } else {
      return;
    }
  }
}

const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  SeeAllPilots: {screen: pilots.SeeAllPilots},
  CreateNewPilot: {screen: pilots.CreateNewPilot},
  UpdatePilot: {screen: pilots.UpdatePilot},
  CreateNewAirplane: {screen: airplanes.CreateNewAirplane},
  SeeAllAirplanes: {screen: airplanes.SeeAllAirplanes},
  UpdateAirplane: {screen: airplanes.UpdateAirplane},
  CreateFlightManifest: {screen: manifests.CreateFlightManifest}
});

const App = createAppContainer(MainNavigator);

export default App;


const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
  },
  buttonContainer: {
    margin: 20
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
