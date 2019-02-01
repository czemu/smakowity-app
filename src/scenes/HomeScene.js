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
import { fetchRecommendedRecipes } from '../actions/RecipeActions';
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

    componentDidMount() {
        this.props.fetchRecommendedRecipes();
    }

    render() {
        return (
            <View style={styles.container}>
                <RecipeList recipes={this.props.recommendedRecipes} loading={this.props.loadingRecommendedRecipes} />
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
    const { recommendedRecipes, loadingRecommendedRecipes } = reducer;

    return { recommendedRecipes, loadingRecommendedRecipes };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchRecommendedRecipes: () => dispatch(fetchRecommendedRecipes())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScene);
