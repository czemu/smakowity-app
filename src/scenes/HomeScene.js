import React from 'react';
import {
    Image,
    ScrollView,
    Text,
    View,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import SearchHeader from '../components/common/SearchHeader';
import TabBarIcon from '../components/common/TabBarIcon';
import { connect } from 'react-redux';
import {
    fetchRecommendedRecipes,
    refreshRecommendedRecipes,
    fetchMoreRecommendedRecipes,
    getFavorites,
    addFavorite
} from '../actions/RecipeActions';
import RecipeList from '../components/Recipe/RecipeList';
import Colors from '../constants/Colors';
import { AsyncStorage } from 'react-native';

export class HomeScene extends React.Component {
    static navigationOptions = {
        headerTitle: () => <SearchHeader placeholder="Szukaj przepisów..." />,
        tabBarLabel: 'Start',
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
            focused={focused}
            name={'md-home'}
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

    componentWillMount() {
        this.props.getFavorites();
    }

    componentDidMount() {
        this.setState({offset: this.state.limit});
        this.props.fetchRecommendedRecipes(this.state.limit, 0);
    }

    _onRefresh() {
        this.setState({offset: this.state.limit});
        this.props.refreshRecommendedRecipes(this.state.limit);

    }

    _onEndReached() {
        if ( ! this.props.loading && ! this.props.refreshing && (this.state.offset + this.state.more_items) <= this.state.max_items) {
            this.setState({offset: this.state.offset + this.state.more_items});
            this.props.fetchMoreRecommendedRecipes(this.state.more_items, this.state.offset);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <RecipeList
                    loading={this.props.loading}
                    refreshing={this.props.refreshing}
                    recipes={this.props.recipes}
                    onRefresh={this._onRefresh.bind(this)}
                    onEndReached={this._onEndReached.bind(this)}
                    initialNumToRender={this.state.limit}
                    onEndReachedThreshold={1}
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
    const { recipes, loading, refreshing, favorites } = reducer;

    return { recipes, loading, refreshing, favorites };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchRecommendedRecipes: (limit, offset) => dispatch(fetchRecommendedRecipes(limit, offset)),
        fetchMoreRecommendedRecipes: (limit, offset) => dispatch(fetchMoreRecommendedRecipes(limit, offset)),
        refreshRecommendedRecipes: (limit) => dispatch(refreshRecommendedRecipes(limit)),
        getFavorites: () => dispatch(getFavorites()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScene);
