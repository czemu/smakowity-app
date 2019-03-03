import {
    FETCH_CATEGORIES,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORIES_FAILURE
} from './types';

import {
    getCategories
} from '../api/smakowity';

export function fetchCategoriesRequest() {
    return {
        type: FETCH_CATEGORIES
    };
}

export function fetchCategoriesSuccess(categories) {
    return {
        type: FETCH_CATEGORIES_SUCCESS,
        payload: categories
    };
}

export function fetchCategoriesFailure() {
    return {
        type: FETCH_CATEGORIES_FAILURE,
    };
}

export function fetchCategories() {
    return dispatch => {
        dispatch(fetchCategoriesRequest());

        return getCategories()
            .then(categories => dispatch(fetchCategoriesSuccess(categories)))
            .catch(() => dispatch(fetchCategoriesFailure()))
    }
}
