import React from 'react';
import { ActivityIndicator, ScrollView, View, Text } from 'react-native';
import { connect } from 'react-redux';
import {
    fetchRecipe,
} from '../actions/RecipeActions';

class RecipeScene extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        // headerTitle: this.props.recipeName,
    };

    componentWillMount() {
        this.props.fetchRecipe(this.props.recipeId);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>{this.props.recipe.name}</Text>
                <Text>{this.props.recipe.ingredients}</Text>
                <Text>{this.props.recipe.preparation_description}</Text>
            </View>
        );
    }
};

const styles = {
    indicatorContainer: {
        paddingVertical: 20,
        flex: 1,
        alignItems: 'center',
        jusifyContent: 'center'
    },

    indicator: {
        flex: 1
    }
}

const mapStateToProps = (state, ownProps) => {
    const reducer = state.RecipesReducer;
    const { recipe } = reducer;

    return { recipe };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchRecipe: (id) => dispatch(fetchRecipe(id)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeScene);
