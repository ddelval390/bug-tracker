const Reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                ...action.payload
            };
        case 'LOGOUT':
            return {
                ...state,
                isLoggedIn: action.payload
            };
        default:
            return state;
    }
};

export default Reducer;