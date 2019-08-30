import React from 'react';
import { FlatList, Button, TextInput, ActivityIndicator, Text, Picker, ScrollView, View, StyleSheet  } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
var fetchUrl = require('../../config').FetchUrl;



class CreateNewPilot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: '',
                  email: '',
                  title: '',
                  cert: '',
                  certnumber: '',
                  medicalclass: '',
                  faasedue: '',
                  faamedue: '',
                  faainstdue: '',
                  opsapproved: '',
                  acapproved: '',
                  daycurrent: '',
                  nightcurrent: '',
                  checkairmandue: ''
                };
  }
  // validate data then fetch post
  validateAndFetch() {
    var errors = false;
    if (this.state.name == '') {
      errors = true;
      alert('You must fill out the Pilot Name');
    }
    if (this.state.email == '') {
      errors = true;
      alert('You must fill out the Pilot Email');
    }
    if (this.state.title == '') {
      errors = true;
      alert('You must fill out the Pilot Title');
    }
    if (this.state.cert == '') {
      errors = true;
      alert('You must fill out the Certification Type');
    }
    if (this.state.certnumber == '') {
      errors = true;
      alert('You must fill out the Certification Number');
    }
    if (this.state.medicaldue == '') {
      errors = true;
      alert('You must fill out the Medical Due Date');
    }
    if (this.state.faasedue == '') {
      errors = true;
      alert('You must fill out the FAA SE Due');
    }
    if (this.state.faamedue == '') {
      errors = true;
      alert('You must fill out the FAA ME Due');
    }
    if (this.state.faainstdue == '') {
      errors = true;
      alert('You must fill out the FAA Inst Due');
    }
    if (this.state.opsapproved == '') {
      errors = true;
      alert('You must fill out the 135 Operations Approved');
    }
    if (this.state.acapproved == '') {
      errors = true;
      alert('You must fill out the Aircraft Approved');
    }
    if (this.state.checkairmandue == '') {
      errors = true;
      alert('You must fill out the Check Airman Due');
    }

    if (errors == false) {
      this.createPilot();
    }
  }

  createPilot() {

    fetch(fetchUrl+'/pilots', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.state.name,
          email: this.state.email,
          title: this.state.title,
          cert: this.state.cert,
          certnumber: this.state.certnumber,
          medicalclass: this.state.medicalclass,
          faasedue: this.state.faasedue,
          faamedue: this.state.faamedue,
          faainstdue: this.state.faainstdue,
          opsapproved: this.state.opsapproved,
          acapproved: this.state.acapproved,
          daycurrent: this.state.daycurrent,
          nightcurrent: this.state.nightcurrent,
          checkairmandue: this.state.checkairmandue
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({

          dataSource: responseJson,
        }, function(){
          console.log(responseJson);
          alert('Pilot created successfully!');
        });

      })
      .catch((error) =>{
        alert('There was a problem creating this Pilot');
      });
  }

  render() {

    return (

      <ScrollView style={{padding: 10}}>
        <Text>
          Name:
        </Text>
        <TextInput
          style={{height: 40}}
          placeholder="Pilot Name"
          onChangeText ={(name) => this.setState({name})}
          value={this.state.name}
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
          Title:
        </Text>
        <TextInput
          style={{height: 40}}
          placeholder="i.e. 'Pilot' or 'Chief Pilot'"
          onChangeText ={(title) => this.setState({title})}
          value={this.state.title}
        />
        <Text>
          Certificate Type:
        </Text>
        <TextInput
          style={{height: 40}}
          placeholder="i.e. AMEL/ASEL CFI"
          onChangeText ={(cert) => this.setState({cert})}
          value={this.state.cert}
        />
        <Text>
          Certificate Number:
        </Text>
        <TextInput
          style={{height: 40}}
          placeholder="cert# i.e. 1234567"
          onChangeText ={(certnumber) => this.setState({certnumber})}
          value={this.state.certnumber}
        />
        <Text>
          Medical Due:
        </Text>
        <TextInput
          style={{height: 40}}
          placeholder="i.e. 10/31/2019"
          onChangeText ={(medicaldue) => this.setState({medicaldue})}
          value={this.state.medicaldue}
        />
        <Text>
          Medical Class:
        </Text>
        <TextInput
          style={{height: 40}}
          placeholder="i.e. II"
          onChangeText ={(medicalclass) => this.setState({medicalclass})}
          value={this.state.medicalclass}
        />
        <Text>
          FAA SE Due:
        </Text>
        <TextInput
          style={{height: 40}}
          placeholder="i.e. 10/31/2019"
          onChangeText ={(faasedue) => this.setState({faasedue})}
          value={this.state.faasedue}
        />
        <Text>
          FAA ME Due:
        </Text>
        <TextInput
          style={{height: 40}}
          placeholder="i.e. 10/31/2019"
          onChangeText ={(faamedue) => this.setState({faamedue})}
          value={this.state.faamedue}
        />
        <Text>
          FAA Inst Due:
        </Text>
        <TextInput
          style={{height: 40}}
          placeholder="i.e. 10/31/2019"
          onChangeText ={(faainstdue) => this.setState({faainstdue})}
          value={this.state.faainstdue}
        />
        <Text>
          FAA Inst Type:
        </Text>
        <Picker
          selectedValue={this.state.faainstdue}
          style={{height: 50, width: 100}}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({faainstdue: itemValue})
          }>
          <Picker.Item label="ME" value="ME" />
          <Picker.Item label="SE" value="SE" />
        </Picker>
        <Text>
          135 Operations Approved:
        </Text>
        <TextInput
          style={{height: 40}}
          placeholder="i.e. IFR, VFR"
          onChangeText ={(opsapproved) => this.setState({opsapproved})}
          value={this.state.opsapproved}
        />
        <Text>
          Aircraft Approved:
        </Text>
        <TextInput
          style={{height: 40}}
          placeholder="i.e. 340, 210, 206, 180, 172"
          onChangeText ={(acapproved) => this.setState({acapproved})}
          value={this.state.acapproved}
        />
        <Text>
          Day Currency:
        </Text>
        <Picker
          selectedValue={this.state.daycurrent}
          style={{height: 50, width: 100}}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({daycurrent: itemValue})
          }>
          <Picker.Item label="Yes" value="true" />
          <Picker.Item label="No" value="false" />
        </Picker>
        <Text>
          Night Currency:
        </Text>
        <Picker
          selectedValue={this.state.nightcurrent}
          style={{height: 50, width: 100}}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({nightcurrent: itemValue})
          }>
          <Picker.Item label="Yes" value="true" />
          <Picker.Item label="No" value="false" />
        </Picker>
        <Text>
          Check Airman Due:
        </Text>
        <TextInput
          style={{height: 40}}
          placeholder="i.e. 10/31/2019"
          onChangeText ={(checkairmandue) => this.setState({checkairmandue})}
          value={this.state.checkairmandue}
        />
        <View style={styles.container}>
         <View style={styles.alternativeLayoutButtonContainer}>
           <Button
             title="Submit!"
             onPress={() => this.validateAndFetch()}
           />

         </View>
       </View>
      </ScrollView>
    );
  }
}

