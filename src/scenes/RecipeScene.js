import React from 'react';
import { ActivityIndicator, ScrollView, View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import {
    fetchRecipe,
} from '../actions/RecipeActions';
import Colors from '../constants/Colors';

class RecipeScene extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        headerForceInset: { top: 'never', bottom: 'never' },
        headerRight: <Text>Test</Text>
    }

    componentWillMount() {
        this.props.fetchRecipe(this.props.recipeId);
    }

    _renderRecipe() {
        if (this.props.loadingRecipe) {
            return (
                <View style={styles.indicatorContainer}>
                    <ActivityIndicator size="large" color={Colors.redColor} style={styles.indicator} />
                </View>
            );
        }

        return (
            <ScrollView style={styles.container}>
                <View style={styles.imageWrapper}>
                    <Image style={styles.image} source={{uri: this.props.recipe.img_url}} resizeMode="cover" />
                </View>
                <Text>{this.props.recipe.name}</Text>
                <Text>{this.props.recipe.ingredients}</Text>
                <Text>{this.props.recipe.preparation_description}</Text>
            </ScrollView>
        );
    }

    render() {
        return this._renderRecipe();
    }
};

const styles = {
    container: {
        flex: 1,
        margin: 0,
        padding: 0
    },

    imageWrapper: {
        height: 250,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },

    image: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },

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
    const { recipe, loadingRecipe } = reducer;

    return { recipe, loadingRecipe };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchRecipe: (id) => dispatch(fetchRecipe(id)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeScene);
