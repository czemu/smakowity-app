import React from 'react';
import { Text } from 'react-native';

const Subheader = (props) => {
    return (
        <Text style={styles.textStyle}>{props.children}</Text>
    );
};

const styles = {
    textStyle: {
        height: 20,
    },
}

export default Subheader;
