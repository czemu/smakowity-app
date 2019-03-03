import React from 'react';
import { ActivityIndicator, ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'expo';
import {
    fetchRecipe,
    addFavorite,
    removeFavorite
} from '../actions/RecipeActions';
import Colors from '../constants/Colors';

class RecipeScene extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        headerForceInset: { top: 'never', bottom: 'never' },
        headerRight: null
    }

    componentWillMount() {
        this.props.fetchRecipe(this.props.recipeId);
    }

    _formatImageDescription(text) {
        if (text != undefined) {
            return 'fot. '+text.replace(/<(?:.|\n)*?>/gm, '');
        }

        return text;
    }

    _formatIngredients(text) {
        if (text != undefined) {
            return text.replace(/\[(.+?)\]/g, "$1");
        }

        return text;
    }

    _formatPreparationTime(text) {
        switch (text) {
            case '<30':
                return 'do 30 min.';
            case '30-60':
                return '30-60 min.';
            case '>60':
                return 'ponad 60 min.';
        }

        return text;
    }

    _formatDifficultyDegree(text) {
        switch (text) {
            case 'easy':
                return 'łatwy';
            case 'medium':
                return 'średni';
            case 'hard':
                return 'trudny';
        }

        return text;
    }

    _formatServings(text) {
        return text+' os.';
    }

    _handleFavoritePress() {
        if ( ! this.props.isFavorited) {
            this.props.addFavorite(this.props.recipe.id);
        } else {
            this.props.removeFavorite(this.props.recipe.id);
        }
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
                    <TouchableOpacity
                        style={{ ...styles.favContainer, ...{ backgroundColor: (this.props.isFavorited ? Colors.redColor : 'rgba(255, 255, 255, 0.3)') } }}
                        onPress={this._handleFavoritePress.bind(this)}
                    >
                        <Icon.Ionicons
                            style={styles.favIcon}
                            name={'md-heart'}
                            size={24}
                            color={'#fff'}
                         />
                    </TouchableOpacity>
                    <Text style={styles.imageDescription}>{this._formatImageDescription(this.props.recipe.img_desc)}</Text>
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.recipeName}>{this.props.recipe.name}</Text>
                    <View style={styles.iconsContainer}>
                        <View style={styles.iconBox}>
                            <View style={styles.iconBoxHeader}>
                                <Icon.Ionicons
                                    name={'md-time'}
                                    size={24}
                                    color={Colors.redColor}
                                 />
                                 <Text style={styles.iconBoxHeaderText}>CZAS:</Text>
                             </View>
                             <Text style={styles.iconBoxValue}>{this._formatPreparationTime(this.props.recipe.preparation_time)}</Text>
                        </View>
                        <View style={styles.iconBox}>
                            <View style={styles.iconBoxHeader}>
                                <Icon.Ionicons
                                    name={'md-school'}
                                    size={24}
                                    color={Colors.redColor}
                                 />
                                 <Text style={styles.iconBoxHeaderText}>TRUDNOŚĆ:</Text>
                             </View>
                             <Text style={styles.iconBoxValue}>{this._formatDifficultyDegree(this.props.recipe.difficulty_degree)}</Text>
                        </View>
                        <View style={styles.iconBox}>
                            <View style={styles.iconBoxHeader}>
                                <Icon.Ionicons
                                    name={'md-restaurant'}
                                    size={24}
                                    color={Colors.redColor}
                                 />
                                 <Text style={styles.iconBoxHeaderText}>PORCJE:</Text>
                             </View>
                             <Text style={styles.iconBoxValue}>{this._formatServings(this.props.recipe.servings)}</Text>
                        </View>
                    </View>
                    <Text style={styles.textHeader}>Składniki:</Text>
                    <Text style={styles.longText}>{this._formatIngredients(this.props.recipe.ingredients)}</Text>
                    <Text style={styles.textHeader}>Opis przygotowania:</Text>
                    <Text style={styles.longText}>{this.props.recipe.preparation_description}</Text>
                </View>
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

    favContainer: {
        width: 40,
        height: 40,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        position: 'absolute',
        top: 8,
        right: 8,
    },

    favIcon: {
        marginTop: 3,
    },

    imageWrapper: {
        height: 240,
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

    imageDescription: {
        position: 'absolute',
        right: 10,
        bottom: 10,
        fontSize: 10,
        textAlign: 'right',
        color: '#fff',
        opacity: 0.9,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    },

    indicatorContainer: {
        paddingVertical: 20,
        flex: 1,
        alignItems: 'center',
        jusifyContent: 'center'
    },

    indicator: {
        flex: 1
    },

    detailsContainer: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: '#fff'
    },

    iconsContainer: {
        marginBottom: 5,
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
        backgroundColor: '#eee',
        borderRadius: 5
    },

    iconBox: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center'
    },

    iconBoxHeader: {
        flex: 1,
        alignItems: 'center',
        textAlign: 'center'
    },

    iconBoxHeaderText: {
        color: '#999',
        fontSize: 10
    },

    iconBoxValue: {
        flex: 1,
        textAlign: 'center'
    },

    recipeName: {
        marginBottom: 15,
        fontSize: 28,
        lineHeight: 28,
        fontWeight: 'bold'
    },

    textHeader: {
        marginTop: 10,
        marginBottom: 5,
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.greenColor
    },

    longText: {
        lineHeight: 22
    }
}

const mapStateToProps = (state, ownProps) => {
    const reducer = state.RecipesReducer;
    const { recipe, loadingRecipe, favoriteIds } = reducer;

    const isFavorited = favoriteIds.indexOf(ownProps.recipeId) > -1;

    return { recipe, loadingRecipe, isFavorited };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchRecipe: (id) => dispatch(fetchRecipe(id)),
        addFavorite: (id) => dispatch(addFavorite(id)),
        removeFavorite: (id) => dispatch(removeFavorite(id)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeScene);
