import React from 'react';
import {
    Image,
    Text,
    View,
    ActivityIndicator
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import {
    fetchCategoryRecipes,
    refreshCategoryRecipes,
    fetchMoreCategoryRecipes,
    updateFavoriteStatus,
} from '../actions/RecipeActions';
import RecipeList from '../components/Recipe/RecipeList';
import Colors from '../constants/Colors';

export class CategoryScene extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.name}`,
        headerForceInset: { top: 'never', bottom: 'never' },
        headerRight: null
    });

    constructor(props) {
        super(props);

        this.state = {
            limit: 20,
            offset: 0,
            more_items: 20,
            max_items: 4000,
        }
    }

    componentDidMount() {
        this.setState({offset: this.state.limit});
        this.props.fetchCategoryRecipes(this.props.id, this.state.limit, 0);
    }

    _onRefresh() {
        this.setState({offset: this.state.limit});
        this.props.refreshCategoryRecipes(this.props.id, this.state.limit);
    }

    _onEndReached() {
        if ( ! this.props.loadingCategory && ! this.props.refreshingCategory && (this.state.offset + this.state.more_items) <= this.state.max_items) {
            this.setState({offset: this.state.offset + this.state.more_items});
            this.props.fetchMoreCategoryRecipes(this.props.id, this.state.more_items, this.state.offset);
        }
    }

    render() {
        if (this.props.loadingCategory) {
            return (
                <View style={styles.indicatorContainer}>
                    <ActivityIndicator size="large" color={Colors.redColor} style={styles.indicator} />
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <RecipeList
                    loading={this.props.loadingCategoryMore}
                    refreshing={this.props.refreshingCategory}
                    recipes={this.props.categoryRecipes}
                    onRefresh={this._onRefresh.bind(this)}
                    onEndReached={this._onEndReached.bind(this)}
                    initialNumToRender={this.state.limit}
                    onEndReachedThreshold={0.5}
                />
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
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
};

const mapStateToProps = (state, ownProps) => {
    const reducer = state.RecipesReducer;
    const { categoryRecipes, loadingCategory, loadingCategoryMore, refreshingCategory } = reducer;

    return { categoryRecipes, loadingCategory, loadingCategoryMore, refreshingCategory };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCategoryRecipes: (id, limit, offset) => dispatch(fetchCategoryRecipes(id, limit, offset)),
        fetchMoreCategoryRecipes: (id, limit, offset) => dispatch(fetchMoreCategoryRecipes(id, limit, offset)),
        refreshCategoryRecipes: (id, limit) => dispatch(refreshCategoryRecipes(id, limit)),
        updateFavoriteStatus: () => dispatch(updateFavoriteStatus())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryScene);
