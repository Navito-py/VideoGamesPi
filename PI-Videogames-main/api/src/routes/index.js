const { Router } = require('express');
const express = require('express')
const axios = require('axios')
const { Videogame, Genre } = require('../db.js')
const {getApiInfo, getDbInfo, GetAllData, apiGenre} = require('./commands');
const {API_KEY} = process.env
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = express.Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/videogames', async function(req, res){
    const { name } = req.query
    try {let allgames = await GetAllData()
        if(name){
            console.log(name)
            let filtedByName = await allgames.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
            if(filtedByName.length > 0){
                return res.status(200).json(filtedByName)
            }else{
                res.status(404).send('Videogame not found using this name')
            }
        }else{
            res.status(200).json(allgames)
        }
    }catch(err){
        console.log(err)
    }
    
})

router.get('/videogame/:id', async function(req, res) {
    const {id} = req.params
    if(id.includes('-')){
        const arrdb = await getDbInfo()
        const filteddb = arrdb.filter(e => e.id === id)
        if(filteddb.length > 0){
            return res.status(200).json(filteddb)
        }else{
            return res.status(404).send('no one game was found by that id')
        }
    }else{
        var infoarr = []
        const info = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
        infoarr.push(info.data)
        const apidata = infoarr.map(e => {
            return{
                id: e.id,
                name: e.name,
                background_image: e.background_image,
                description: e.description_raw,
                released: e.released,
                rating: e.rating,
                platforms: e.platforms.map(e => {
                    return e.platform.name
                }).join(' - '),
                genres: e.genres.map(e => {
                    return {name: e.name}
                }),
            }
        })
        if(apidata.length > 0){
            return res.status(200).json(apidata)
        }else{
            return res.status(404).send('no one game was found by that id')
        }
    }
})


router.get('/genres', async function(req, res){
    const allgenre = await apiGenre()
    if(allgenre){
        allgenre.map(e => Genre.findOrCreate({
            where: {
                name: e.name
            }
        }))
    }
    res.send(allgenre) 
})


router.post('/videogame', async function(req, res){
    let {name, description, released, rating, platforms, background_image, createdInDb, genres} = req.body
    if(!background_image){
        background_image = 'https://media.rawg.io/media/screenshots/238/238b1d15ead30bfa1c76e3dad6365554.jpg'
    }
    if(name && description && genres && platforms){
        let newgame = await Videogame.create({
            name,
            description,
            released,
            rating,
            background_image,
            createdInDb,
            platforms
        })
        let genreDb = await Genre.findAll({
            where: {
                name: genres
            }
        })
        newgame.addGenre(genreDb)
        res.status(200).json(genreDb)
    }else{
        res.status(404).send('Please, Complete all the fields')
    }
})



module.exports = router;
