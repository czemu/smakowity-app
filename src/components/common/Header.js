import React from 'react';
import { View, Text } from 'react-native';

const Header = (props) => {
    return (
        <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>{props.headerText}</Text>
        </View>
    );
};

const styles = {
    viewStyle: {
        height: 60,
        paddingTop: 15,
        backgroundColor: '#F8F8F8',
        justifyContent: 'center',
        alignItems: 'center'
    },

    textStyle: {
        fontSize: 20
    }
}

export default Header;
