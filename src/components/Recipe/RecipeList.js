import React from 'react';
import { ActivityIndicator, ScrollView, View, FlatList } from 'react-native';
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

    _keyExtractor = (item, index) => item.id.toString();

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
                <FlatList
                    onMomentumScrollBegin={this._scrolled.bind(this)}
                    data={this.props.recipes}
                    renderItem={this._renderItem.bind(this)}
                    keyExtractor={this._keyExtractor}
                    style={styles.container}
                    contentContainerStyle={{paddingHorizontal: 8, paddingBottom: 8}}
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

const mapDispatchToProps = (dispatch) => {
    return {
        getFavoriteIds: () => dispatch(getFavoriteIds()),
    }
};

export default connect(null, mapDispatchToProps)(RecipeList);
