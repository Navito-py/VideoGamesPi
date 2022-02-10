const initialState = {
    games: []
}

export default function rootReducer(state= initialState, action) {
    switch (action.type) {
        case 'GET_GAMES':
            return {
                ...state,
                games: action.payload   
            }
    
        default:
            return state;
    }
}