import React from 'react';
import { ActivityIndicator, ScrollView, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import RecipeItem from './RecipeItem';
import Colors from '../../constants/Colors';

class RecipeList extends React.Component {

    _keyExtractor = (item, index) => item.id.toString();

    _renderItem({item}) {
        return <RecipeItem recipe={item} />
    }

    _renderFooter() {
        if (this.props.loading) {
            return (
                <View style={{paddingVertical: 20}}>
                    <ActivityIndicator size="large" color={Colors.redColor} style={styles.indicator} />
                </View>
            );
        }

        return null;
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.recipes}
                    renderItem={this._renderItem}
                    keyExtractor={this._keyExtractor}
                    style={styles.container}
                    contentContainerStyle={{paddingHorizontal: 8, paddingBottom: 8}}
                    onRefresh={this.props.onRefresh}
                    refreshing={this.props.refreshing}
                    onEndReached={this.props.onEndReached}
                    ListFooterComponent={this._renderFooter.bind(this)}
                />
            </View>
        );
    }
};

const styles = {
    container: {
        flex: 1,
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
