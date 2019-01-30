import {
    FETCH_RECOMMENDED_RECIPES,
    FETCH_RECOMMENDED_RECIPES_SUCCESS,
    FETCH_RECOMMENDED_RECIPES_FAILURE
} from './types';

import { getRecommendedRecipes } from '../api/smakowity';

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

export function fetchRecommendedRecipes() {
    return dispatch => {
        dispatch(fetchRecommendedRecipesRequest());

        return getRecommendedRecipes()
            .then(recipes => dispatch(fetchRecommendedRecipesSuccess(recipes)))
            .catch(() => dispatch(fetchRecommendedRecipesFailure()))
    }
}
