import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import TabBarIcon from '../components/TabBarIcon';

export default class FavoritesScene extends React.Component {
    static navigationOptions = {
        title: 'Ulubione przepisy',
        tabBarLabel: 'Ulubione',
        tabBarIcon: ({ focused }) => (
            <TabBarIcon
                focused={focused}
                name={'md-heart'}
            />
        )
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                <Text>Ulubione</Text>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
});
