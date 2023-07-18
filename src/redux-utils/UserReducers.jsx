const initialState = {
    user: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.payload,
            };
        case 'CLEAR_USER':
            return {
                ...state,
                user: null,
            };
        default:
            return state;
    }
};

export default userReducer;


// writing the action in the same file as it is smaller one
export const setUser = (user) => {
    return {
        type: 'SET_USER',
        payload: user,
    };
};

export const clearUser = () => {
    return {
        type: 'CLEAR_USER',
    };
};
