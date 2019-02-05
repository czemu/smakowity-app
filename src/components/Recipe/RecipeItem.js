import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'expo';
import Colors from '../../constants/Colors';
import {
    addFavorite,
    removeFavorite
} from '../../actions/RecipeActions';

class RecipeItem extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isFavorited: false
        }
    }

    componentWillMount() {
        if (this.props.favoriteIds !== null) {
            this.setState({
                isFavorited: this.props.favoriteIds.indexOf(this.props.recipe.id) > -1
            });
        }
    }

    _handleFavoritePress() {
        if ( ! this.state.isFavorited) {
            this.props.addFavorite(this.props.recipe.id);
            this.setState({isFavorited: true});
        } else {
            this.props.removeFavorite(this.props.recipe.id);
            this.setState({isFavorited: false});
        }
    }

    render() {
        return (
            <View style={[styles.container, {marginTop: this.props.index == 0 ? 0 : 8}]}>
                <View style={styles.imageWrapper}>
                    <Image style={styles.image} source={{uri: this.props.recipe.img_url}} resizeMode="cover" />
                    <TouchableOpacity
                        style={{ ...styles.favContainer, ...{ backgroundColor: (this.state.isFavorited ? Colors.redColor : 'rgba(255, 255, 255, 0.3)') } }}
                        onPress={this._handleFavoritePress.bind(this)}
                    >
                        <Icon.Ionicons
                            style={styles.favIcon}
                            name={'md-heart'}
                            size={24}
                            color={'#fff'}
                         />
                    </TouchableOpacity>
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.recipeName} numberOfLines={1} ellipsizeMode="tail">{this.props.recipe.name}</Text>
                </View>
            </View>
        );
    }
};

const styles = {
    container: {
        flex: 1,
        borderRadius: 6,
        overflow: 'hidden',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 1
    },
    imageWrapper: {
        height: 150,
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
    detailsContainer: {
        flex: 1,
        height: 40,
        paddingHorizontal: 10,
        jusifyContent: 'flex-start',
        alignItems: 'flex-start',

    },
    recipeName: {
        paddingTop: 6,
        fontSize: 18
    }
}

const mapStateToProps = (state, ownProps) => {
    const reducer = state.RecipesReducer;
    const { favoriteIds } = reducer;

    return { favoriteIds };
}

const mapDispatchToProps = (dispatch) => {
    return {
        addFavorite: (id) => dispatch(addFavorite(id)),
        removeFavorite: (id) => dispatch(removeFavorite(id)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeItem);
