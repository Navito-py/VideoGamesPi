const axios = require('axios')
const { Videogame, Genre } = require('../db.js')
const { API_KEY } = process.env

// ----------- ACA VOY A CREAR LOS COMANDOS PARA TRAER INFO DE LA API Y LA BASE DE DATOS A LAS RUTAS-----------

async function getApiInfo() {
    let promises = []
    let allgames = []
    try{
        for(let i = 1; i <= 5; i++){
            promises.push(axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`)
            .then((response) => {
                return response
            }))
        }
        await Promise.all(promises)
        .then((response) => {
            for(let i = 0; i< promises.length; i++){
                allgames = allgames.concat(response[i].data.results.map(e => {
                    return{
                        id: e.id,
                        name: e.name,
                        background_image: e.background_image,
                        genres: e.genres.map(e => {
                            return {name: e.name}
                        }),
                        platforms: e.platforms.map(e => {
                            return e.platform.name
                        }).join(' - '),
                        rating: e.rating,
                        released: e.released

                    }
                }))
            }
        })
        return allgames
    }catch(error){
        console.log(error)
    }
}

async function getDbInfo() {
    const data = await Videogame.findAll({
        include:{
            model: Genre,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })
    return data
}

async function GetAllData () {
    let apiInfo = await getApiInfo()
    let dbInfo = await getDbInfo()
    let allData = apiInfo.concat(dbInfo)
    return allData
}

const apiGenre = async function(){
    const info = await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    const parsedinfo = await info.data.results.map(e => {
        return {
            name: e.name
        }
    })
    return parsedinfo
}

module.exports = {
    getApiInfo, getDbInfo, GetAllData, apiGenre
}