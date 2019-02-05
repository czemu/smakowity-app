import {
    FETCH_RECOMMENDED_RECIPES,
    FETCH_RECOMMENDED_RECIPES_SUCCESS,
    FETCH_RECOMMENDED_RECIPES_FAILURE,

    REFRESH_RECOMMENDED_RECIPES,
    REFRESH_RECOMMENDED_RECIPES_SUCCESS,
    REFRESH_RECOMMENDED_RECIPES_FAILURE,

    FETCH_MORE_RECOMMENDED_RECIPES_SUCCESS,

    GET_FAVORITED_SUCCESS,

    FETCH_FAVORITED_RECIPES,
    FETCH_FAVORITED_RECIPES_SUCCESS,
    FETCH_FAVORITED_RECIPES_FAILURE,

    REFRESH_FAVORITED_RECIPES,
    REFRESH_FAVORITED_RECIPES_SUCCESS,
    REFRESH_FAVORITED_RECIPES_FAILURE,

    FETCH_MORE_FAVORITED_RECIPES_SUCCESS,
    FAVORITE_RECIPE,
    UNFAVORITE_RECIPE
} from './types';

import {
    getRecommendedRecipes,
    getRecipesById
} from '../api/smakowity';
import { AsyncStorage } from 'react-native';

export function fetchRecommendedRecipesRequest() {
    return {
        type: FETCH_RECOMMENDED_RECIPES
    };
}

export function fetchRecommendedRecipesSuccess(recipes) {
    return {
        type: FETCH_RECOMMENDED_RECIPES_SUCCESS,
        payload: recipes
    };
}

export function fetchRecommendedRecipesFailure() {
    return {
        type: FETCH_RECOMMENDED_RECIPES_FAILURE
    }
}

export function refreshRecommendedRecipesRequest() {
    return {
        type: REFRESH_RECOMMENDED_RECIPES
    }
}

export function refreshRecommendedRecipesSuccess(recipes) {
    return {
        type: REFRESH_RECOMMENDED_RECIPES_SUCCESS,
        payload: recipes
    }
}

export function refreshRecommendedRecipesFailure() {
    return {
        type: REFRESH_RECOMMENDED_RECIPES_FAILURE
    }
}

export function fetchMoreRecommendedRecipesSuccess(recipes) {
    return {
        type: FETCH_MORE_RECOMMENDED_RECIPES_SUCCESS,
        payload: recipes,
    }
}

export function fetchRecommendedRecipes(limit, offset) {
    return dispatch => {
        dispatch(fetchRecommendedRecipesRequest());

        return getRecommendedRecipes(limit, offset)
            .then(recipes => dispatch(fetchRecommendedRecipesSuccess(recipes)))
            .catch(() => dispatch(fetchRecommendedRecipesFailure()))
    }
}

export function refreshRecommendedRecipes(limit) {
    return dispatch => {
        dispatch(refreshRecommendedRecipesRequest());

        return getRecommendedRecipes(limit, 0)
            .then(recipes => dispatch(refreshRecommendedRecipesSuccess(recipes)))
            .catch(() => dispatch(refresRecommendedhRecipesFailure()))
    }
}

export function fetchMoreRecommendedRecipes(limit, offset) {
    return dispatch => {
        dispatch(fetchRecommendedRecipesRequest());

        return getRecommendedRecipes(limit, offset)
            .then(recipes => dispatch(fetchMoreRecommendedRecipesSuccess(recipes)))
            .catch(() => dispatch(fetchRecommendedRecipesFailure()));
    }
}

export function fetchFavoritedRecipesRequest() {
    return {
        type: FETCH_FAVORITED_RECIPES
    };
}

export function fetchFavoritedRecipesSuccess(recipes) {
    return {
        type: FETCH_FAVORITED_RECIPES_SUCCESS,
        payload: recipes
    };
}

export function fetchFavoritedRecipesFailure() {
    return {
        type: FETCH_FAVORITED_RECIPES_FAILURE
    }
}

export function refreshFavoritedRecipesRequest() {
    return {
        type: REFRESH_FAVORITED_RECIPES
    }
}

export function refreshFavoritedRecipesSuccess(recipes) {
    return {
        type: REFRESH_FAVORITED_RECIPES_SUCCESS,
        payload: recipes
    }
}

export function refreshFavoritedRecipesFailure() {
    return {
        type: REFRESH_FAVORITED_RECIPES_FAILURE
    }
}

export function fetchMoreFavoritedRecipesSuccess(recipes) {
    return {
        type: FETCH_MORE_FAVORITED_RECIPES_SUCCESS,
        payload: recipes,
    }
}

export function fetchFavoritedRecipes(recipeIds, limit, offset) {
    return dispatch => {
        dispatch(fetchFavoritedRecipesRequest());

        return getRecipesById(recipeIds, limit, offset)
            .then(recipes => dispatch(fetchFavoritedRecipesSuccess(recipes)))
            .catch(() => dispatch(fetchFavoritedRecipesFailure()))
    }
}

export function refreshFavoritedRecipes(recipeIds, limit) {
    return dispatch => {
        dispatch(refreshFavoritedRecipesRequest());

        return getRecipesById(recipeIds, limit, 0)
            .then(recipes => dispatch(refreshFavoritedRecipesSuccess(recipes)))
            .catch(() => dispatch(refresFavoritedhRecipesFailure()))
    }
}

export function fetchMoreFavoritedRecipes(recipeIds, limit, offset) {
    return dispatch => {
        dispatch(fetchFavoritedRecipesRequest());

        return getRecipesById(recipeIds, limit, offset)
            .then(recipes => dispatch(fetchMoreFavoritedRecipesSuccess(recipes)))
            .catch(() => dispatch(fetchFavoritedRecipesFailure()));
    }
}

export function getFavoritesSuccess(ids) {
    return {
        type: GET_FAVORITED_SUCCESS,
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
        let favoriteIds = [];

        try {
            favoriteIds = await AsyncStorage.getItem('favorites');
            favoriteIds = JSON.parse(favoriteIds);

            dispatch(getFavoritesSuccess(favoriteIds));
        } catch (error) {
            console.log(error.message);
        }

        return favoriteIds;
    }
}
