import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { Header } from './src/components/common';
import Router from './src/Router';
import Store from './src/Store';

// let store = null;

export default class App extends React.Component {
  // constructor(props) {
  //     super(props);
  //
  //     if (store == null) {
  //         store = Store(() => this.setState({recipes: []}))
  //     }
  // }

  render() {
    return (
        <Provider store={Store}>
          <View style={styles.container}>
            <StatusBar barStyle="default" backgroundColor="#fe6652" />
            <Router />
          </View>
        </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
