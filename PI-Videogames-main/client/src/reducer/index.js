const initialState = {
    games: [],
    allGames: [],
    allGenres: [],
    detail: []
}

export default function rootReducer(state= initialState, action) {
    switch (action.type) {
        case 'GET_GAMES':
            return {
                ...state,
                games: action.payload , 
                allGames: action.payload
            }
        case 'FILTER_BY_CREATION':
            const games = state.allGames 
            const createdFilter = action.payload === 'created' ? games.filter(e => e.createdInDb) : games.filter(e => !e.createdInDb)
            return{
                ...state,
                games: action.payload === 'all' ? state.allGames : createdFilter
            }
        case 'FILTER_BY_NAME':
            const info = state.allGames
            if(action.payload === 'rating'){
                const sort = info.sort(function (a,b){
                    if(a.rating > b.rating){
                        return -1
                    }if(b.rating > a.rating) {
                        return 1;
                    }
                    return 0
                })
                return{
                    ...state,
                    games: sort
                }
            }else{
                const sortedinfo =  action.payload === 'ASC'?
                info.sort(function(a,b){
                    if(a.name > b.name){
                        return 1
                    }
                    if(a.name < b.name){
                        return -1
                    }
                    return 0
                }):
                info.sort(function(a,b) {
                    if(a.name > b.name){
                        return -1
                    }
                    if(a.name < b.name){
                        return 1
                    }
                    return 0
                })  
                return{
                    ...state,
                    games: sortedinfo
                }
            }
        case 'GET_GENRES':
            return{
                ...state,
                allGenres: action.payload
            }
        case 'FILTER_BY_GENRE':
            const infogames = state.allGames
            const genrefilted = action.payload === 'All'? infogames : 
            infogames.filter(e => e.genres.map(g => g.name).includes(action.payload))
            return{
                ...state,
                games: genrefilted
            }
        case 'SEARCH_BY_NAME':
            return{
                ...state,
                games: action.payload
            }
        case 'GAME_BY_ID':
            return{
                ...state,
                detail: action.payload
            }
        case 'POST_GAME':
            return{
                ...state
            }
        default:
            return state;
            
    }
}