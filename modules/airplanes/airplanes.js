import React from 'react';
import { FlatList, Button, TextInput, ActivityIndicator, Text, Picker, ScrollView, View, StyleSheet  } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
var fetchUrl = require('../../config').FetchUrl;


class CreateNewAirplane extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {aircraftstatus: '',
                  acname: '',
                  actype: '',
                  tachtime: '',
                  recordreviewdue: '',
                  phaseplane: '',
                  annualdue: '',
                  fiftyhourdue: '',
                  hundredhourdue: '',
                  transponderdue: '',
                  phase1due: '',
                  phase2due: '',
                  phase3due: '',
                  phase4due: '',
                  phasefinaldate: '',
                };
  }
  // validate data then fetch post
  validateAndFetch() {
    var errors = false;
    if (this.state.aircraftstatus == '') {
      errors = true;
      alert('You must fill out the Aircraft status');
    }
    if (this.state.acname == '') {
      errors = true;
      alert('You must fill out the Aircraft Name');
    }
    if (this.state.actype == '') {
      errors = true;
      alert('You must fill out the Pilot Title');
    }
    if (this.state.tachtime == '') {
      errors = true;
      alert('You must fill out the Certification Type');
    }
    if (this.state.recordreviewdue == '') {
      errors = true;
      alert('You must fill out the Certification Number');
    }
    if (this.state.phaseplane == '') {
      errors = true;
      alert('You must fill out the Medical Due Date');
    }
    if (this.state.phaseplane == false) {
      if (this.state.annualdue == '') {
        errors = true;
        alert('You must fill out the FAA SE Due');
      }
      if (this.state.fiftyhourdue == '') {
        errors = true;
        alert('You must fill out the FAA ME Due');
      }
      if (this.state.hundredhourdue == '') {
        errors = true;
        alert('You must fill out the FAA Inst Due');
      }
    }
    if (this.state.transponderdue == '') {
      errors = true;
      alert('You must fill out the 135 Operations Approved');
    }
    if (this.state.phaseplane == true) {


      if (this.state.phase1due == '') {
        errors = true;
        alert('You must fill out the Aircraft Approved');
      }
      if (this.state.phase2due == '') {
        errors = true;
        alert('You must fill out the Check Airman Due');
      }
      if (this.state.phase3due == '') {
        errors = true;
        alert('You must fill out the Aircraft Approved');
      }
      if (this.state.phase4due == '') {
        errors = true;
        alert('You must fill out the Check Airman Due');
      }
      if (this.state.phasefinaldate == '') {
        errors = true;
        alert('You must fill out the Aircraft Approved');
      }
    }
    if (errors == false) {
      this.createPlane();
    }
  }

  createPlane() {
    const {navigate} = this.props.navigation;
    fetch(fetchUrl+'/airplanes', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          aircraftstatus: this.state.aircraftstatus,
          acname: this.state.acname,
          actype: this.state.actype,
          tachtime: this.state.tachtime,
          recordreviewdue: this.state.recordreviewdue,
          phaseplane: this.state.phaseplane,
          annualdue: this.state.annualdue,
          fiftyhourdue: this.state.fiftyhourdue,
          hundredhourdue: this.state.hundredhourdue,
          transponderdue: this.state.transponderdue,
          phase1due: this.state.phase1due,
          phase2due: this.state.phase2due,
          phase3due: this.state.phase3due,
          phase4due: this.state.phase4due,
          phasefinaldate: this.state.phasefinaldate,
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({

          dataSource: responseJson,
        }, function(){
          alert('Airplane created successfully!');
          navigate('SeeAllAirplanes');
        });

      })
      .catch((error) =>{
        alert('There was a problem creating this Airplane');
      });
  }

  render() {

    return (

      <ScrollView style={{padding: 10}}>
        <Text>
          Aircraft Name:
        </Text>
        <TextInput
          style={{height: 40}}
          placeholder="N123AB"
          onChangeText ={(acname) => this.setState({acname})}
          value={this.state.acname}
        />
        <Text>
          Aircraft Type:
        </Text>
        <TextInput
          style={{height: 40}}
          placeholder="C206 or Turbo C206"
          onChangeText ={(actype) => this.setState({actype})}
          value={this.state.actype}
        />
        <Text>
          Aircraft Status:
        </Text>
        <Picker
          selectedValue={this.state.aircraftstatus}
          style={{height: 50, width: 100}}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({aircraftstatus: itemValue})
          }>
          <Picker.Item label="In Service" value="In Service" />
          <Picker.Item label="In Service - Maintenance Due Soon" value="In Service - Maintenance Due Soon" />
          <Picker.Item label="Out of Service - Maintenance Overdue" value="Out of Service - Maintenance Overdue" />
          <Picker.Item label="Out of Service - Removed by Admin" value="Out of Service - Removed by Admin" />
        </Picker>

        <Text>
          Tach Time:
        </Text>
        <TextInput
          style={{height: 40}}
          placeholder="1234.5"
          onChangeText ={(tachtime) => this.setState({tachtime})}
          value={this.state.tachtime}
        />
        <Text>
          Record Review Due:
        </Text>
        <TextInput
          style={{height: 40}}
          placeholder="i.e. 10/31/2019"
          onChangeText ={(recordreviewdue) => this.setState({recordreviewdue})}
          value={this.state.recordreviewdue}
        />
        <Text>
          Is this a phase plane?
        </Text>
        <Picker
          selectedValue={this.state.phaseplane}
          style={{height: 50, width: 100}}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({phaseplane: itemValue})
          }>
          <Picker.Item label="true" value="true" />
          <Picker.Item label="false" value="false" />
        </Picker>
        <Text>
          Annual Due:
        </Text>
        <TextInput
          style={{height: 40}}
          placeholder="i.e. 10/31/2019"
          onChangeText ={(annualdue) => this.setState({annualdue})}
          value={this.state.annualdue}
        />
        <Text>
          Fifty Hour Due:
        </Text>
        <TextInput
          style={{height: 40}}
          placeholder="i.e. 1234.5"
          onChangeText ={(fiftyhourdue) => this.setState({fiftyhourdue})}
          value={this.state.fiftyhourdue}
        />
        <Text>
          Hundred-Hour Due:
        </Text>
        <TextInput
          style={{height: 40}}
          placeholder="i.e. 1234.5"
          onChangeText ={(hundredhourdue) => this.setState({hundredhourdue})}
          value={this.state.hundredhourdue}
        />
        <Text>
          Transponder Due:
        </Text>
        <TextInput
          style={{height: 40}}
          placeholder="i.e. 10/31/2019"
          onChangeText ={(transponderdue) => this.setState({transponderdue})}
          value={this.state.transponderdue}
        />
        <Text>
          Phase One Due:
        </Text>
        <TextInput
          style={{height: 40}}
          placeholder="i.e. 1234.5"
          onChangeText ={(phase1due) => this.setState({phase1due})}
          value={this.state.phase1due}
        />
        <Text>
          Phase Two Due:
        </Text>
        <TextInput
          style={{height: 40}}
          placeholder="i.e. 1234.5"
          onChangeText ={(phase2due) => this.setState({phase2due})}
          value={this.state.phase2due}
        />
        <Text>
          Phase Three Due:
        </Text>
        <TextInput
          style={{height: 40}}
          placeholder="i.e. 1234.5"
          onChangeText ={(phase3due) => this.setState({phase3due})}
          value={this.state.phase3due}
        />
        <Text>
          Phase Four Due:
        </Text>
        <TextInput
          style={{height: 40}}
          placeholder="i.e. 1234.5"
          onChangeText ={(phase4due) => this.setState({phase4due})}
          value={this.state.phase4due}
        />
        <Text>
          Phase 4 Final Date Due:
        </Text>
        <TextInput
          style={{height: 40}}
          placeholder="i.e. 10/31/2019"
          onChangeText ={(phasefinaldate) => this.setState({phasefinaldate})}
          value={this.state.phasefinaldate}
        />
        <View style={styles.container}>
         <View style={styles.alternativeLayoutButtonContainer}>
           <Button
             title="Create Airplane"
             onPress={() => this.validateAndFetch()}
           />

         </View>
       </View>
      </ScrollView>
    );
  }
}

