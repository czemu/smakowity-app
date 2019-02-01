import React from 'react';
import { View, Text, Image } from 'react-native';
import { Icon } from 'expo';
import Colors from '../../constants/Colors';

const RecipeBox = (props) => {
    return (
        <View style={[styles.container, {marginTop: props.index == 0 ? 0 : 8}]}>
            <View style={styles.imageWrapper}>
                <Image style={styles.image} source={{uri: props.recipe.img_url}} resizeMode="cover" />
                <View style={styles.favContainer}>
                    <Icon.Ionicons
                        style={styles.favIcon}
                        name={'md-heart'}
                        size={24}
                        color="#fff"
                     />
                </View>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.recipeName} numberOfLines={1} ellipsizeMode="tail">{props.recipe.name}</Text>
            </View>
        </View>
    );
};

const styles = {
    container: {
        flex: 1,
        borderRadius: 6,
        overflow: 'hidden',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 1
    },
    imageWrapper: {
        height: 150,
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
    favContainer: {
        width: 40,
        height: 40,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        position: 'absolute',
        top: 8,
        right: 8,
        elevation: 0
    },
    favIcon: {
        marginTop: 3,
    },
    detailsContainer: {
        padding: 10,
        paddingBottom: 13
    },
    recipeName: {
        fontSize: 18
    }
}

export default RecipeBox;
