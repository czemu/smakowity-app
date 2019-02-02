import React from 'react';
import { ActivityIndicator, ScrollView, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import RecipeItem from './RecipeItem';
import Colors from '../../constants/Colors';

class RecipeList extends React.PureComponent {

    _keyExtractor = (item, index) => item.id.toString();

    _renderItem({item}) {
        return <RecipeItem recipe={item} />
    }

    componentDidMount() {
        console.log('mounted RecipeList');
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
                contentContainerStyle={{paddingHorizontal: 8, paddingBottom: 8}}
                onRefresh={this.props.onRefresh}
                refreshing={this.props.refreshing}
                onEndReached={() => console.log('end')}
            />
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

const mapStateToProps = (state, ownProps) => {
    const reducer = state.RecipesReducer;
    const { recipes, loading, refreshing } = reducer;

    return { recipes, loading, refreshing };
};

export default connect(mapStateToProps)(RecipeList);
