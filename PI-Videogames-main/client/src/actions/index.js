 import axios from 'axios'

export function getAllGames(){
    return async function(dispatch){
        var info = await axios.get('http://localhost:3001/videogames')
        return dispatch({
            type: 'GET_GAMES',
            payload: info.data
        })
    }
}

export function filterGamesByCreation(payload){
    return{
        type: 'FILTER_BY_CREATION',
        payload
    }
}

export function FilterByName(payload){
    return{
        type: 'FILTER_BY_NAME',
        payload
    }
}

export function getGenres(){
    return async function(dispatch){
        var info = await axios.get('http://localhost:3001/genres')
        return dispatch({
            type: 'GET_GENRES',
            payload: info.data
        })
    }
}

export function filterByGenre(payload){
    return{
        type: 'FILTER_BY_GENRE',
        payload
    }
}

export function getGameByName(payload){
    return async function(dispatch){
        let info = await axios.get('http://localhost:3001/videogames?name=' + payload)
        return dispatch({
            type: 'SEARCH_BY_NAME',
            payload: info.data
        })
    }
}

export function postGame(payload){
    return async function(dispatch){
        let response = await axios.post('http://localhost:3001/videogame', payload)
        return response
    }
}

export function getGameByID(id){
    return async function(dispatch){
        var info = await axios.get('http://localhost:3001/videogame/' + id)
        return dispatch({
            type: 'GAME_BY_ID',
            payload: info.data
        })
    }
}