class UpdateAirplane extends React.Component {
  componentDidMount(){
    const {params} = this.props.navigation.state;

    return fetch(fetchUrl+'/airplanes/'+params.id, {
        method: 'GET',

      })
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          key: responseJson._id,
          aircraftstatus: responseJson.aircraftstatus,
          acname: responseJson.acname,
          actype: responseJson.actype,
          tachtime: responseJson.tachtime,
          recordreviewdue: responseJson.recordreviewdue,
          phaseplane: responseJson.phaseplane,
          annualdue: responseJson.annualdue,
          fiftyhourdue: responseJson.fiftyhourdue,
          hundredhourdue: responseJson.hundredhourdue,
          transponderdue: responseJson.transponderdue,
          phase1due: responseJson.phase1due,
          phase2due: responseJson.phase2due,
          phase3due: responseJson.phase3due,
          phase4due: responseJson.phase4due,
          phasefinaldate: responseJson.phasefinaldate,

        });
      })
      .catch((error) =>{
        console.error(error);
      });

    }
  constructor(props) {
    super(props);
    this.state = {aircraftstatus: '',
                  acname: '',
                  actype: '',
                  tachtime: '',
                  recordreviewdue: '',
                  phaseplane: '',
                  annualdue: '',
                  fiftyhourdue: '',
                  hundredhourdue: '',
                  transponderdue: '',
                  phase1due: '',
                  phase2due: '',
                  phase3due: '',
                  phase4due: '',
                  phasefinaldate: '',
                };
  }
  validateAndFetchAirplanes() {

    var errors = false;
    if (this.state.aircraftstatus == '') {
      errors = true;
      alert('You must fill out the Aircraft status');
    }
    if (this.state.acname == '') {
      errors = true;
      alert('You must fill out the Aircraft Name');
    }
    if (this.state.actype == '') {
      errors = true;
      alert('You must fill out the Pilot Title');
    }
    if (this.state.tachtime == '') {
      errors = true;
      alert('You must fill out the Certification Type');
    }
    if (this.state.recordreviewdue == '') {
      errors = true;
      alert('You must fill out the Certification Number');
    }
    if (this.state.phaseplane == '') {
      errors = true;
      alert('You must fill out the Medical Due Date');
    }
    if (this.state.phaseplane == false) {
      if (this.state.annualdue == '') {
        errors = true;
        alert('You must fill out the FAA SE Due');
      }
      if (this.state.fiftyhourdue == '') {
        errors = true;
        alert('You must fill out the FAA ME Due');
      }
      if (this.state.hundredhourdue == '') {
        errors = true;
        alert('You must fill out the FAA Inst Due');
      }
    }
    if (this.state.transponderdue == '') {
      errors = true;
      alert('You must fill out the 135 Operations Approved');
    }
    if (this.state.phaseplane == true) {


      if (this.state.phase1due == '') {
        errors = true;
        alert('You must fill out the Aircraft Approved');
      }
      if (this.state.phase2due == '') {
        errors = true;
        alert('You must fill out the Check Airman Due');
      }
      if (this.state.phase3due == '') {
        errors = true;
        alert('You must fill out the Aircraft Approved');
      }
      if (this.state.phase4due == '') {
        errors = true;
        alert('You must fill out the Check Airman Due');
      }
      if (this.state.phasefinaldate == '') {
        errors = true;
        alert('You must fill out the Aircraft Approved');
      }
    }
    if (errors == false) {
      this.createAirplane();
    }
  }
  createAirplane() {
    const {params} = this.props.navigation.state;
    fetch(fetchUrl+'/airplanes/'+params.id, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          aircraftstatus: this.state.aircraftstatus,
          acname: this.state.acname,
          actype: this.state.actype,
          tachtime: this.state.tachtime,
          recordreviewdue: this.state.recordreviewdue,
          phaseplane: this.state.phaseplane,
          annualdue: this.state.annualdue,
          fiftyhourdue: this.state.fiftyhourdue,
          hundredhourdue: this.state.hundredhourdue,
          transponderdue: this.state.transponderdue,
          phase1due: this.state.phase1due,
          phase2due: this.state.phase2due,
          phase3due: this.state.phase3due,
          phase4due: this.state.phase4due,
          phasefinaldate: this.state.phasefinaldate
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson,
        }, function(){
          alert('Airplane updated successfully!');
        });

      })
      .catch((error) =>{
        alert('There was a problem updating this Airplane');
      });
  }
  render() {

    return (
      <ScrollView style={{padding: 10}}>
        <Text>
          Aircraft Name:
        </Text>
        <TextInput
          style={{height: 40}}
          placeholder="N123AB"
          onChangeText ={(acname) => this.setState({acname})}
          value={this.state.acname}
        />
        <Text>
          Aircraft Type:
        </Text>
        <TextInput
          style={{height: 40}}
          placeholder="C206 or Turbo C206"
          onChangeText ={(actype) => this.setState({actype})}
          value={this.state.actype}
        />
        <Text>
          Aircraft Status:
        </Text>
        <Picker
          selectedValue={this.state.aircraftstatus}
          style={{height: 50, width: 100}}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({aircraftstatus: itemValue})
          }>
          <Picker.Item label="In Service" value="In Service" />
          <Picker.Item label="In Service - Maintenance Due Soon" value="In Service - Maintenance Due Soon" />
          <Picker.Item label="Out of Service - Maintenance Overdue" value="Out of Service - Maintenance Overdue" />
          <Picker.Item label="Out of Service - Removed by Admin" value="Out of Service - Removed by Admin" />
        </Picker>

        <Text>
          Tach Time:
        </Text>
        <TextInput
          style={{height: 40}}
          placeholder="1234.5"
          onChangeText ={(tachtime) => this.setState({tachtime})}
          value={this.state.tachtime}
        />
        <Text>
          Record Review Due:
        </Text>
        <TextInput
          style={{height: 40}}
          placeholder="i.e. 10/31/2019"
          onChangeText ={(recordreviewdue) => this.setState({recordreviewdue})}
          value={this.state.recordreviewdue}
        />
        <Text>
          Is this a phase plane?
        </Text>
        <Picker
          selectedValue={this.state.phaseplane}
          style={{height: 50, width: 100}}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({phaseplane: itemValue})
          }>
          <Picker.Item label="true" value="true" />
          <Picker.Item label="false" value="false" />
        </Picker>

        <Text>
          Annual Due:
        </Text>
        <TextInput
          style={{height: 40}}
          placeholder="i.e. 10/31/2019"
          onChangeText ={(annualdue) => this.setState({annualdue})}
          value={this.state.annualdue}
        />
        <Text>
          Fifty Hour Due:
        </Text>
        <TextInput
          style={{height: 40}}
          placeholder="i.e. 1234.5"
          onChangeText ={(fiftyhourdue) => this.setState({fiftyhourdue})}
          value={this.state.fiftyhourdue}
        />
        <Text>
          Hundred-Hour Due:
        </Text>
        <TextInput
          style={{height: 40}}
          placeholder="i.e. 1234.5"
          onChangeText ={(hundredhourdue) => this.setState({hundredhourdue})}
          value={this.state.hundredhourdue}
        />
        <Text>
          Transponder Due:
        </Text>
        <TextInput
          style={{height: 40}}
          placeholder="i.e. 10/31/2019"
          onChangeText ={(transponderdue) => this.setState({transponderdue})}
          value={this.state.transponderdue}
        />
        <Text>
          Phase One Due:
        </Text>
        <TextInput
          style={{height: 40}}
          placeholder="i.e. 1234.5"
          onChangeText ={(phase1due) => this.setState({phase1due})}
          value={this.state.phase1due}
        />
        <Text>
          Phase Two Due:
        </Text>
        <TextInput
          style={{height: 40}}
          placeholder="i.e. 1234.5"
          onChangeText ={(phase2due) => this.setState({phase2due})}
          value={this.state.phase2due}
        />
        <Text>
          Phase Three Due:
        </Text>
        <TextInput
          style={{height: 40}}
          placeholder="i.e. 1234.5"
          onChangeText ={(phase3due) => this.setState({phase3due})}
          value={this.state.phase3due}
        />
        <Text>
          Phase Four Due:
        </Text>
        <TextInput
          style={{height: 40}}
          placeholder="i.e. 1234.5"
          onChangeText ={(phase4due) => this.setState({phase4due})}
          value={this.state.phase4due}
        />
        <Text>
          Phase 4 Final Date Due:
        </Text>
        <TextInput
          style={{height: 40}}
          placeholder="i.e. 10/31/2019"
          onChangeText ={(phasefinaldate) => this.setState({phasefinaldate})}
          value={this.state.phasefinaldate}
        />
        <View style={styles.container}>
         <View style={styles.alternativeLayoutButtonContainer}>
           <Button
             title="Create Airplane"
             onPress={() => this.validateAndFetchAirplanes()}
           />

         </View>
       </View>
      </ScrollView>
    );
  }
}

class SeeAllAirplanes extends React.Component {

    constructor(props){
      super(props);
      this.state ={ isLoading: true}
    }

    componentDidMount(){
      return fetch(fetchUrl+'/airplanes', {
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


    deleteAirplane(id) {
      const {params} = this.props.navigation.state;
      return fetch(fetchUrl+'/airplanes/'+ id, {
          method: 'DELETE',
        })
        .then((response) => response.json())
        .then((responseJson) => {
          alert('Deleted airplane successfully.');

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
                    <Text>{item.actype} | {item.acname}</Text>
                    <Button onPress={() => navigate('UpdateAirplane', {id: item._id})} title="Update"/>
                    <Button onPress={() => this.deleteAirplane(item._id)} title="Delete"/>
                </View>
              </View>
            }
            keyExtractor={(id, index) => index.toString()}

          />
          <Button
            title="Create New Airplane!"
            onPress={() => navigate('CreateNewAirplane')}
          />
        </View>
      );
    }
}

exports.CreateNewAirplane = CreateNewAirplane;
exports.UpdateAirplane = UpdateAirplane;
exports.SeeAllAirplanes = SeeAllAirplanes;

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
