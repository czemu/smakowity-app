import {
    FETCH_RECIPES,
    FETCH_RECIPES_SUCCESS,
    FETCH_RECIPES_FAILURE,

    REFRESH_RECIPES,
    REFRESH_RECIPES_SUCCESS,
    REFRESH_RECIPES_FAILURE,

    FETCH_MORE_RECIPES_SUCCESS,

    GET_FAVORITES_SUCCESS,
    FAVORITE_RECIPE,
    UNFAVORITE_RECIPE
} from './types';

import { getRecommendedRecipes } from '../api/smakowity';
import { AsyncStorage } from 'react-native';

export function fetchRecipesRequest() {
    return {
        type: FETCH_RECIPES
    };
}

export function fetchRecipesSuccess(recipes) {
    return {
        type: FETCH_RECIPES_SUCCESS,
        payload: recipes
    };
}

export function fetchRecipesFailure() {
    return {
        type: FETCH_RECIPES_FAILURE
    }
}

export function refreshRecipesRequest() {
    return {
        type: REFRESH_RECIPES
    }
}

export function refreshRecipesSuccess(recipes) {
    return {
        type: REFRESH_RECIPES_SUCCESS,
        payload: recipes
    }
}

export function refreshRecipesFailure() {
    return {
        type: REFRESH_RECIPES_FAILURE
    }
}

export function fetchMoreRecipesSuccess(recipes) {
    return {
        type: FETCH_MORE_RECIPES_SUCCESS,
        payload: recipes,
    }
}

export function getFavoritesSuccess(ids) {
    return {
        type: GET_FAVORITES_SUCCESS,
        payload: ids
    }
}

export function favoriteRecipe(id) {
    return {
        type: FAVORITE_RECIPE,
        id: id
    }
}

export function unfavoriteRecipe(id) {
    return {
        type: UNFAVORITE_RECIPE,
        id: id
    }
}

export function fetchRecommendedRecipes(limit, offset) {
    return dispatch => {
        dispatch(fetchRecipesRequest());

        return getRecommendedRecipes(limit, offset)
            .then(recipes => dispatch(fetchRecipesSuccess(recipes)))
            .catch(() => dispatch(fetchRecipesFailure()))
    }
}

export function refreshRecommendedRecipes(limit) {
    return dispatch => {
        dispatch(refreshRecipesRequest());

        return getRecommendedRecipes(limit, 0)
            .then(recipes => dispatch(refreshRecipesSuccess(recipes)))
            .catch(() => dispatch(refreshRecipesFailure()))
    }
}

export function fetchMoreRecommendedRecipes(limit, offset) {
    return dispatch => {
        dispatch(fetchRecipesRequest());

        return getRecommendedRecipes(limit, offset)
            .then(recipes => dispatch(fetchMoreRecipesSuccess(recipes)))
            .catch(() => dispatch(fetchRecipesFailure()));
    }
}

export function addFavorite(id) {
    return dispatch => {
        dispatch(favoriteRecipe(id));

        AsyncStorage.getItem('favorites', (error, result) => {
            if (result !== null) {
                let newIds = JSON.parse(result).concat([id]);

                // Remove duplicates
                newIds = [ ...new Set(newIds) ];

                AsyncStorage.setItem('favorites', JSON.stringify(newIds));
            } else {
                AsyncStorage.setItem('favorites', JSON.stringify([id]));
            }
        });
    }
}

export function removeFavorite(id) {
    return dispatch => {
        dispatch(unfavoriteRecipe(id));

        AsyncStorage.getItem('favorites', (error, result) => {
            if (result !== null) {
                let newIds = JSON.parse(result).filter(item => item !== id)

                AsyncStorage.setItem('favorites', JSON.stringify(newIds));
            }
        });
    }
}

export function getFavorites() {
    return async (dispatch) => {
        let favorites = [];

        try {
            favorites = await AsyncStorage.getItem('favorites');
            favorites = JSON.parse(favorites);

            dispatch(getFavoritesSuccess(favorites));
        } catch (error) {
            console.log(error.message);
        }

        return favorites;
    }
}
