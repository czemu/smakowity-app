import React from 'react';
import {
    Image,
    Text,
    View,
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

export class CategoryScene extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.name}`,
        headerForceInset: { top: 'never', bottom: 'never' },
        headerRight: null
    });

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
        return (
            <View style={styles.container}>
                <RecipeList
                loading={this.props.loadingCategory}
                refreshing={this.props.refreshingCategory}
                recipes={this.props.categoryRecipes}
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
    const { categoryRecipes, loadingCategory, refreshingCategory } = reducer;

    return { categoryRecipes, loadingCategory, refreshingCategory };
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
