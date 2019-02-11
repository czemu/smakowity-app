import React from 'react';
import {
    Image,
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
    updateFavoriteStatus,
} from '../actions/RecipeActions';
import RecipeList from '../components/Recipe/RecipeList';

export class HomeScene extends React.Component {
    static navigationOptions = {
        headerTitle: () => <SearchHeader placeholder="Szukaj przepisów..." />,
        tabBarLabel: 'Start',
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
            focused={focused}
            name={'md-home'}
          />
      ),
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
        this.props.fetchRecommendedRecipes(this.state.limit, 0);
    }

    _onRefresh() {
        this.setState({offset: this.state.limit});
        this.props.refreshRecommendedRecipes(this.state.limit);
    }

    _onEndReached() {
        if ( ! this.props.loadingRecommended && ! this.props.refreshingRecommended && (this.state.offset + this.state.more_items) <= this.state.max_items) {
            this.setState({offset: this.state.offset + this.state.more_items});
            this.props.fetchMoreRecommendedRecipes(this.state.more_items, this.state.offset);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <RecipeList
                loading={this.props.loadingRecommended}
                refreshing={this.props.refreshingRecommended}
                recipes={this.props.recommendedRecipes}
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
    const { recommendedRecipes, loadingRecommended, refreshingRecommended } = reducer;

    return { recommendedRecipes, loadingRecommended, refreshingRecommended };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchRecommendedRecipes: (limit, offset) => dispatch(fetchRecommendedRecipes(limit, offset)),
        fetchMoreRecommendedRecipes: (limit, offset) => dispatch(fetchMoreRecommendedRecipes(limit, offset)),
        refreshRecommendedRecipes: (limit) => dispatch(refreshRecommendedRecipes(limit)),
        updateFavoriteStatus: () => dispatch(updateFavoriteStatus())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScene);
