const Reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                ...action.payload,
                isLoggedIn: true
            }
        case 'LOGOUT':
            return {
                ...state,
                role: '',
                userId: '',
                isLoggedIn: false
            }
        case 'OPENSNACKBAR':
            return {
                ...state,
                ...action.snackbarPayload,
                snackbarIsOpen: true,
            }
        case 'CLOSESNACKBAR':
            return {
                ...state,
                snackbarIsOpen: false,
            }
        default:
            return state
    }
}

export default Reducer