class UpdatePilot extends React.Component {
  componentDidMount(){

    const {params} = this.props.navigation.state;
    //
    // var url = '192.168.1.6:3000/pilots';
    // console.log(url);
    return fetch(fetchUrl+'/pilots/'+params.id, {
        method: 'GET',

      })
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          name: responseJson.name,
          email: responseJson.email,
          title: responseJson.title,
          cert: responseJson.cert,
          certnumber: responseJson.certnumber,
          medicaldue: responseJson.medicaldue,
          medicalclass: responseJson.medicalclass,
          faasedue: responseJson.faasedue,
          faamedue: responseJson.faamedue,
          faainstdue: responseJson.faainstdue,
          opsapproved: responseJson.opsapproved,
          acapproved: responseJson.acapproved,
          daycurrent: responseJson.daycurrent,
          nightcurrent: responseJson.nightcurrent,
          checkairmandue: responseJson.checkairmandue

        });
      })
      .catch((error) =>{
        console.error(error);
      });

    }

  constructor(props) {
    super(props);
    this.state = {name: '',
                  email: '',
                  title: '',
                  cert: '',
                  certnumber: '',
                  medicaldue: '',
                  medicalclass: '',
                  faasedue: '',
                  faamedue: '',
                  faainstdue: '',
                  opsapproved: '',
                  acapproved: '',
                  daycurrent: '',
                  nightcurrent: '',
                  checkairmandue: ''
                };
  }
  // validate data then fetch post
  validateAndFetch() {
    var errors = false;
    if (this.state.name == '') {
      errors = true;
      alert('You must fill out the Pilot Name');
    }
    if (this.state.email == '') {
      errors = true;
      alert('You must fill out the Pilot Email');
    }
    if (this.state.title == '') {
      errors = true;
      alert('You must fill out the Pilot Title');
    }
    if (this.state.cert == '') {
      errors = true;
      alert('You must fill out the Certification Type');
    }
    if (this.state.certnumber == '') {
      errors = true;
      alert('You must fill out the Certification Number');
    }
    if (this.state.medicaldue == '') {
      errors = true;
      alert('You must fill out the Medical Due Date');
    }
    if (this.state.faasedue == '') {
      errors = true;
      alert('You must fill out the FAA SE Due');
    }
    if (this.state.faamedue == '') {
      errors = true;
      alert('You must fill out the FAA ME Due');
    }
    if (this.state.faainstdue == '') {
      errors = true;
      alert('You must fill out the FAA Inst Due');
    }
    if (this.state.opsapproved == '') {
      errors = true;
      alert('You must fill out the 135 Operations Approved');
    }
    if (this.state.acapproved == '') {
      errors = true;
      alert('You must fill out the Aircraft Approved');
    }
    if (this.state.checkairmandue == '') {
      errors = true;
      alert('You must fill out the Check Airman Due');
    }

    if (errors == false) {
      console.log(this.state);
      this.createPilot();
    }
  }

  createPilot() {
    const {params} = this.props.navigation.state;
    fetch(fetchUrl+'/pilots/'+params.id, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.state.name,
          email: this.state.email,
          title: this.state.title,
          cert: this.state.cert,
          certnumber: this.state.certnumber,
          medicaldue: this.state.medicaldue,
          medicalclass: this.state.medicalclass,
          faasedue: this.state.faasedue,
          faamedue: this.state.faamedue,
          faainstdue: this.state.faainstdue,
          opsapproved: this.state.opsapproved,
          acapproved: this.state.acapproved,
          daycurrent: this.state.daycurrent,
          nightcurrent: this.state.nightcurrent,
          checkairmandue: this.state.checkairmandue
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson,
        }, function(){
          console.log(responseJson);
          alert('Pilot updated successfully!');
        });

      })
      .catch((error) =>{
        alert('There was a problem creating this Pilot');
      });
  }

  render() {

    return (

      <ScrollView style={{padding: 10}}>
        <Text>
          Name:
        </Text>
        <TextInput
          style={{height: 40}}
          placeholder="Pilot Name"
          onChangeText ={(name) => this.setState({name})}
          value={this.state.name}
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
          Title:
        </Text>
        <TextInput
          style={{height: 40}}
          placeholder="i.e. 'Pilot' or 'Chief Pilot'"
          onChangeText ={(title) => this.setState({title})}
          value={this.state.title}
        />
        <Text>
          Certificate Type:
        </Text>
        <TextInput
          style={{height: 40}}
          placeholder="i.e. AMEL/ASEL CFI"
          onChangeText ={(cert) => this.setState({cert})}
          value={this.state.cert}
        />
        <Text>
          Certificate Number:
        </Text>
        <TextInput
          style={{height: 40}}
          placeholder="cert# i.e. 1234567"
          onChangeText ={(certnumber) => this.setState({certnumber})}
          value={this.state.certnumber}
        />
        <Text>
          Medical Due:
        </Text>
        <TextInput
          style={{height: 40}}
          placeholder="i.e. 10/31/2019"
          onChangeText ={(medicaldue) => this.setState({medicaldue})}
          value={this.state.medicaldue}
        />
        <Text>
          Medical Class:
        </Text>
        <TextInput
          style={{height: 40}}
          placeholder="i.e. II"
          onChangeText ={(medicalclass) => this.setState({medicalclass})}
          value={this.state.medicalclass}
        />
        <Text>
          FAA SE Due:
        </Text>
        <TextInput
          style={{height: 40}}
          placeholder="i.e. 10/31/2019"
          onChangeText ={(faasedue) => this.setState({faasedue})}
          value={this.state.faasedue}
        />
        <Text>
          FAA ME Due:
        </Text>
        <TextInput
          style={{height: 40}}
          placeholder="i.e. 10/31/2019"
          onChangeText ={(faamedue) => this.setState({faamedue})}
          value={this.state.faamedue}
        />
        <Text>
          FAA Inst Due:
        </Text>
        <TextInput
          style={{height: 40}}
          placeholder="i.e. 10/31/2019"
          onChangeText ={(faainstdue) => this.setState({faainstdue})}
          value={this.state.faainstdue}
        />
        <Text>
          FAA Inst Type:
        </Text>
        <Picker
          selectedValue={this.state.faainstdue}
          style={{height: 50, width: 100}}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({faainstdue: itemValue})
          }>
          <Picker.Item label="ME" value="ME" />
          <Picker.Item label="SE" value="SE" />
        </Picker>
        <Text>
          135 Operations Approved:
        </Text>
        <TextInput
          style={{height: 40}}
          placeholder="i.e. IFR, VFR"
          onChangeText ={(opsapproved) => this.setState({opsapproved})}
          value={this.state.opsapproved}
        />
        <Text>
          Aircraft Approved:
        </Text>
        <TextInput
          style={{height: 40}}
          placeholder="i.e. 340, 210, 206, 180, 172"
          onChangeText ={(acapproved) => this.setState({acapproved})}
          value={this.state.acapproved}
        />
        <Text>
          Day Currency:
        </Text>
        <Picker
          selectedValue={this.state.daycurrent}
          style={{height: 50, width: 100}}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({daycurrent: itemValue})
          }>
          <Picker.Item label="true" value="true" />
          <Picker.Item label="false" value="false" />
        </Picker>
        <Text>
          Night Currency:
        </Text>
        <Picker
          selectedValue={this.state.nightcurrent}
          style={{height: 50, width: 100}}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({nightcurrent: itemValue})
          }>
          <Picker.Item label="true" value="true" />
          <Picker.Item label="false" value="false" />
        </Picker>
        <Text>
          Check Airman Due:
        </Text>
        <TextInput
          style={{height: 40}}
          placeholder="i.e. 10/31/2019"
          onChangeText ={(checkairmandue) => this.setState({checkairmandue})}
          value={this.state.checkairmandue}
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

class SeeAllPilots extends React.Component {



  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch(fetchUrl+'/pilots', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){
          console.log(responseJson)
        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }


  deletePilot(id) {
    const {params} = this.props.navigation.state;
    return fetch(fetchUrl+'/pilots/'+ id, {
        method: 'DELETE',
      })
      .then((response) => response.json())
      .then((responseJson) => {
        alert('Deleted pilot successfully.');

      })
      .catch((error) =>{
        console.error(error);
      });

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
                <Text>Name: {item.name}</Text>
                <Button onPress={() => navigate('UpdatePilot', {id: item._id})} title="Update"/>
                <Button onPress={() => this.deletePilot(item._id)} title="Delete"/>

            </View>

          </View>
          }
          keyExtractor={({id}, index) => id}
        />
        <Button
          title="Create New Pilot!"
          onPress={() => navigate('CreateNewPilot')}
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

exports.CreateNewPilot = CreateNewPilot;
exports.UpdatePilot = UpdatePilot;
exports.SeeAllPilots = SeeAllPilots;
