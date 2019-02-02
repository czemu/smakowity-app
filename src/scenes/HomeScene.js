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
import { fetchRecommendedRecipes, refreshRecommendedRecipes } from '../actions/RecipeActions';
import RecipeList from '../components/Recipe/RecipeList';
import Colors from '../constants/Colors';

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
            limit: 15,
            offset: 5,
        }
    }

    componentDidMount() {
        this.props.fetchRecommendedRecipes(this.state.limit, this.state.offset);
    }

    _onRefresh() {
        this.props.refreshRecommendedRecipes(this.state.limit, this.state.offset);

    }

    _onEndReached() {

    }

    render() {
        return (
            <View style={styles.container}>
                <RecipeList
                    recipes={this.props.recipes}
                    onRefresh={this._onRefresh.bind(this)}
                    onEndReached={this._onEndReached.bind(this)}
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
    const { recipes, loading, refreshing } = reducer;

    return { recipes, loading, refreshing };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchRecommendedRecipes: (limit, offset) => dispatch(fetchRecommendedRecipes(limit, offset)),
        refreshRecommendedRecipes: (limit, offset) => dispatch(refreshRecommendedRecipes(limit, offset)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScene);
