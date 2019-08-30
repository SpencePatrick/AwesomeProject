import React from 'react';
import { FlatList, Button, TextInput, ActivityIndicator, Text, Picker, ScrollView, View, StyleSheet, Slider  } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
var fetchUrl = require('../../config').FetchUrl;


class CreateFlightManifest extends React.Component {
  componentDidMount(){
    return fetch(fetchUrl+'/airplanes')
      .then((response) => response.json())
      .then((responseJson) => {
        let options = [];
        for (let object in responseJson) {
          options.push(responseJson[object]);
        }
        this.setState({
          airplanes: options,
        });
        fetch(fetchUrl+'/pilots')
          .then((response) => response.json())
          .then((responseJson) => {
            let options = [];
            for (let object in responseJson) {
              options.push(responseJson[object]);
            }
            this.setState({
              pilots: options,
            });

          })
          .catch((error) =>{
            console.error(error);
          });
      })
      .catch((error) =>{
        console.error(error);
      });


    }



  constructor(props) {
    super(props);
    this.state = {date: new Date(),
                  pilots: [],
                  airplanes: [],
                  pilot: 'none',
                  airplane: 'none',
                  passengers: '0',
                  customer: '',
                  risk: '',
                  acpositioningtime: '',
                  nonsptime: '',
                  standby: '',
                  nightflyingtime: '',
                  dutystart: '',
                  dutystop: '',
                  flightstart: '',
                  flightstop: '',
                  tachstart: '',
                  tachstop: '',
                  totaltach: '',
                  origin: '',
                  acconfig1: '',
                  destination1: '',
                  acconfig2: '',
                  destination2: '',
                  acconfig3: '',
                  destination3: '',
                  acconfig4: '',
                  destination4: '',
                  acconfig5: '',
                  destination5: '',
                  acconfig6: '',
                  destination6: '',
                  acconfig7: '',
                  destination7: '',
                  acconfig8: '',
                  destination8: '',
                  acconfig9: '',
                  destination9: '',
                  acconfig10: '',
                  destination10: '',
                  notes: '',
                };
  }
  // validate data then fetch post
  validateAndFetch() {
    var errors = false;
    if (this.state.pilot == 'none') {
      errors = true;
      alert('Please select a pilot');
    }
    if (this.state.airplane == 'none') {
      errors = true;
      alert('Please select an airplane');
    }
    if (this.state.airplane == 'none') {
      errors = true;
      alert('Please select an airplane');
    }
    if (this.state.tachstart == '') {
      errors = true;
      alert('Please change tach start');
    }
    if (this.state.tachstop == '') {
      errors = true;
      alert('Please change tach end');
    }

    if (errors == false) {
      console.log(this.state);
      this.updateAirplane();
      this.createManifest();
    }
  }
  
  createManifest() {
    const {navigate} = this.props.navigation;
    fetch(fetchUrl+'/manifests', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pilot: this.state.pilot,
          airplane: this.state.aircraft,
          passengers: this.state.passengers,
          customer: this.state.customer,
          risk: this.state.risk,
          acpositioningtime: this.state.acpositioningtime,
          nonsptime: this.state.nonsptime,
          standby: this.state.standby,
          nightflyingtime: this.state.nightflyingtime,
          dutystart: this.state.dutystart,
          dutystop: this.state.dutystop,
          flightstart: this.state.flightstart,
          flightstop: this.state.flightstop,
          tachstart: this.state.tachstart,
          tachstop: this.state.tachstop,
          totaltach: this.state.totaltach,
          origin: this.state.origin,
          acconfig1: this.state.acconfig1,
          destination1: this.state.destination1,
          acconfig2: this.state.acconfig2,
          destination2: this.state.destination2,
          acconfig3: this.state.acconfig3,
          destination3: this.state.destination3,
          acconfig4: this.state.acconfig4,
          destination4: this.state.destination4,
          acconfig5: this.state.acconfig5,
          destination5: this.state.destination5,
          acconfig6: this.state.acconfig6,
          destination6: this.state.destination6,
          acconfig7: this.state.acconfig7,
          destination7: this.state.destination7,
          acconfig8: this.state.acconfig8,
          destination8: this.state.destination8,
          acconfig9: this.state.acconfig9,
          destination9: this.state.destination9,
          acconfig10: this.state.acconfig10,
          destination10: this.state.destination10,
          notes: this.state.notes,
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({

          dataSource: responseJson,
        }, function(){
          console.log(responseJson);
          alert('Airplane created successfully!');
          navigate('SeeAllAirplanes');
        });

      })
      .catch((error) =>{
        alert('There was a problem creating this Airplane');
      });
    return null;
  }
  render() {

    return (

      <ScrollView style={{padding: 10}}>
        <Text>
          Pilot:
        </Text>
        <Picker
          selectedValue={this.state.pilot}
          style={{height: 50, width: 250}}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({pilot: itemValue})
          }>
          <Picker.Item label="Select a Pilot" value="none" />

          {
            this.state.pilots.map( (v)=>{
             return <Picker.Item label={v.name} value={v._id} />
            })
          }

        </Picker>
        <Text>
          Aircraft:
        </Text>
        <Picker
          selectedValue={this.state.airplane}
          style={{height: 50, width: 250}}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({airplane: itemValue, tachstart: itemValue.tachtime, tachstop: itemValue.tachtime})

          }>
          <Picker.Item label="Select an Airplane" value="none" />

          {
            this.state.airplanes.map( (v)=>{
             return <Picker.Item label={v.acname} value={v} />
            })
          }
        </Picker>
        <Text>
          Passengers:
        </Text>
        <Picker
          selectedValue={this.state.passengers}
          style={{height: 50, width: 100}}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({passengers: itemValue})
          }>
          <Picker.Item label="0" value="0" />
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
          <Picker.Item label="4" value="4" />
          <Picker.Item label="5" value="5" />

        </Picker>
        <Text>
          Tach Out:
        </Text>
        <TextInput
          style={{height: 40}}
          onChangeText ={(tachstart) => this.setState({tachstart}, {tachstop})}
          onChange ={(tachstart) => this.setState({tachstart}, {tachstop})}
          value={this.state.tachstart}
        />
        <Text>
          Tach In:
        </Text>
        <TextInput
          style={{height: 40}}
          onChangeText ={(tachstop) => this.setState({tachstop})}
          value={this.state.tachstop}
        />
        <View style={styles.container}>
         <View style={styles.alternativeLayoutButtonContainer}>
           <Button
             title="Submit Manifest"
             onPress={() => this.validateAndFetch()}
           />

         </View>
       </View>
      </ScrollView>
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

exports.CreateFlightManifest = CreateFlightManifest
