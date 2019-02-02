import {
    FETCH_RECIPES,
    FETCH_RECIPES_SUCCESS,
    FETCH_RECIPES_FAILURE,

    REFRESH_RECIPES,
    REFRESH_RECIPES_SUCCESS,
    REFRESH_RECIPES_FAILURE
} from './types';

import { getRecommendedRecipes } from '../api/smakowity';

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
