import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import TabBarIcon from '../components/TabBarIcon';

export default class CategoriesScene extends React.Component {
    static navigationOptions = {
        title: 'Kategorie przepisów',
        tabBarLabel: 'Kategorie',
        tabBarIcon: ({ focused }) => (
            <TabBarIcon
                focused={focused}
                name={'md-apps'}
            />
        )
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                <Text>Kategorie</Text>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
});
