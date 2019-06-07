import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { Header } from './src/components/common';
import Router from './src/Router';
import store from './src/store/configureStore';
import Colors from './src/constants/Colors';

export default class App extends React.Component {
  render() {
    return (
        <Provider store={store}>
          <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <Router />
          </View>
        </Provider>
    );
  }
}

const styles = {
  statusBar: {
      backgroundColor: Colors.redColor
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: Colors.backgroundColor,
  },
};
