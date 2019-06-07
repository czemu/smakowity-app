import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'expo';
import TabBarIcon from '../components/common/TabBarIcon';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import SearchHeader from '../components/common/SearchHeader';
import RecipeList from '../components/Recipe/RecipeList';
import {
    fetchSearchRecipes,
    refreshSearchRecipes,
    fetchMoreSearchRecipes,
    updateFavoriteStatus,
} from '../actions/RecipeActions';
import Colors from '../constants/Colors';

class SearchScene extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: () => (
                <SearchHeader
                    placeholder="Szukana fraza..."
                    onChangeText={navigation.getParam('searchFunc')}
                />),
            tabBarLabel: 'Szukaj',
            tabBarIcon: ({ focused }) => (
                <TabBarIcon
                    focused={focused}
                    name={'md-search'}
                />
            )
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            searchText: null,
            limit: 10,
            offset: 0,
            more_items: 5,
            max_items: 100
        }
    }

    searchFunction = (text) => {
       this.setState({searchText: text});
       this.props.fetchSearchRecipes(text, this.state.limit, 0);
    }

    componentDidMount() {
        this.props.navigation.setParams({searchFunc: this.searchFunction});

        this.setState({offset: this.state.limit});
    }

    componentWillUnmount() {
        this.props.navigation.setParams({searchFunc: null})
    }

    _onRefresh() {
        this.setState({offset: this.state.limit});
        this.props.refreshSearchRecipes(this.state.searchText, this.state.limit);
    }

    _onEndReached() {
        if ( ! this.props.loadingSearchRecipes && ! this.props.refreshingSearchRecipes && (this.state.offset + this.state.more_items) <= this.state.max_items) {
            this.setState({offset: this.state.offset + this.state.more_items});
            this.props.fetchMoreSearchRecipes(this.state.searchText, this.state.more_items, this.state.offset);
        }
    }

    _renderEmptyInfo = () => {
        if (this.state.searchText != null && this.state.searchText != '') {
            return <Text style={styles.noResultsText}>Brak wyników wyszukiwania.</Text>;
        }

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
                    loading={this.props.loadingSearchRecipes}
                    refreshing={this.props.refreshingSearchRecipes}
                    recipes={this.props.searchRecipes}
                    onRefresh={this._onRefresh.bind(this)}
                    onEndReached={this._onEndReached.bind(this)}
                    initialNumToRender={this.state.limit}
                    onEndReachedThreshold={0.7}
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
    const { searchRecipes, loadingSearchRecipes, refreshingSearchRecipes } = reducer;

    return { searchRecipes, loadingSearchRecipes, refreshingSearchRecipes };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchSearchRecipes: (query, limit, offset) => dispatch(fetchSearchRecipes(query, limit, offset)),
        fetchMoreSearchRecipes: (query, limit, offset) => dispatch(fetchMoreSearchRecipes(query, limit, offset)),
        refreshSearchRecipes: (query, limit) => dispatch(refreshSearchRecipes(query, limit)),
        updateFavoriteStatus: () => dispatch(updateFavoriteStatus())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchScene);
