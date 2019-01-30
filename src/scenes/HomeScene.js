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
import TabBarIcon from '../components/TabBarIcon';
import { Subheader } from '../components/common';
import { connect } from 'react-redux';
import { fetchRecommendedRecipes } from '../actions/RecipeActions';

export class HomeScene extends React.Component {
    static navigationOptions = {
        header: null,
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

    renderRecommendedRecipes() {
        return this.props.recommendedRecipes.map(recipe =>
             <Text key={recipe.id}>{recipe.name}</Text>
         );
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <Text onPress={() => {
                    // Actions.categories({type: 'reset'});
                    Actions.categories();
                }}>Kategorie</Text>
                {this.renderRecommendedRecipes()}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        backgroundColor: '#fafafa',
    },
});

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
