import React from 'react';
import { ActivityIndicator, Text, TextInput, View, StyleSheet, AsyncStorage } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import {createStackNavigator, createAppContainer} from 'react-navigation';

var fetchUrl = require('./config').FetchUrl;
var pilots = require('./modules/pilots/pilots');
var airplanes = require('./modules/airplanes/airplanes');
var manifests = require('./modules/manifests/manifests');
var users = require('./modules/users/users');

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Part 135 Flight Tracker',
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: '',
      token: '',
      username: '',
      password: '',
      tokenmatch: false,
      permissions: '',
    }
  }



  // I want to check a stored Token value. If it doesn't exist or does not match, I want to render log in page. If it does exist and does match, they are logged in.
  componentWillMount() {

    const getUserId = async () => {

      let auth_token = '';
      let permissions = '';
      try {
        auth_token = await AsyncStorage.getItem('Auth_Token') || 'none';
        permissions = await AsyncStorage.getItem('Permissions') || 'none';
      } catch (error) {
        // Error retrieving data
        console.log(error.message);
      }
      this.setState({
        token: auth_token,
        permissions: permissions,
      });
      // Verify the user if token exists
      fetch(fetchUrl+'/user/verify', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': auth_token
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson.message);
        if (auth_token != 'none') {
          this.setState({'tokenmatch': true})
        }
      }, function(){


      });

      return auth_token;
    }
    getUserId();

  }


  validate() {
    var errors = false;
    if (this.state.username == '') {
      errors = true;
      alert('Please enter username');
    }
    if (this.state.password == '') {
      errors = true;
      alert('Please enter password');
    }

    if (errors == false ){
      this.attemptLogin();
    }
  }

  attemptLogin() {
    fetch(fetchUrl+'/user/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          token: responseJson.token,
          permissions: responseJson.existingUser.permissions,
        }, function(){
          // Save token in local storage
          const setValue = async userId => {
            try {
              await AsyncStorage.setItem('Auth_Token', responseJson.token);
              await AsyncStorage.setItem('Permissions', responseJson.existingUser.permissions);
            } catch (error) {
              // Error retrieving data
              console.log(error.message);
            }
          };
          setValue();
          this.setState({
            tokenmatch: true,
          });
        });

      })
      .catch((error) =>{
        console.log(error);
        alert('There was a problem logging in, please make sure your credentials are correct');
      });
  }

  registerUser() {

  }

  logOut() {
    const removeToken = async userId => {
      try {
        await AsyncStorage.setItem('Auth_Token', 'none');
        await AsyncStorage.setItem('Permissions', 'none');
      } catch (error) {
        // Error retrieving data
        console.log(error.message);
      }
    };
    removeToken();
    const {navigate} = this.props.navigation;
    this.setState({'tokenmatch': false});
    navigate('Home');
  }
  manifestview() {
    const {navigate} = this.props.navigation;

    return(
      <View style={styles.alternativeLayoutButtonContainer}>
        <Button
          icon={
            <Icon
              name = "clipboard"
              type="font-awesome"

              />
          }
          onPress={() => navigate('CreateFlightManifest')}
          title=" Create Flight Manifest"
        />
      </View>
    )
  }
  pilotsview() {
    const {navigate} = this.props.navigation;

    return(

      <View style={styles.myButtons}>
        <Button
          icon={
            <Icon
              name = "user-circle"
              type="font-awesome"
              />
          }
          onPress={() => navigate('SeeAllPilots')}
          title=" Pilots"
        />
     </View>
    )
  }
  airplanesview() {
    const {navigate} = this.props.navigation;

    return(
      <View style={styles.alternativeLayoutButtonContainer}>
        <Button
          icon={
            <Icon
              name = "plane"
              type="font-awesome"
              />
          }
          title=" Airplanes"
          onPress={() => navigate('SeeAllAirplanes')}
        />
      </View>
    )
  }
  usersview() {
    const {navigate} = this.props.navigation;

    return(
      <View style={styles.alternativeLayoutButtonContainer}>
        <Button
          icon={
            <Icon
              name = "users"
              type="font-awesome"
              />
          }
          onPress={() => navigate('SeeAllUsers')}
          title=" Users"
        />
      </View>
    )
  }
  logOutView(){
    return(
      <View style={styles.alternativeLayoutButtonContainer}>
        <Button
          icon={
            <Icon
              name = "arrow-left"
              type="font-awesome"
              />
          }
          onPress={() => this.logOut()}
          title=" Log Out"
        />
      </View>

    )
  }
  render() {

    const {navigate} = this.props.navigation;
    if (this.state.tokenmatch) {
      // 0 = admin, 1 = pilotandadmin, 2 = pilot, 3 = mechanic, 4 = mechanicaccess, 5 = bookkeeper

      if (this.state.permissions == 0){
        return (
          <View style={styles.container}>
            {this.pilotsview()}
            {this.airplanesview()}
            {this.usersview()}
            {this.logOutView()}
          </View>
        );

      } else if (this.state.permissions == 1){
        return (
          <View style={styles.container}>
            {this.manifestview()}
            {this.pilotsview()}
            {this.airplanesview()}
            {this.usersview()}
            {this.logOutView()}
           </View>
        );
      } else if (this.state.permissions == 2){
        return (
          <View style={styles.container}>
            {this.manifestview()}
            {this.airplanesview()}
            {this.logOutView()}
           </View>
        );

      } else if (this.state.permissions == 3){
        return (
          <View style={styles.container}>
            {this.airplanesview()}
            {this.logOutView()}
           </View>
        );

      } else if (this.state.permissions == 4){
        return (
          <View style={styles.container}>
            {this.airplanesview()}
            {this.usersview()}
            {this.logOutView()}
           </View>
        );

      } else {
        return (
          <View style={styles.container}>
              {this.usersview()}
              {this.logOutView()}
           </View>
        );
      }



    } else {
      const {navigate} = this.props.navigation;

      return (
        <View style={styles.container}>
          <Text>
            You must be logged in to use this App
          </Text>

          <Text>
            Username:
          </Text>

          <TextInput
            style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }}
            onChangeText ={(username) => this.setState({username})}
            value = {this.state.username}
          />

          <Text>
            Password:
          </Text>

          <TextInput
            secureTextEntry={true}
            style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }}
            onChangeText ={(password) => this.setState({password})}
            value = {this.state.password}
          />
         <View style={styles.alternativeLayoutButtonContainer}>
           <Button
             title="Login"
             onPress={() => this.validate()}
           />
           <Button
             title="Register"
             onPress={() => navigate('RegisterUser')}
           />
         </View>
       </View>
      );
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
  CreateFlightManifest: {screen: manifests.CreateFlightManifest},
  SeeAllUsers: {screen: users.SeeAllUsers},
  UpdateUser: {screen: users.UpdateUser},
  RegisterUser: {screen: users.RegisterUser},
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
    margin: 5,
    flexDirection: 'row',

  },
  myButtons: {
    margin: 1,
    flexDirection: 'row',

  },
  title: {
    fontSize: 40
  }
});
