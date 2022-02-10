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