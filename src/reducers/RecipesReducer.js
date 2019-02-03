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
} from '../actions/types';

const INITIAL_STATE = {
    loading: false,
    refreshing: false,
    recipes: [],
    favorites: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_RECIPES:
            return { ...state, loading: true };
        case FETCH_RECIPES_SUCCESS:
            return { ...state, loading: false, recipes: action.payload };
        case FETCH_RECIPES_FAILURE:
            return { ...state, loading: false };

        case REFRESH_RECIPES:
            return { ...state, refreshing: true };
        case REFRESH_RECIPES_SUCCESS:
            return { ...state, refreshing: false, recipes: action.payload };
        case REFRESH_RECIPES_FAILURE:
            return { ...state, refreshing: false };

        case FETCH_MORE_RECIPES_SUCCESS:
            return { ...state, loading: false, recipes: [...state.recipes, ...action.payload] };

        case GET_FAVORITES_SUCCESS:
            return { ...state, favorites: action.payload };
        case FAVORITE_RECIPE:
            return { ...state, favorites: [...state.favorites, ...action.id] };

        default:
            return state;
    }
}
