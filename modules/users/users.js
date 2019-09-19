import React from 'react';
import { FlatList, Button, TextInput, ActivityIndicator, Text, Picker, ScrollView, View, StyleSheet  } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
var fetchUrl = require('../../config').FetchUrl;



class UpdateUser extends React.Component {
  componentDidMount(){
    
    const {params} = this.props.navigation.state;

    return fetch(fetchUrl+'/users/'+params.id, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then((response) => response.json())
      .then((responseJson) => {
        let permissions;
        if (responseJson.permissions) {
          permissions = responseJson.permissions;
        } else {
          permissions = "5";
        }
        this.setState({
          email: responseJson.email,
          firstname: responseJson.firstname,
          lastname: responseJson.lastname,
          permissions: permissions,
          username: responseJson.username,
        });
      })
      .catch((error) =>{
        console.error(error);
      });

    }

  constructor(props) {
    super(props);
    this.state = {username: '',
                  firstname: '',
                  lastname: '',
                  permissions: '',
                  email: '',
                };
  }
  // validate data then fetch post
  validateAndFetch() {
    var errors = false;
    if (this.state.username == '') {
      errors = true;
      alert('You must fill out the Pilot Name');
    }
    if (this.state.email == '') {
      errors = true;
      alert('You must fill out the Pilot Email');
    }
    if (this.state.permissions == '') {
      errors = true;
      alert('You must set permissions');
    }


    if (errors == false) {
      this.updateUser();
    }
  }

  updateUser() {
    const {params} = this.props.navigation.state;
    fetch(fetchUrl+'/users/'+params.id, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          email: this.state.email,
          permissions: this.state.permissions,
          username: this.state.username,
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson,
        }, function(){
          alert('User updated successfully!');
        });

      })
      .catch((error) =>{
        alert('There was a problem updating this User');
      });
  }

  deleteUser() {

  }

  render() {

    return (

      <ScrollView style={{padding: 10}}>
        <Text>
          First Name:
        </Text>
        <TextInput
          style={{height: 40}}
          placeholder="Pilot Name"
          onChangeText ={(firstname) => this.setState({firstname})}
          value={this.state.firstname}
        />
        <Text>
          Last Name:
        </Text>
        <TextInput
          style={{height: 40}}
          placeholder="lastname"
          onChangeText ={(lastname) => this.setState({lastname})}
          value={this.state.lastname}
        />
        <Text>
          Email:
        </Text>
        <TextInput
          style={{height: 40}}
          placeholder="example@example.com"
          onChangeText ={(email) => this.setState({email})}
          value={this.state.email}
        />
        <Text>
          Username:
        </Text>
        <TextInput
          style={{height: 40}}
          placeholder="i.e. joe_bob"
          onChangeText ={(username) => this.setState({username})}
          value={this.state.username}
        />

        <Text>
          Permissions:
        </Text>
        <Picker
          selectedValue={this.state.permissions}
          style={{height: 50, width: 100}}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({permissions: itemValue})
          }>
          <Picker.Item label="Admin" value="0" />
          <Picker.Item label="Pilot and Admin" value="1" />
          <Picker.Item label="Pilot" value="2" />
          <Picker.Item label="Mechanic" value="3" />
          <Picker.Item label="DOM" value="4" />
          <Picker.Item label="Bookkeeper" value="5" />
        </Picker>
        <View style={styles.container}>
         <View style={styles.alternativeLayoutButtonContainer}>
           <Button
             title="Update!"
             onPress={() => this.validateAndFetch()}
           />

         </View>
       </View>
      </ScrollView>
    );
  }
}

class RegisterUser extends React.Component {


