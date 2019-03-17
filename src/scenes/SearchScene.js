import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'expo';
import TabBarIcon from '../components/common/TabBarIcon';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import SearchHeader from '../components/common/SearchHeader';
import RecipeList from '../components/Recipe/RecipeList';
import Colors from '../constants/Colors';

class SearchScene extends React.Component {
    static navigationOptions = {
        headerTitle: () => <SearchHeader placeholder="Szukana fraza..." />,
        tabBarLabel: 'Szukaj',
        tabBarIcon: ({ focused }) => (
            <TabBarIcon
                focused={focused}
                name={'md-search'}
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
        // this.props.fetchCategoryRecipes(this.props.id, this.state.limit, 0);
    }

    _onRefresh() {
        this.setState({offset: this.state.limit});
        this.props.refreshCategoryRecipes(this.props.id, this.state.limit);
    }

    _onEndReached() {
        if ( ! this.props.loadingCategory && ! this.props.refreshingCategory && (this.state.offset + this.state.more_items) <= this.state.max_items) {
            this.setState({offset: this.state.offset + this.state.more_items});
            this.props.fetchMoreCategoryRecipes(this.props.id, this.state.more_items, this.state.offset);
        }
    }

    _renderEmptyInfo = () => {
        return (
            <ScrollView contentContainerStyle={styles.noResults}>
                <Icon.Ionicons
                    name={'md-search'}
                    size={100}
                    color={'#999'}
                 />
                <Text style={styles.noResultsText}>Wpisz tekst do pola powyżej, aby wyszukać przepisy.</Text>
            </ScrollView>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <RecipeList
                    loading={this.props.loadingSearchResults}
                    refreshing={this.props.refreshingSearchResults}
                    recipes={this.props.searchResults}
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

    noResults: {
        flex: 1,
        alignItems: 'center',
        marginTop: '50%',
        padding: 8,
    },

    noResultsText: {
        marginTop: 15,
        fontSize: 20,
        textAlign: 'center',
        color: '#999'
    }
};

const mapStateToProps = (state, ownProps) => {
    const reducer = state.RecipesReducer;
    const { searchResults, loadingSearchResults, refreshingSearchResults } = reducer;

    return { searchResults, loadingSearchResults, refreshingSearchResults };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchFavoritedRecipes: (recipeIds, limit, offset) => dispatch(fetchFavoritedRecipes(recipeIds, limit, offset)),
        fetchMoreFavoritedRecipes: (recipeIds, limit, offset) => dispatch(fetchMoreFavoritedRecipes(recipeIds, limit, offset)),
        refreshFavoritedRecipes: (recipeIds, limit) => dispatch(refreshFavoritedRecipes(recipeIds, limit)),
        getFavoriteIds: () => dispatch(getFavoriteIds()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchScene);
