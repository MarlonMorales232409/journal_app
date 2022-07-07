import { types } from "../types/types";

const initialState = {
    isLoading: false,
    errorMsg: null,
};

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.uiSetError:
            return { ...state, errorMsg: action.payload };
        case types.uiUnsetError:
            return { ...state, errorMsg: null };
        case types.uiStartLoading:
            return { ...state, isLoading: true };
        case types.uiFinishLoading:
            return { ...state, isLoading: false };
        default:
            return state;
    }
};
