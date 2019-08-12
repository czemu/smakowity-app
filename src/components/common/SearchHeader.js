import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as Icon from '@expo/vector-icons';
import {
    clearSearchRecipes,
    updateSearchText
} from '../../actions/RecipeActions';

class SearchHeader extends React.Component {
    constructor(props) {
        super(props);

        this.textInput = React.createRef();
    }

    _onClearPress = () => {
        this.textInput.current.clear();
        this.props.clearSearchRecipes();
        this.props.updateSearchText(null);
    }

    _renderClearButton() {
        if (this.props.searchText !== null && this.props.searchText != '') {
            return (
                <TouchableOpacity
                    style={styles.clear}
                    onPress={this._onClearPress}
                >
                    <Icon.Ionicons
                      name={'md-close'}
                      size={22}
                      color="#fff"
                    />
                </TouchableOpacity>
            );
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    ref={this.textInput}
                    style={styles.input}
                    onChangeText={this.props.onChangeText}
                    placeholder={this.props.placeholder}
                    value={this.props.searchText}
                    placeholderTextColor="#999"
                />
                <Icon.Ionicons
                  name={'md-search'}
                  size={26}
                  color="#999"
                  style={styles.icon}
                />
                {this._renderClearButton()}
            </View>
        );
    }
};

const styles = {
    container: {
        flex: 1,
        paddingHorizontal: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        paddingLeft: 36,
        paddingRight: 40,
        paddingVertical: 5,
        borderRadius: 6,
        backgroundColor: '#f5f5f5',
        alignSelf: 'stretch',
    },
    icon: {
        position: 'absolute',
        top: 5,
        left: 16
    },
    clear: {
        width: 28,
        height: 28,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 5,
        right: 16,
        backgroundColor: '#999',
        borderRadius: 14
    }
}

const mapStateToProps = (state, ownProps) => {
    const reducer = state.RecipesReducer;
    const { searchRecipes, searchText } = reducer;

    return { searchRecipes, searchText };
};

const mapDispatchToProps = (dispatch) => {
    return {
        clearSearchRecipes: () => dispatch(clearSearchRecipes()),
        updateSearchText: (text) => dispatch(updateSearchText(text))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchHeader);
