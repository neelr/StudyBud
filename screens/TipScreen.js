import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';
import firebase from 'firebase';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  AlertIOS
} from 'react-native';
firebase.initializeApp({
  serviceAccount: "../cred.json",
  databaseURL: "https://react-native-49e89.firebaseio.com"
});
var db = firebase.database();
var ref = db.ref("/locations");

export default class TipScreen extends React.Component {
  state = {
    location: null,
    errorMessage: null,
    key:21
  };
  render () {
    
	  const { location } = this.state;
	  console.log('these are props', this.props);
	  console.log('what is this.state.location?', this.state.location);
	loco = null;
    if (location) {
    loco = JSON.stringify(location.coords)

    poo = false;
    ref.orderByChild("dateAdded").limitToLast(1).on("value", function(snapshot) {
      if (poo) {
        console.log(Object.values(snapshot.val())[0])
        phone = Object.values(snapshot.val())[0].number;
        alert("New Group in Area! The phone is "+phone)
      }
      poo = true;
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    }); 
		return (
			<View style={styles.container}>
			  <ScrollView
				style={styles.container}
				contentContainerStyle={styles.contentContainer}>
        <TouchableOpacity onPress={this._send}>
        <Text style={{color:"teal",width:"100%",textAlign:"center"}}>Start a Group</Text>
        </TouchableOpacity>
				<MapView
					  initialRegion={{
					  latitude: location ? location.coords.latitude : 37.78825,
					  longitude: location ? location.coords.longitude : -122.4324,
					  latitudeDelta: 0.0922,
					  longitudeDelta: 0.0421,
					  }}
					  style={{height:Dimensions.get('window').height,width:Dimensions.get('window').width}}
				  />
			  </ScrollView>
			</View>
		  );
	}
	return null;
  }
  async _send () {
    let location = await Location.getCurrentPositionAsync({});
    AlertIOS.prompt('Enter your phone number!', null, (text) => {
      console.log(text)
          ref.push({location:location,number:text})
    });
  }
  _getLocationAsync = async () => {
    let result = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    if ( result.status === 'granted') {
        console.log('Notification permissions granted.')
    }
    console.log("AJSIH")
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };
  componentWillMount() {
    this._getLocationAsync();
    Notifications.scheduleLocalNotificationAsync(
      {
        title: 'done',
        body: 'done!'
    }, {
      time: (new Date()).getTime() + 100
  }
    );
  }
}

TipScreen.navigationOptions = {
  title:"StudyBud"
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
