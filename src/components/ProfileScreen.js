import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

const ProfileScreen = (props) => (
  <View style={styles.container}>
    <Text style={styles.welcome}>
      {'welcome ' + props.auth.username}
    </Text>
  </View>
);

ProfileScreen.navigationOptions = {
  title: 'Profile',
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(ProfileScreen);
