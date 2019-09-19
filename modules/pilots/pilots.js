import React from 'react';
import { FlatList, TextInput, ActivityIndicator, Text, Picker, ScrollView, View, StyleSheet, AsyncStorage  } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import { Icon, CheckBox, Button } from 'react-native-elements';

var fetchUrl = require('../../config').FetchUrl;



class CreateNewPilot extends React.Component {
  static navigationOptions = {
    title: 'Create New Pilot',
  };
  componentDidMount() {
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
      if (auth_token != 'none') {
        this.setState({'tokenmatch': true})
      }
      return auth_token;
    }
    getUserId();
  }
  constructor(props) {
    super(props);

    this.state = {name: '',
                  email: '',
                  title: '',
                  certificatetype: '',
                  certnumber: '',
                  medicalclass: '',
                  faasedue: '',
                  faamedue: '',
                  faainstdue: '',
                  faainsttype: '',
                  opsapproved: '',
                  acapproved: '',
                  checkairmandue: '',
                  me: false,
                  se: true,
                  ifr: false,
                  vfr: false,
                  c172: false,
                  c180: false,
                  c206: false,
                  c210: false,
                  c340: false,
                  asel: false,
                  amel: false,
                  cfi: false,
                  cfii: false,
                  atp: false,
                  comm: false,
                  mel: false,
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
    if (this.state.ifr == false && this.state.vfr == false) {
      errors = true;
      alert('You must select at least one operations approved for this pilot.');
    }
    let certtype = '';
    if(this.state.asel) {
      certtype += '|ASEL'
    }
    if(this.state.AMEL) {
      certtype += '|AMEL'
    }
    if(this.state.atp) {
      certtype += '|ATP'
    }
    if(this.state.comm) {
      certtype += '|COMM'
    }
    if(this.state.mei) {
      certtype += '|MEI'
    }
    if(this.state.cfi) {
      certtype += '|CFI'
    }
    if(this.state.cfii) {
      certtype += '|CFII'
    }
    certtype = certtype.trimLeft('|');
    this.setState({certificatetype: certtype});
    let opsapproved = '';
    if (this.state.ifr) {
      opsapproved += ' IFR,';
    }
    if (this.state.vfr) {
      opsapproved += ' VFR,';
    }
    opsapproved = opsapproved.trimRight(',').trimLeft(' ');
    this.setState({opsapproved: opsapproved});
    let aircraftstring;
    if (this.state.c172) {
      aircraftstring += ' 172,';
    }
    if (this.state.c180) {
      aircraftstring += ' 180,';
    }
    if (this.state.c206) {
      aircraftstring += ' 206,';
    }
    if (this.state.c340) {
      aircraftstring += ' 340,';
    }
    aircraftstring = aircraftstring.trimRight(',').trimLeft(' ');
    this.setState({acapproved: aircraftstring});
    let insttype = '';
    if (this.state.me) {
      insttype = 'ME';
    }
    if (this.state.se) {
      insttype = 'SE';
    }
    this.setState({faainsttype: insttype});



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
          'x-access-token': this.state.token,
        },
        body: JSON.stringify({
          name: this.state.name,
          email: this.state.email,
          title: this.state.title,
          cert: this.state.certificatetype,
          certnumber: this.state.certnumber,
          medicalclass: this.state.medicalclass,
          faasedue: this.state.faasedue,
          faamedue: this.state.faamedue,
          faainstdue: this.state.faainstdue,
          faainsttype: this.state.faainsttype,
          opsapproved: this.state.opsapproved,
          acapproved: this.state.acapproved,
          daycurrent: this.state.daycurrent,
          nightcurrent: this.state.nightcurrent,
          checkairmandue: this.state.checkairmandue
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({

          dataSource: responseJson,
        }, function(){
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
        <CheckBox
          title='ASEL'
          checked={this.state.asel}
          onPress={() => this.setState({asel: !this.state.asel})}
        />
        <CheckBox
          title='AMEL'
          checked={this.state.amel}
          onPress={() => this.setState({amel: !this.state.amel})}
        />
        <CheckBox
          title='CFI'
          checked={this.state.cfi}
          onPress={() => this.setState({cfi: !this.state.cfi})}
        />
        <CheckBox
          title='CFII'
          checked={this.state.cfii}
          onPress={() => this.setState({cfii: !this.state.cfii})}
        />
        <CheckBox
          title='ATP'
          checked={this.state.atp}
          onPress={() => this.setState({atp: !this.state.atp})}
        />
        <CheckBox
          title='COMM'
          checked={this.state.comm}
          onPress={() => this.setState({comm: !this.state.comm})}
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
        <CheckBox
          title='Multi'
          checked={this.state.me}
          onPress={() => this.setState({me: !this.state.me, se: !this.state.se})}
        />
        <CheckBox
          title='Single'
          checked={this.state.se}
          onPress={() => this.setState({se: !this.state.se, me: !this.state.me})}
        />
        <Text>
          135 Operations Approved:
        </Text>

        <CheckBox
          title='IFR'
          checked={this.state.ifr}
          onPress={() => this.setState({ifr: !this.state.ifr})}
        />
        <CheckBox
          title='VFR'
          checked={this.state.vfr}
          onPress={() => this.setState({vfr: !this.state.vfr})}
        />
        <Text>
          Aircraft Approved:
        </Text>
        <CheckBox
          title='C172'
          checked={this.state.c172}
          onPress={() => this.setState({c172: !this.state.c172})}
        />
        <CheckBox
          title='C180'
          checked={this.state.c180}
          onPress={() => this.setState({c180: !this.state.c180})}
        />
        <CheckBox
          title='C206'
          checked={this.state.c206}
          onPress={() => this.setState({c206: !this.state.c206})}
        />
        <CheckBox
          title='C210'
          checked={this.state.c210}
          onPress={() => this.setState({c210: !this.state.c210})}
        />
        <CheckBox
          title='C340'
          checked={this.state.c340}
          onPress={() => this.setState({c340: !this.state.c340})}
        />
        <Text>
          Currency:
        </Text>
        <CheckBox
          title='Day Current'
          checked={this.state.daycurrent}
          onPress={() => this.setState({daycurrent: !this.state.daycurrent})}
        />
        <CheckBox
          title='Night Current'
          checked={this.state.nightcurrent}
          onPress={() => this.setState({nightcurrent: !this.state.nightcurrent})}
        />
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
  static navigationOptions = {
    title: 'Update Pilot',
  };
  componentDidMount(){

    const {params} = this.props.navigation.state;

    return fetch(fetchUrl+'/pilots/'+params.id, {
        method: 'GET',

      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          name: responseJson.name,
          email: responseJson.email,
          title: responseJson.title,
          certificatetype: responseJson.cert,
          certnumber: responseJson.certnumber,
          medicaldue: responseJson.medicaldue,
          medicalclass: responseJson.medicalclass,
          faasedue: responseJson.faasedue,
          faamedue: responseJson.faamedue,
          faainstdue: responseJson.faainstdue,
          faainsttype: responseJson.faainsttype,
          opsapproved: responseJson.opsapproved,
          acapproved: responseJson.acapproved,
          daycurrent: responseJson.daycurrent,
          nightcurrent: responseJson.nightcurrent,
          checkairmandue: responseJson.checkairmandue,
          ifr: responseJson.opsapproved.includes('IFR'),
          vfr: responseJson.opsapproved.includes('VFR'),
          c172: responseJson.acapproved.includes('172'),
          c180: responseJson.acapproved.includes('180'),
          c206: responseJson.acapproved.includes('206'),
          c210: responseJson.acapproved.includes('210'),
          c340: responseJson.acapproved.includes('340'),
          asel: responseJson.cert.includes('ASEL'),
          amel: responseJson.cert.includes('AMEL'),
          cfi: responseJson.cert.includes('CFI'),
          cfii: responseJson.cert.includes('CFII'),
          atp: responseJson.cert.includes('ATP'),
          comm: responseJson.cert.includes('COMM'),
          mel: responseJson.cert.includes('MEL'),
        });
        if (responseJson.faainsttype) {
          this.setState({
            me: responseJson.faainsttype.includes('ME'),
            se: responseJson.faainsttype.includes('SE'),
          });

        } else {
          this.setState({
            me: false,
            se: true,
          });
        }


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
                  certificatetype: '',
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
                  checkairmandue: '',
                  me: false,
                  se: true,
                  ifr: false,
                  vfr: false,
                  c172: false,
                  c180: false,
                  c206: false,
                  c210: false,
                  c340: false,
                  asel: false,
                  amel: false,
                  cfi: false,
                  cfii: false,
                  atp: false,
                  comm: false,
                  mel: false,
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
    if (this.state.ifr == false && this.state.vfr == false) {
      errors = true;
      alert('You must select at least one operations approved for this pilot.');
    }
    let certtype = '';
    if(this.state.asel) {
      certtype += '|ASEL'
    }
    if(this.state.amel) {
      certtype += '|AMEL'
    }
    if(this.state.atp) {
      certtype += '|ATP'
    }
    if(this.state.comm) {
      certtype += '|COMM'
    }
    if(this.state.mei) {
      certtype += '|MEI'
    }
    if(this.state.cfi) {
      certtype += '|CFI'
    }
    if(this.state.cfii) {
      certtype += '|CFII'
    }
    certtype = certtype.trimLeft('|');
    this.setState({certificatetype: certtype});
    let opsapproved = '';
    if (this.state.ifr) {
      opsapproved += ' IFR,';
    }
    if (this.state.vfr) {
      opsapproved += ' VFR,';
    }
    opsapproved = opsapproved.trimRight(',').trimLeft(' ');
    this.setState({opsapproved: opsapproved});
    let aircraftstring;
    if (this.state.c172) {
      aircraftstring += ' 172,';
    }
    if (this.state.c180) {
      aircraftstring += ' 180,';
    }
    if (this.state.c206) {
      aircraftstring += ' 206,';
    }
    if (this.state.c340) {
      aircraftstring += ' 340,';
    }
    aircraftstring = aircraftstring.trimRight(',').trimLeft(' ');
    this.setState({acapproved: aircraftstring});
    let insttype = '';
    if (this.state.me) {
      insttype = 'ME';
    }
    if (this.state.se) {
      insttype = 'SE';
    }
    this.setState({faainsttype: insttype});



    if (errors == false) {
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
          cert: this.state.certificatetype,
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
        <CheckBox
          title='ASEL'
          checked={this.state.asel}
          onPress={() => this.setState({asel: !this.state.asel})}
        />
        <CheckBox
          title='AMEL'
          checked={this.state.amel}
          onPress={() => this.setState({amel: !this.state.amel})}
        />
        <CheckBox
          title='CFI'
          checked={this.state.cfi}
          onPress={() => this.setState({cfi: !this.state.cfi})}
        />
        <CheckBox
          title='CFII'
          checked={this.state.cfii}
          onPress={() => this.setState({cfii: !this.state.cfii})}
        />
        <CheckBox
          title='ATP'
          checked={this.state.atp}
          onPress={() => this.setState({atp: !this.state.atp})}
        />
        <CheckBox
          title='COMM'
          checked={this.state.comm}
          onPress={() => this.setState({comm: !this.state.comm})}
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
        <CheckBox
          title='Multi'
          checked={this.state.me}
          onPress={() => this.setState({me: !this.state.me, se: !this.state.se})}
        />
        <CheckBox
          title='Single'
          checked={this.state.se}
          onPress={() => this.setState({se: !this.state.se, me: !this.state.me})}
        />
        <Text>
          135 Operations Approved:
        </Text>

        <CheckBox
          title='IFR'
          checked={this.state.ifr}
          onPress={() => this.setState({ifr: !this.state.ifr})}
        />
        <CheckBox
          title='VFR'
          checked={this.state.vfr}
          onPress={() => this.setState({vfr: !this.state.vfr})}
        />
        <Text>
          Aircraft Approved:
        </Text>
        <CheckBox
          title='C172'
          checked={this.state.c172}
          onPress={() => this.setState({c172: !this.state.c172})}
        />
        <CheckBox
          title='C180'
          checked={this.state.c180}
          onPress={() => this.setState({c180: !this.state.c180})}
        />
        <CheckBox
          title='C206'
          checked={this.state.c206}
          onPress={() => this.setState({c206: !this.state.c206})}
        />
        <CheckBox
          title='C210'
          checked={this.state.c210}
          onPress={() => this.setState({c210: !this.state.c210})}
        />
        <CheckBox
          title='C340'
          checked={this.state.c340}
          onPress={() => this.setState({c340: !this.state.c340})}
        />
        <Text>
          Currency:
        </Text>
        <CheckBox
          title='Day Current'
          checked={this.state.daycurrent}
          onPress={() => this.setState({daycurrent: !this.state.daycurrent})}
        />
        <CheckBox
          title='Night Current'
          checked={this.state.nightcurrent}
          onPress={() => this.setState({nightcurrent: !this.state.nightcurrent})}
        />
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

class SeeAllPilots extends React.Component {
  static navigationOptions = {
    title: 'Pilots',
  };


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
                <Button
                  icon={
                    <Icon
                      name = "edit"
                      type="font-awesome"
                      />
                  }
                  onPress={
                    () => navigate('UpdatePilot', {id: item._id})
                  }
                  title=" Update"
                />
                <Button
                  icon={
                    <Icon
                      name = "trash"
                      type="font-awesome"
                      />
                  }
                  onPress={
                    () => this.deletePilot(item._id)
                  }
                  title=" Delete"
                />
            </View>
          </View>
          }
          keyExtractor={(id, index) => index.toString()}
        />
        <Button
          icon={
            <Icon
              name = "user-plus"
              type="font-awesome"
              />
          }
          title=" Create New Pilot!"
          onPress={
            () => navigate('CreateNewPilot')
          }
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
