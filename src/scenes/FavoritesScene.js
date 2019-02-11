import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import TabBarIcon from '../components/common/TabBarIcon';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import {
    fetchFavoritedRecipes,
    fetchMoreFavoritedRecipes,
    refreshFavoritedRecipes,
    getFavorites
} from '../actions/RecipeActions';
import RecipeList from '../components/Recipe/RecipeList';

class FavoritesScene extends React.Component {
    static navigationOptions = {
        title: 'Ulubione przepisy',
        tabBarLabel: 'Ulubione',
        tabBarIcon: ({ focused }) => (
            <TabBarIcon
                focused={focused}
                name={'md-heart'}
            />
        )
    };

    constructor(props) {
        super(props);

        this.state = {
            limit: 10,
            offset: 0,
            more_items: 5,
            max_items: 100
        }
    }

    componentDidMount() {
        this.setState({offset: this.state.limit});
        this.props.getFavorites();
        this.props.fetchFavoritedRecipes(this.props.favoriteIds, this.state.limit, 0);
    }

    _onRefresh() {
        this.setState({offset: this.state.limit});
        this.props.refreshFavoritedRecipes(this.props.favoriteIds, this.state.limit);

    }

    _onEndReached() {
        if ( ! this.props.loadingFavorited && ! this.props.refreshingFavorited && (this.state.offset + this.state.more_items) <= this.state.max_items) {
            this.setState({offset: this.state.offset + this.state.more_items});
            this.props.fetchMoreFavoritedRecipes(this.props.favoriteIds, this.state.more_items, this.state.offset);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <RecipeList
                    loading={this.props.loadingFavorited}
                    refreshing={this.props.refreshingFavorited}
                    recipes={this.props.favoritedRecipes}
                    onRefresh={this._onRefresh.bind(this)}
                    // onEndReached={this._onEndReached.bind(this)}
                    initialNumToRender={this.state.limit}
                    onEndReachedThreshold={1}
                    removeOnUnfavorite={true}
                />
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
    },
};

const mapStateToProps = (state, ownProps) => {
    const reducer = state.RecipesReducer;
    const { favoriteIds, favoritedRecipes, loadingFavorited, refreshingFavorited } = reducer;

    return { favoriteIds, favoritedRecipes, loadingFavorited, refreshingFavorited };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchFavoritedRecipes: (recipeIds, limit, offset) => dispatch(fetchFavoritedRecipes(recipeIds, limit, offset)),
        fetchMoreFavoritedRecipes: (recipeIds, limit, offset) => dispatch(fetchMoreFavoritedRecipes(recipeIds, limit, offset)),
        refreshFavoritedRecipes: (recipeIds, limit) => dispatch(refreshFavoritedRecipes(recipeIds, limit)),
        getFavorites: () => dispatch(getFavorites()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesScene);
