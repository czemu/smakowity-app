import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Icon } from 'expo';
import TabBarIcon from '../components/common/TabBarIcon';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import {
    fetchFavoritedRecipes,
    fetchMoreFavoritedRecipes,
    refreshFavoritedRecipes,
    getFavoriteIds
} from '../actions/RecipeActions';
import RecipeList from '../components/Recipe/RecipeList';
import Colors from '../constants/Colors';

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
            more_items: 10,
            max_items: 100
        }
    }


    componentDidMount() {
        this.setState({offset: this.state.limit});
        this.props.getFavoriteIds();
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

    _renderEmptyInfo = () => {
        return (
            <ScrollView contentContainerStyle={styles.noFavorites}>
                <Icon.Ionicons
                    name={'md-heart'}
                    size={100}
                    color={'#999'}
                 />
                <Text style={styles.noFavoritesText}>Nie masz jeszcze żadnych polubionych przepisów.</Text>
            </ScrollView>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <RecipeList
                    loading={this.props.loadingFavorited}
                    refreshing={this.props.refreshingFavorited}
                    recipes={this.props.favoritedRecipes}
                    onRefresh={this._onRefresh.bind(this)}
                    onEndReached={this._onEndReached.bind(this)}
                    initialNumToRender={this.state.limit}
                    onEndReachedThreshold={0.5}
                    removeOnUnfavorite={true}
                    ListEmptyComponent={this._renderEmptyInfo}
                />
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
    },

    noFavorites: {
        flex: 1,
        alignItems: 'center',
        marginTop: '50%',
        padding: 8,
    },

    noFavoritesText: {
        marginTop: 15,
        fontSize: 20,
        textAlign: 'center',
        color: '#999'
    }
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
        getFavoriteIds: () => dispatch(getFavoriteIds()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesScene);
