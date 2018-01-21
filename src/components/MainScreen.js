import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import LoginStatusMessage from './LoginStatusMessage';
import AuthButton from './AuthButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

const MainScreen = (props) => {
  debugger;
  return (
    <View style={styles.container}>
      <Text>{"Hello " + props.auth.username}</Text>
      <LoginStatusMessage />
      <AuthButton />
    </View>
  );
}

MainScreen.navigationOptions = {
  title: 'Home Screen',
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(MainScreen);
