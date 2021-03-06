import React from 'react';
import { ScrollView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as Icon from '@expo/vector-icons';
import TabBarIcon from '../components/common/TabBarIcon';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import SearchHeader from '../components/common/SearchHeader';
import RecipeList from '../components/Recipe/RecipeList';
import {
    fetchSearchRecipes,
    refreshSearchRecipes,
    fetchMoreSearchRecipes,
    updateSearchText,
    clearSearchRecipes,
    updateFavoriteStatus
} from '../actions/RecipeActions';
import Colors from '../constants/Colors';

class SearchScene extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: () => (
                <SearchHeader
                    placeholder="Wpisz nazwę przepisu"
                    onChangeText={navigation.getParam('searchFunc')}
                    onClear={navigation.getParam('onClear')}
                />),
            headerForceInset: { top: 'never', bottom: 'never' },
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

        this.timeout = 0;

        this.state = {
            limit: 20,
            offset: 0,
            more_items: 20,
            max_items: 500,
            timeout: 0
        }
    }

    searchFunction = (text) => {
       this.props.updateSearchText(text);

       if (text.length) {

           if (this.timeout) {
               clearTimeout(this.timeout);
           }

           this.timeout = setTimeout(() => {
               this.props.fetchSearchRecipes(text.trim(), this.state.limit, 0);
           }, 300);
       } else {
           this.props.clearSearchRecipes();
       }
    }

    componentDidMount() {
        this.props.navigation.setParams({
            searchFunc: this.searchFunction
        });

        this.setState({offset: this.state.limit});
    }

    componentWillUnmount() {
        this.props.navigation.setParams({
            searchFunc: null
        });
    }

    _onRefresh() {
        this.setState({offset: this.state.limit});
        this.props.refreshSearchRecipes(this.state.searchText, this.state.limit);
    }

    _onEndReached() {
        if ( ! this.props.loadingSearchRecipes && ! this.props.refreshingSearchRecipes && (this.state.offset + this.state.more_items) <= this.state.max_items) {
            this.setState({offset: this.state.offset + this.state.more_items});
            this.props.fetchMoreSearchRecipes(this.props.searchText, this.state.more_items, this.state.offset);
        }
    }

    _renderEmptyInfo = () => {
        if (this.props.loadingSearchRecipes) {
            return null;
        } else if (this.props.searchText != null && this.props.searchText != '') {
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
        if (this.props.loadingSearchRecipes) {
            return (
                <View style={styles.indicatorContainer}>
                    <ActivityIndicator size="large" color={Colors.redColor} style={styles.indicator} />
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <RecipeList
                    loading={this.props.loadingMoreSearchRecipes}
                    refreshing={this.props.refreshingSearchRecipes}
                    recipes={this.props.searchRecipes}
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

    indicatorContainer: {
        paddingTop: 25
    },

    indicator: {
        flex: 1,
    },

    noResults: {
        flex: 1,
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
    const { searchRecipes, searchText, loadingSearchRecipes, loadingMoreSearchRecipes, refreshingSearchRecipes } = reducer;

    return { searchRecipes, searchText, loadingSearchRecipes, loadingMoreSearchRecipes, refreshingSearchRecipes };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchSearchRecipes: (query, limit, offset) => dispatch(fetchSearchRecipes(query, limit, offset)),
        fetchMoreSearchRecipes: (query, limit, offset) => dispatch(fetchMoreSearchRecipes(query, limit, offset)),
        refreshSearchRecipes: (query, limit) => dispatch(refreshSearchRecipes(query, limit)),
        updateSearchText: (text) => dispatch(updateSearchText(text)),
        clearSearchRecipes: () => dispatch(clearSearchRecipes()),
        updateFavoriteStatus: () => dispatch(updateFavoriteStatus())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchScene);
