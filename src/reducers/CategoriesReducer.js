import {
    FETCH_CATEGORIES,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORIES_FAILURE
} from '../actions/types';

const INITIAL_STATE = {
    loadingCategories: false,
    categories: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_CATEGORIES:
            return { ...state, loadingCategories: true };
        case FETCH_CATEGORIES_SUCCESS:
            return { ...state, loadingCategories: false, categories: action.payload };
        case FETCH_CATEGORIES_FAILURE:
            return { ...state, loadingCategories: false };

        default:
            return state;
    }
}
