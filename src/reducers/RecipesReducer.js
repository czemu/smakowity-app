import {
    FETCH_RECOMMENDED_RECIPES,
    FETCH_RECOMMENDED_RECIPES_SUCCESS,
    FETCH_RECOMMENDED_RECIPES_FAILURE
} from '../actions/types';

const INITIAL_STATE = {
    recommendedRecipes: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_RECOMMENDED_RECIPES_SUCCESS:
            return { ...state, recommendedRecipes: action.payload };
        default:
            return state;
    }
}
