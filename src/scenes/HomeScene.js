import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import TabBarIcon from '../components/TabBarIcon';
import { Subheader } from '../components/common';

export default class HomeScene extends React.Component {
    static navigationOptions = {
        header: null,
        tabBarLabel: 'Start',
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
            focused={focused}
            name={'md-home'}
          />
      )
    };

    componentWillMount() {
        console.log('home mount');
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <Subheader>Polecane przepisy</Subheader>
                <Text onPress={() => {
                    // Actions.categories({type: 'reset'});
                    Actions.categories();
                }}>Kategorie</Text>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        backgroundColor: '#fafafa',
    },
});
