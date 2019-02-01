import React, { PureComponent } from 'react';
import { ActivityIndicator, ScrollView, View, FlatList } from 'react-native';
import RecipeItem from './RecipeItem';
import Colors from '../../constants/Colors';

class RecipeList extends PureComponent {
    _keyExtractor = (item, index) => item.id.toString();

    _renderItem({item}) {
        return <RecipeItem recipe={item} />
    }

    render() {
        if (this.props.loading) {
            return (
                <View style={styles.indicatorContainer}>
                    <ActivityIndicator size="large" color={Colors.redColor} style={styles.indicator} />
                </View>
            );
        }

        return (
            <FlatList
                data={this.props.recipes}
                renderItem={this._renderItem}
                keyExtractor={this._keyExtractor}
                style={styles.container}
                contentContainerStyle={{paddingBottom: 8}}
            />
        );
    }
};

const styles = {
    container: {
        flex: 1,
        paddingHorizontal: 8
    },

    indicatorContainer: {
        flex: 1,
        alignItems: 'center',
        jusifyContent: 'center'
    },

    indicator: {
        flex: 1
    }
}

export default RecipeList;
