import React, { Component } from 'react';
import { Image, Linking, StyleSheet, Platform, Text, View, Button } from 'react-native';

export default class App extends Component {

  state = {
    user: undefined, // user has not logged in yet
    user_string: "Stranger"
  };

  // Set up Linking
  componentDidMount() {
    // Add event listener to handle OAuthLogin:// URLs
    Linking.addEventListener('url', this.handleOpenURL);
    // Launched from an external URL
    Linking.getInitialURL().then((url) => {
      if (url) {
        this.handleOpenURL({ url });
      }
    });
  };

  componentWillUnmount() {
    // Remove event listener
    Linking.removeEventListener('url', this.handleOpenURL);
  };

  handleOpenURL = ({ url }) => {
    // Extract stringified user string out of the URL
    const [, user_string] = url.match(/user=([^#]+)/);
    this.setState({
      // Decode the user string and parse it into JSON
      // user: JSON.parse(decodeURI(user_string)),
      user_string: user_string
    });
    if (Platform.OS === 'ios') {
      SafariView.dismiss();
    }
  };

  // Handle Login with Facebook button tap
  loginWithFacebook = () => this.openURL('https://localhost:3000/auth/facebook');

  // Handle Login with Google button tap
  loginWithGoogle = () => this.openURL('http://192.168.0.100.xip.io/auth/api/account/ExternalLogin');

  // Open URL in a browser
  openURL = (url) => {
    // Use SafariView on iOS
    if (Platform.OS === 'ios') {
      SafariView.show({
        url: url,
        fromBottom: true,
      });
    }
    // Or Linking.openURL on Android
    else {
      Linking.openURL(url);
    }
  };

  render() {
    const { user } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          Welcome {this.state.user_string}!
              </Text>
        {user
          ? // Show user info if already logged in
          <View style={styles.content}>
            <Text style={styles.header}>
              Welcome {user.user_string}!
              </Text>
            <View style={styles.avatar}>
              <Image source={{ uri: user.avatar }} style={styles.avatarImage} />
            </View>
          </View>
          : // Show Please log in message if not
          <View style={styles.content}>
            <Text style={styles.header}>
              Welcome Stranger!
            </Text>
            <View style={styles.avatar}>
              <Text>avatar</Text>
            </View>
            <Text style={styles.text}>
              Please log in to continue {'\n'}
              to the awesomness
              </Text>
          </View>
        }
        {/* Login buttons */}
        <View style={styles.buttons}>
          <Button
            onPress={this.loginWithFacebook}
            title="facebook"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
          <Button
            onPress={this.loginWithGoogle}
            title="google"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
      </View>
    );
  }
}

const iconStyles = {
  borderRadius: 10,
  iconStyle: { paddingVertical: 5 },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    margin: 20,
  },
  avatarImage: {
    borderRadius: 50,
    height: 100,
    width: 100,
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  text: {
    textAlign: 'center',
    color: '#333',
    marginBottom: 5,
  },
  buttons: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 20,
    marginBottom: 30,
  },
});