import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import TabBarIcon from '../components/common/TabBarIcon';

export default class SearchScene extends React.Component {
    static navigationOptions = {
        title: 'Szukaj przepisów',
        tabBarLabel: 'Szukaj',
        tabBarIcon: ({ focused }) => (
            <TabBarIcon
                focused={focused}
                name={'md-search'}
            />
        )
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                <Text>Szukaj przepisów</Text>
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
