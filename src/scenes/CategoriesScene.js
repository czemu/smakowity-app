import React from 'react';
import { ActivityIndicator, ScrollView, Text, View, Image, TouchableOpacity } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import TabBarIcon from '../components/common/TabBarIcon';
import {
    fetchCategories
} from '../actions/CategoryActions';
import Colors from '../constants/Colors';

export class CategoriesScene extends React.Component {
    static navigationOptions = {
        title: 'Kategorie przepisów',
        tabBarLabel: 'Kategorie',
        headerForceInset: { top: 'never', bottom: 'never' },
        tabBarIcon: ({ focused }) => (
            <TabBarIcon
                focused={focused}
                name={'md-apps'}
            />
        )
    };

    componentDidMount() {
        this.props.fetchCategories();
    }

    _keyExtractor = (item, index) => item.id.toString();

    _renderItem({item}) {
        return (
            <TouchableOpacity style={styles.box} onPress={() => Actions.category({id: item.id, name: item.name})}>
                <View style={styles.imageWrapper}>
                    <Image style={styles.image} source={{uri: item.img_url}} resizeMode="cover" />
                </View>
                <View style={styles.nameWrapper}>
                    <Text style={styles.name}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    _renderFooter() {
        if (this.props.loadingCategories) {
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
            <ScrollView style={styles.container}>
                <FlatGrid
                    itemDimension={150}
                    items={this.props.categories}
                    renderItem={this._renderItem.bind(this)}
                    contentContainerStyle={styles.listStyle}
                    ListFooterComponent={this._renderFooter.bind(this)}
                />
            </ScrollView>
        );
    }
}

const styles = {
    container: {
        flex: 1,
    },

    listStyle: {
        paddingVertical: 2,
    },

    indicatorContainer: {
        paddingBottom: 8,
        flex: 1,
        alignItems: 'center',
        jusifyContent: 'center'
    },

    indicator: {
        flex: 1
    },

    box: {
        padding: 3,
        height: 80,
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: 5,
        overflow: 'hidden',
        position: 'relative',
    },

    imageWrapper: {
        flex: 1,
        width: '100%',
        height: '100%',
        borderRadius: 3,
        overflow: 'hidden',
        zIndex: 1,
    },

    image: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 2,
        borderRadius: 3,
    },

    nameWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        zIndex: 3
    },

    name: {
        textAlign: 'center',
        color: '#fff',
        padding: 10,
        fontSize: 20,
        lineHeight: 20,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 20
    }
};

const mapStateToProps = (state, ownProps) => {
    const reducer = state.CategoriesReducer;
    const { categories, loadingCategories } = reducer;

    return { categories, loadingCategories };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCategories: () => dispatch(fetchCategories()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesScene);
