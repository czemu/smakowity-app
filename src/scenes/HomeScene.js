import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import TabBarIcon from '../components/TabBarIcon';
import { Subheader } from '../components/common';
import { connect } from 'react-redux';
import { fetchRecommendedRecipes } from '../actions/RecipeActions';

export default class HomeScene extends React.Component {
    static navigationOptions = {
        header: null,
        tabBarLabel: 'Start',
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
            focused={focused}
            name={'md-home'}
          />
      )
    };

    componentWillMount() {
        // fetchRecommendedRecipes();
        console.log(state);
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <Text onPress={() => {
                    // Actions.categories({type: 'reset'});
                    Actions.categories();
                }}>Kategorie</Text>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        backgroundColor: '#fafafa',
    },
});

// const mapStateToProps = (state, ownProps) => {
//     const { recommendedRecipes } = state;
//
//     return { recommendedRecipes };
// }
//
// export default connect(mapStateToProps, { fetchRecommendedRecipes })(HomeScene);
