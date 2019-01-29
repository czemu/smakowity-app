import React from 'react';
import { View, Text } from 'react-native';

const RecipeDetail = (props) => {
    return (
        <View>
            <Text>{props.recipe.name}</Text>
        </View>
    );
};

export default RecipeDetail;
