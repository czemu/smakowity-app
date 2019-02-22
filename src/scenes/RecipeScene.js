import React from 'react';
import { ActivityIndicator, ScrollView, View, Text } from 'react-native';
import { connect } from 'react-redux';
// import {
//     getRecipesById,
// } from '../actions/RecipeActions';

class RecipeScene extends React.PureComponent {
    componentWillMount() {
        // this.props.getRecipesById();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Recipe</Text>
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

// const mapDispatchToProps = (dispatch) => {
//     return {
//         getRecipesById: (id) => dispatch(getRecipesById(id)),
//     }
// };
//
// export default connect(null, mapDispatchToProps)(RecipeScene);

export default RecipeScene;