  constructor(props) {
    super(props);
    this.state = {username: '',
                  firstname: '',
                  lastname: '',
                  permissions: '',
                  email: '',
                  password: '',
                  repeatpassword: ''
                };
  }
  // validate data then fetch post
  validateAndFetch() {
    var errors = false;
    if (this.state.username == '') {
      errors = true;
      alert('You must fill out the username');
    }
    if (this.state.firstname == '') {
      errors = true;
      alert('You must fill out a first name');
    }
    if (this.state.lastname == '') {
      errors = true;
      alert('You must fill out a last name');
    }
    if (this.state.email == '') {
      errors = true;
      alert('You must fill out an Email');
    }
    if (this.state.permissions == '') {
      errors = true;
      alert('You must set permissions');
    }
    if (this.state.password == '') {
      errors = true;
      alert('You must set a password');
    }
    if (this.state.repeatpassword == '') {
      errors = true;
      alert('You must repeat the password');
    }
    if (this.state.repeatpassword != this.state.password) {
      errors = true;
      alert('Passwords do not match');
    }


    if (errors == false) {
      this.createUser();
    }
  }

  createUser() {
    const {params} = this.props.navigation.state;
    fetch(fetchUrl+'/users', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          email: this.state.email,
          permissions: this.state.permissions,
          username: this.state.username,
          password: this.state.password
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson,
        }, function(){
          alert('User created successfully!');
        });

      })
      .catch((error) =>{
        alert('There was a problem creating this User');
      });
  }


  render() {

    return (

      <ScrollView style={{padding: 10}}>
        <Text>
          First Name:
        </Text>
        <TextInput
          style={{height: 40}}
          placeholder="Pilot Name"
          onChangeText ={(firstname) => this.setState({firstname})}
          value={this.state.firstname}
        />
        <Text>
          Last Name:
        </Text>
        <TextInput
          style={{height: 40}}
          placeholder="lastname"
          onChangeText ={(lastname) => this.setState({lastname})}
          value={this.state.lastname}
        />
        <Text>
          Email:
        </Text>
        <TextInput
          style={{height: 40}}
          placeholder="example@example.com"
          onChangeText ={(email) => this.setState({email})}
          value={this.state.email}
        />
        <Text>
          Username:
        </Text>
        <TextInput
          style={{height: 40}}
          placeholder="i.e. joe_bob"
          onChangeText ={(username) => this.setState({username})}
          value={this.state.username}
        />

        <Text>
          Permissions:
        </Text>
        <Picker
          selectedValue={this.state.permissions}
          style={{height: 50, width: 100}}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({permissions: itemValue})
          }>
          <Picker.Item label="Admin" value="0" />
          <Picker.Item label="Pilot and Admin" value="1" />
          <Picker.Item label="Pilot" value="2" />
          <Picker.Item label="Mechanic" value="3" />
          <Picker.Item label="DOM" value="4" />
          <Picker.Item label="Bookkeeper" value="5" />
        </Picker>
        <Text>
          Password:
        </Text>

        <TextInput
          secureTextEntry={true}
          style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }}
          onChangeText ={(password) => this.setState({password})}
          value = {this.state.password}
        />
        <Text>
          Password (again):
        </Text>

        <TextInput
          secureTextEntry={true}
          style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }}
          onChangeText ={(repeatpassword) => this.setState({repeatpassword})}
          value = {this.state.repeatpassword}
        />
        <View style={styles.container}>
         <View style={styles.alternativeLayoutButtonContainer}>
           <Button
             title="Update!"
             onPress={() => this.validateAndFetch()}
           />

         </View>
       </View>
      </ScrollView>
    );
  }
}

class SeeAllUsers extends React.Component {

  constructor(props){
    super(props);
    this.state = {isLoading: true}
  }

  componentDidMount(){
    return fetch(fetchUrl+'/users', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){
        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  deleteUser() {

  }

  updateUser() {

  }



  render(){
    const {navigate} = this.props.navigation;
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={{flex: 1, paddingTop:20}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) =>
          <View style={styles.container}>
            <View style={styles.alternativeLayoutButtonContainer}>
                <Text>Name: {item.firstname} {item.lastname}</Text>

                <Button onPress={() => navigate('UpdateUser', {id: item._id})} title="Update"/>
                <Button onPress={() => this.deleteUser(item._id)} title="Delete"/>
            </View>

          </View>
          }
          keyExtractor={(id, index) => index.toString()}
        />
      </View>
    );
  }
}



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

exports.RegisterUser = RegisterUser;
exports.SeeAllUsers = SeeAllUsers;
exports.UpdateUser = UpdateUser;
