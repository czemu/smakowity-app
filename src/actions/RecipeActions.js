import {
    FETCH_RECOMMENDED_RECIPES,
    FETCH_RECOMMENDED_RECIPES_SUCCESS,
    FETCH_RECOMMENDED_RECIPES_FAILURE,

    REFRESH_RECOMMENDED_RECIPES,
    REFRESH_RECOMMENDED_RECIPES_SUCCESS,
    REFRESH_RECOMMENDED_RECIPES_FAILURE,

    FETCH_MORE_RECOMMENDED_RECIPES_SUCCESS,

    GET_FAVORITE_IDS_SUCCESS,

    FETCH_FAVORITED_RECIPES,
    FETCH_FAVORITED_RECIPES_SUCCESS,
    FETCH_FAVORITED_RECIPES_FAILURE,

    FETCH_NEW_FAVORITED_RECIPE,
    FETCH_NEW_FAVORITED_RECIPE_SUCCESS,
    FETCH_NEW_FAVORITED_RECIPE_FAILURE,

    REFRESH_FAVORITED_RECIPES,
    REFRESH_FAVORITED_RECIPES_SUCCESS,
    REFRESH_FAVORITED_RECIPES_FAILURE,

    FETCH_MORE_FAVORITED_RECIPES_SUCCESS,
    FAVORITE_RECIPE,
    UNFAVORITE_RECIPE,

    UPDATE_FAVORITE_STATUS,

    FETCH_RECIPE,
    FETCH_RECIPE_SUCCESS,
    FETCH_RECIPE_FAILURE,

    FETCH_CATEGORY_RECIPES,
    FETCH_CATEGORY_RECIPES_SUCCESS,
    FETCH_CATEGORY_RECIPES_FAILURE,

    REFRESH_CATEGORY_RECIPES,
    REFRESH_CATEGORY_RECIPES_SUCCESS,
    REFRESH_CATEGORY_RECIPES_FAILURE,

    FETCH_MORE_CATEGORY_RECIPES,
    FETCH_MORE_CATEGORY_RECIPES_SUCCESS,
    FETCH_MORE_CATEGORY_RECIPES_FAILURE,

    FETCH_SEARCH_RECIPES,
    FETCH_SEARCH_RECIPES_SUCCESS,
    FETCH_SEARCH_RECIPES_FAILURE,

    REFRESH_SEARCH_RECIPES,
    REFRESH_SEARCH_RECIPES_SUCCESS,
    REFRESH_SEARCH_RECIPES_FAILURE,

    FETCH_MORE_SEARCH_RECIPES_SUCCESS,
} from './types';

import {
    getRecommendedRecipes,
    getRecipesById,
    getFullRecipe,
    getRecipesByCategory,
    getRecipesByQuery
} from '../api/smakowity';
import { AsyncStorage, ToastAndroid } from 'react-native';

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

export function updateFavoriteStatus() {
    return {
        type: UPDATE_FAVORITE_STATUS
    }
}

export function fetchRecommendedRecipes(limit, offset) {
    return dispatch => {
        dispatch(fetchRecommendedRecipesRequest());

        return getRecommendedRecipes(limit, offset)
            .then(recipes => {
                dispatch(fetchRecommendedRecipesSuccess(recipes));
                dispatch(updateFavoriteStatus());
            })
            .catch(() => dispatch(fetchRecommendedRecipesFailure()))
    }
}

