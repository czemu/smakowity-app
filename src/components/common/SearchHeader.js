import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Icon } from 'expo';

export default class SearchHeader extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    onChangeText={this.props.onChangeText}
                    placeholder={this.props.placeholder}
                    placeholderTextColor="#999"
                />
                <Icon.Ionicons
                  name={'md-search'}
                  size={26}
                  color="#999"
                  style={styles.icon}
                />
            </View>
        );
    }
};

const styles = {
    container: {
        flex: 1,
        paddingHorizontal: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        paddingLeft: 36,
        paddingRight: 8,
        paddingVertical: 5,
        borderRadius: 6,
        backgroundColor: '#f5f5f5',
        alignSelf: 'stretch',
    },
    icon: {
        position: 'absolute',
        top: 5,
        left: 16
    }
}
