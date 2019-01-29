import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { Header } from './src/components/common';
import Router from './src/Router';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="default" backgroundColor="#fe6652" />
        <Router />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
