import React from 'react';
import { ActivityIndicator, ScrollView, FlatList, Text, View, Image } from 'react-native';
import { connect } from 'react-redux';
import TabBarIcon from '../components/common/TabBarIcon';
import {
    fetchCategories
} from '../actions/CategoryActions';
import Colors from '../constants/Colors';

export class CategoriesScene extends React.Component {
    static navigationOptions = {
        title: 'Kategorie przepisów',
        tabBarLabel: 'Kategorie',
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
            <View style={styles.box}>
                <View style={styles.imageWrapper}>
                    <Image style={styles.image} source={{uri: item.img_url}} resizeMode="cover" />
                </View>
                <View style={styles.nameWrapper}>
                    <Text style={styles.name}>{item.name}</Text>
                </View>
            </View>
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
                <FlatList
                    data={this.props.categories}
                    renderItem={this._renderItem.bind(this)}
                    keyExtractor={this._keyExtractor}
                    contentContainerStyle={styles.listStyle}
                    ListFooterComponent={this._renderFooter.bind(this)}
                    horizontal={false}
                    numColumns={2}
                />
            </ScrollView>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        paddingHorizontal: 4
    },

    listStyle: {
        paddingVertical: 8,
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

    box: {
        margin: 4,
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 1,
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
        textShadowRadius: 30
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
