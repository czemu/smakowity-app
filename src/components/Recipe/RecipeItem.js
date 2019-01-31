import React from 'react';
import { View, Text, Image } from 'react-native';

const RecipeBox = (props) => {
    return (
        <View style={[styles.container, {marginTop: props.index == 0 ? 0 : 15}]}>
            <View style={styles.imageWrapper}>
                <Image style={styles.image} source={{uri: props.recipe.img_url}} resizeMode="cover" />
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.recipeName}>{props.recipe.name}</Text>
            </View>
        </View>
    );
};

const styles = {
    container: {
        flex: 1,
        borderRadius: 6,
        overflow: 'hidden',
        backgroundColor: '#fff'
    },
    imageWrapper: {
        height: 200,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    image: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    detailsContainer: {
        padding: 10,
    },
    recipeName: {
        fontSize: 18
    }
}

export default RecipeBox;
