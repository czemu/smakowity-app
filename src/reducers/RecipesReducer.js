import {
    FETCH_RECOMMENDED_RECIPES,
    FETCH_RECOMMENDED_RECIPES_SUCCESS,
    FETCH_RECOMMENDED_RECIPES_FAILURE
} from '../actions/types';

const INITIAL_STATE = {
    loadingRecommendedRecipes: false,
    recommendedRecipes: [],
    popularRecipes: [],
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_RECOMMENDED_RECIPES:
            return { ...state, loadingRecommendedRecipes: true };
        case FETCH_RECOMMENDED_RECIPES_SUCCESS:
            return { ...state, loadingRecommendedRecipes: false, recommendedRecipes: action.payload };
        case FETCH_RECOMMENDED_RECIPES_FAILURE:
            return { ...state, loadingRecommendedRecipes: false };
        default:
            return state;
    }
}