export function refreshRecommendedRecipes(limit) {
    return dispatch => {
        dispatch(refreshRecommendedRecipesRequest());

        return getRecommendedRecipes(limit, 0)
            .then(recipes => dispatch(refreshRecommendedRecipesSuccess(recipes)))
            .catch(() => dispatch(refreshRecommendedRecipesFailure()))
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

export function fetchNewFavoritedRecipeRequest() {
    return {
        type: FETCH_NEW_FAVORITED_RECIPE
    };
}

export function fetchNewFavoritedRecipeSuccess(recipe) {
    return {
        type: FETCH_NEW_FAVORITED_RECIPE_SUCCESS,
        payload: recipe
    }
}

export function fetchNewFavoritedRecipeFailure() {
    return {
        type: FETCH_NEW_FAVORITED_RECIPE_FAILURE
    };
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
        dispatch(getFavoriteIds());
        dispatch(refreshFavoritedRecipesRequest());

        return getRecipesById(recipeIds, limit, 0)
            .then(recipes => dispatch(refreshFavoritedRecipesSuccess(recipes)))
            .catch(() => dispatch(refreshFavoritedhRecipesFailure()))
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

export function fetchNewFavoriteRecipe(recipeId) {
    return dispatch => {
        dispatch(fetchNewFavoritedRecipeRequest());

        return getRecipesById([recipeId], 1, 0)
            .then(recipe => dispatch(fetchNewFavoritedRecipeSuccess(recipe)))
            .catch(() => dispatch(fetchNewFavoritedRecipeFailure()))
    }
}

export function getFavoriteIdsSuccess(ids) {
    return {
        type: GET_FAVORITE_IDS_SUCCESS,
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

        ToastAndroid.show('Dodano przepis do ulubionych', ToastAndroid.SHORT);

        AsyncStorage.getItem('favorites', (error, result) => {
            if (result !== null) {
                let newIds = JSON.parse(result).concat([id]);

                // Remove duplicates
                newIds = [ ...new Set(newIds) ];

                AsyncStorage.setItem('favorites', JSON.stringify(newIds));
            } else {
                AsyncStorage.setItem('favorites', JSON.stringify([id]));
            }

            dispatch(getFavoriteIds());
            dispatch(fetchNewFavoriteRecipe(id));
        });
    }
}

export function removeFavorite(id) {
    return dispatch => {
        dispatch(unfavoriteRecipe(id));

        ToastAndroid.show('Usunięto przepis z ulubionych', ToastAndroid.SHORT);

        AsyncStorage.getItem('favorites', (error, result) => {
            if (result !== null) {
                let newIds = JSON.parse(result).filter(item => item !== id)

                AsyncStorage.setItem('favorites', JSON.stringify(newIds));
            }
        });
    }
}

export function getFavoriteIds() {
    return async (dispatch) => {
        let favoriteIds = [];

        try {
            favoriteIds = await AsyncStorage.getItem('favorites');
            favoriteIds = JSON.parse(favoriteIds);

            if (favoriteIds !== null) {
                favoriteIds = favoriteIds.reverse();
            }

            dispatch(getFavoriteIdsSuccess(favoriteIds));
        } catch (error) {
            console.log(error.message);
        }

        return favoriteIds;
    }
}

export function fetchRecipeRequest() {
    return {
        type: FETCH_RECIPE
    }
}

export function fetchRecipeSuccess(recipe) {
    return {
        type: FETCH_RECIPE_SUCCESS,
        payload: recipe
    }
}

export function fetchRecipeFailure() {
    return {
        type: FETCH_RECIPE_FAILURE
    }
}

export function fetchRecipe(recipeId) {
    return dispatch => {
        dispatch(fetchRecipeRequest());

        return getFullRecipe(recipeId)
            .then(recipe => dispatch(fetchRecipeSuccess(recipe)))
            .catch(() => dispatch(fetchRecipeFailure()))
    }
}

export function fetchCategoryRecipesRequest() {
    return {
        type: FETCH_CATEGORY_RECIPES
    };
}

export function fetchCategoryRecipesSuccess(recipes) {
    return {
        type: FETCH_CATEGORY_RECIPES_SUCCESS,
        payload: recipes
    };
}

export function fetchCategoryRecipesFailure() {
    return {
        type: FETCH_CATEGORY_RECIPES_FAILURE
    }
}

export function refreshCategoryRecipesRequest() {
    return {
        type: REFRESH_CATEGORY_RECIPES
    }
}

export function refreshCategoryRecipesSuccess(recipes) {
    return {
        type: REFRESH_CATEGORY_RECIPES_SUCCESS,
        payload: recipes
    }
}

export function refreshCategoryRecipesFailure() {
    return {
        type: REFRESH_CATEGORY_RECIPES_FAILURE
    }
}

export function fetchMoreCategoryRecipesRequest() {
    return {
        type: FETCH_MORE_CATEGORY_RECIPES
    }
}

export function fetchMoreCategoryRecipesSuccess(recipes) {
    return {
        type: FETCH_MORE_CATEGORY_RECIPES_SUCCESS,
        payload: recipes
    }
}

export function fetchMoreCategoryRecipesFailure() {
    return {
        type: FETCH_MORE_CATEGORY_RECIPES_FAILURE
    }
}

export function fetchCategoryRecipes(id, limit, offset) {
    return dispatch => {
        dispatch(fetchCategoryRecipesRequest());

        return getRecipesByCategory(id, limit, offset)
            .then(recipes => {
                dispatch(fetchCategoryRecipesSuccess(recipes));
                dispatch(updateFavoriteStatus());
            })
            .catch(() => dispatch(fetchCategoryRecipesFailure()))
    }
}

export function refreshCategoryRecipes(id, limit) {
    return dispatch => {
        dispatch(refreshCategoryRecipesRequest());

        return getRecipesByCategory(id, limit, 0)
            .then(recipes => dispatch(refreshCategoryRecipesSuccess(recipes)))
            .catch(() => dispatch(refreshCategoryhRecipesFailure()))
    }
}

export function fetchMoreCategoryRecipes(id, limit, offset) {
    return dispatch => {
        dispatch(fetchMoreCategoryRecipesRequest());

        return getRecipesByCategory(id, limit, offset)
            .then(recipes => dispatch(fetchMoreCategoryRecipesSuccess(recipes)))
            .catch(() => dispatch(fetchMoreCategoryRecipesFailure()));
    }
}

export function fetchSearchRecipesRequest() {
    return {
        type: FETCH_SEARCH_RECIPES
    };
}

export function fetchSearchRecipesSuccess(recipes) {
    return {
        type: FETCH_SEARCH_RECIPES_SUCCESS,
        payload: recipes
    };
}

export function fetchSearchRecipesFailure() {
    return {
        type: FETCH_SEARCH_RECIPES_FAILURE
    }
}

export function refreshSearchRecipesRequest() {
    return {
        type: REFRESH_SEARCH_RECIPES
    }
}

export function refreshSearchRecipesSuccess(recipes) {
    return {
        type: REFRESH_SEARCH_RECIPES_SUCCESS,
        payload: recipes
    }
}

export function refreshSearchRecipesFailure() {
    return {
        type: REFRESH_SEARCH_RECIPES_FAILURE
    }
}

export function fetchMoreSearchRecipesSuccess(recipes) {
    return {
        type: FETCH_MORE_SEARCH_RECIPES_SUCCESS,
        payload: recipes,
    }
}

export function fetchSearchRecipes(query, limit, offset) {
    return dispatch => {
        dispatch(fetchSearchRecipesRequest());

        return getRecipesByQuery(query, limit, offset)
            .then(recipes => {
                dispatch(fetchSearchRecipesSuccess(recipes));
                dispatch(updateFavoriteStatus());
            })
            .catch(() => dispatch(fetchSearchRecipesFailure()))
    }
}

export function refreshSearchRecipes(query, limit) {
    return dispatch => {
        dispatch(refreshSearchRecipesRequest());

        return getRecipesByQuery(query, limit, 0)
            .then(recipes => dispatch(refreshSearchRecipesSuccess(recipes)))
            .catch(() => dispatch(refreshSearchRecipesFailure()))
    }
}

export function fetchMoreSearchRecipes(query, limit, offset) {
    return dispatch => {
        dispatch(fetchSearchRecipesRequest());

        return getRecipesByQuery(query, limit, offset)
            .then(recipes => dispatch(fetchMoreSearchRecipesSuccess(recipes)))
            .catch(() => dispatch(fetchSearchRecipesFailure()));
    }
}
