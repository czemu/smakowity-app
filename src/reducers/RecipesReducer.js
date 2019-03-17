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

    FETCH_MORE_CATEGORY_RECIPES_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    loadingRecommended: false,
    refreshingRecommended: false,
    recommendedRecipes: [],
    favoriteIds: [],
    loadingFavorited: false,
    refreshingFavorited: false,
    favoritedRecipes: [],
    recipe: {},
    loadingRecipe: false,
    categoryRecipes: [],
    loadingCategory: false,
    refreshingCategory: false,
    searchResults: [],
    loadingSearchResults: false,
    refreshingSearchResults: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_RECOMMENDED_RECIPES:
            return { ...state, loadingRecommended: true };
        case FETCH_RECOMMENDED_RECIPES_SUCCESS:
            return { ...state, loadingRecommended: false, recommendedRecipes: action.payload };
        case FETCH_RECOMMENDED_RECIPES_FAILURE:
            return { ...state, loadingRecommended: false };

        case REFRESH_RECOMMENDED_RECIPES:
            return { ...state, refreshingRecommended: true };
        case REFRESH_RECOMMENDED_RECIPES_SUCCESS:
            return { ...state, refreshingRecommended: false, recommendedRecipes: action.payload };
        case REFRESH_RECOMMENDED_RECIPES_FAILURE:
            return { ...state, refreshingRecommended: false };

        case FETCH_MORE_RECOMMENDED_RECIPES_SUCCESS:
            return {
                ...state,
                loadingRecommended: false,
                recommendedRecipes: [...state.recommendedRecipes, ...action.payload]
            };

        case GET_FAVORITE_IDS_SUCCESS:
            return { ...state, favoriteIds: action.payload };

        case FETCH_FAVORITED_RECIPES:
            return { ...state, loadingFavorited: true };
        case FETCH_FAVORITED_RECIPES_SUCCESS:
            return { ...state, loadingFavorited: false, favoritedRecipes: action.payload !== null ? action.payload : []};
        case FETCH_FAVORITED_RECIPES_FAILURE:
            return { ...state, loadingFavorited: false };

        case FETCH_NEW_FAVORITED_RECIPE:
            return { ...state, loadingFavorited: true };
        case FETCH_NEW_FAVORITED_RECIPE_SUCCESS:
            return {
                ...state,
                loadingFavorited: false,
                favoritedRecipes: [ ...action.payload, ...state.favoritedRecipes ]
            };
        case FETCH_NEW_FAVORITED_RECIPE_FAILURE:
            return { ...state, loadingFavorited: false };

        case REFRESH_FAVORITED_RECIPES:
            return { ...state, refreshingFavorited: true };
        case REFRESH_FAVORITED_RECIPES_SUCCESS:
            return { ...state, refreshingFavorited: false, favoritedRecipes: action.payload !== null ? action.payload : [] };
        case REFRESH_FAVORITED_RECIPES_FAILURE:
            return { ...state, refreshingFavorited: false };

        case FETCH_MORE_FAVORITED_RECIPES_SUCCESS:
            return {
                ...state,
                loadingFavorited: false,
                favoritedRecipes: [...state.favoritedRecipes, ...action.payload]
            };

        case FAVORITE_RECIPE:
            return {
                ...state,
                favoriteIds: [action.id, ...state.favoriteIds]
            };

        case UNFAVORITE_RECIPE:
            return {
                ...state,
                favoriteIds: [...state.favoriteIds.filter(id => id !== action.id)],
                favoritedRecipes: [...state.favoritedRecipes.filter(recipe => recipe.id !== action.id)]
            };

        case UPDATE_FAVORITE_STATUS:
            return {
                ...state,
                recommendedRecipes: [...state.recommendedRecipes.map(recipe => {
                    recipe.isFavorited = state.favoriteIds.indexOf(recipe.id) > -1;

                    return recipe;
                })],
                favoritedRecipes: [...state.favoritedRecipes.map(recipe => {
                    recipe.isFavorited = state.favoriteIds.indexOf(recipe.id) > -1;

                    return recipe;
                })],
                categoryRecipes: [...state.categoryRecipes.map(recipe => {
                    recipe.isFavorited = state.favoriteIds.indexOf(recipe.id) > -1;

                    return recipe;
                })]
            };

        case FETCH_RECIPE:
            return { ...state, loadingRecipe: true };

        case FETCH_RECIPE_SUCCESS:
            return { ...state,recipe: action.payload, loadingRecipe: false };

        case FETCH_RECIPE_FAILURE:
            return { ...state, loadingRecipe: false };

        case FETCH_CATEGORY_RECIPES:
            return { ...state, loadingCategory: true };
        case FETCH_CATEGORY_RECIPES_SUCCESS:
            return { ...state, loadingCategory: false, categoryRecipes: action.payload };
        case FETCH_CATEGORY_RECIPES_FAILURE:
            return { ...state, loadingCategory: false };

        case REFRESH_CATEGORY_RECIPES:
            return { ...state, refreshingCategory: true };
        case REFRESH_CATEGORY_RECIPES_SUCCESS:
            return { ...state, refreshingCategory: false, categoryRecipes: action.payload };
        case REFRESH_CATEGORY_RECIPES_FAILURE:
            return { ...state, refreshingCategory: false };

        case FETCH_MORE_CATEGORY_RECIPES_SUCCESS:
            return {
                ...state,
                loadingCategory: false,
                categoryRecipes: [...state.categoryRecipes, ...action.payload]
            };


        default:
            return state;
    }
}
