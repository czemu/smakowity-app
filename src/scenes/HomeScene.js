import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Subheader } from '../components/common';
import TabBarIcon from '../components/TabBarIcon';
import { connect } from 'react-redux';
import { fetchRecommendedRecipes } from '../actions/RecipeActions';
import RecipeList from '../components/Recipe/RecipeList';
import Colors from '../constants/Colors';

export class HomeScene extends React.Component {
    static navigationOptions = {
        header: null,
        tabBarLabel: 'Start',
        labelStyle: {
            color: '#000',
            height: 400
        },
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
        flex: 1
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
