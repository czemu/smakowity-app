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
} from '../actions/types';

const INITIAL_STATE = {
    loadingRecommended: false,
    refreshingRecommended: false,
    recommendedRecipes: [],
    favoriteIds: [],
    loadingFavorited: false,
    refreshingFavorited: false,
    favoritedRecipes: []
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
            return { ...state, loadingRecommended: false, recommendedRecipes: [...state.recommendedRecipes, ...action.payload] };

        case GET_FAVORITED_SUCCESS:
            return { ...state, favoriteIds: action.payload };

        case FETCH_FAVORITED_RECIPES:
            return { ...state, loadingFavorited: true };
        case FETCH_FAVORITED_RECIPES_SUCCESS:
            return { ...state, loadingFavorited: false, favoritedRecipes: action.payload };
        case FETCH_FAVORITED_RECIPES_FAILURE:
            return { ...state, loadingFavorited: false };

        case REFRESH_FAVORITED_RECIPES:
            return { ...state, refreshingFavorited: true };
        case REFRESH_FAVORITED_RECIPES_SUCCESS:
            return { ...state, refreshingFavorited: false, favoritedRecipes: action.payload };
        case REFRESH_FAVORITED_RECIPES_FAILURE:
            return { ...state, refreshingFavorited: false };

        case FETCH_MORE_FAVORITED_RECIPES_SUCCESS:
            return { ...state, loadingFavorited: false, favoritedRecipes: [...state.favoritedRecipes, ...action.payload] };

        default:
            return state;
    }
}
