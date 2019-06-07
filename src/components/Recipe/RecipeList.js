import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { connect } from 'react-redux';
import RecipeItem from './RecipeItem';
import Colors from '../../constants/Colors';
import {
    getFavoriteIds,
} from '../../actions/RecipeActions';

class RecipeList extends React.PureComponent {
    componentWillMount() {
        this.props.getFavoriteIds();
    }

    constructor(props) {
        super(props);

        this.state = {
            flatListReady: false
        }
    }

    _scrolled() {
        this.setState({flatListReady: true});
    }

    _renderItem({item}) {
        return <RecipeItem
            recipe={item}
            removeOnUnfavorite={this.props.removeOnUnfavorite}
        />
    }

    _renderFooter() {
        if (this.props.loading) {
            return (
                <View style={styles.indicatorContainer}>
                    <ActivityIndicator size="large" color={Colors.redColor} style={styles.indicator} />
                </View>
            );
        }

        return null;
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatGrid
                    itemDimension={250}
                    items={this.props.recipes}
                    onMomentumScrollBegin={this._scrolled.bind(this)}
                    renderItem={this._renderItem.bind(this)}
                    style={styles.container}
                    contentContainerStyle={{paddingVertical: 8}}
                    onRefresh={this.props.onRefresh}
                    refreshing={this.props.refreshing}
                    onEndReached={() => {
                        if (this.state.flatListReady) {
                            return this.props.onEndReached();
                        }
                    }}
                    onEndReachedThreshold={this.props.onEndReachedThreshold}
                    ListFooterComponent={this._renderFooter.bind(this)}
                    ListEmptyComponent={this.props.ListEmptyComponent}
                />
            </View>
        );
    }
};

const styles = {
    container: {
        flex: 1,
        paddingVertical: 2
    },

    indicatorContainer: {
        paddingBottom: 8,
        flex: 1,
        alignItems: 'center',
        jusifyContent: 'center'
    },

    indicator: {
        flex: 1
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getFavoriteIds: () => dispatch(getFavoriteIds()),
    }
};

export default connect(null, mapDispatchToProps)(RecipeList);
