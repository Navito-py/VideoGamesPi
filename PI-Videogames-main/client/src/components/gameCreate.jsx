import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {postGame, getGenres} from '../actions/index'
import {useDispatch, useSelector} from 'react-redux'

function validate(input){
    let errors = {}
    if(!input.name){
        errors.name = 'The game must have a name!';
    }if(!input.description){
        errors.description = 'The game must have a description!';
    }if(!input.released){
        errors.released = 'The game must have a release date!';
    }if(!input.rating){
        errors.rating = 'the game must have a rating!';
    }if(input.rating < 0 || input.rating > 5){
        errors.rating = 'The rating must be into 0 and 5 points!';
    }if(!input.platforms){
        errors.platforms = 'The game must have a least 1 platform'
    }if(input.genres.length <= 0){
        errors.genres = 'the game must have a least 1 genre'
    }
    return errors
}

export default function GameCreate() {
    const dispatch = useDispatch()
    let key = 0
    useEffect(() => {
        dispatch(getGenres())
    },[dispatch])

    const stategenres = useSelector((state) => state.allGenres)

    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({
        name:"",
        description:"",
        released:"",
        background_image:"",
        rating:"",
        platforms:"",
        genres:[]
    })

    function handleChange(e){
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
        console.log(errors)
    }

    function handlePlatform(e){
        e.preventDefault()
        setInput({
            ...input,
            platforms: input.platforms +  e.target.value + ' - '
        })
        setErrors(validate({
            ...input,
            platforms: input.platforms + e.target.value + ' - '
        }))
    }

    function handleResetPlatform(e){
        e.preventDefault()
        setInput({
            ...input,
            platforms: ""
        })
    }

    function handleGenres(e){
        e.preventDefault()
        setInput({
            ...input,
            genres: [...input.genres,e.target.value]
        })
        setErrors(validate({
            ...input,
            genres: [...input.genres,e.target.value]
        }))
    }

    function handleResetGenres(e){
        e.preventDefault()
        setInput({
            ...input,
            genres: []
        })
    }

    function handlePostGame(e){
        if(!errors.name && !errors.description && !errors.released && !errors.rating && !errors.platforms && !errors.genres ){
            if(input.name !== ''){
            e.preventDefault()
            dispatch(postGame(input))
            alert('Game created succesfully!')
            setInput({
            name:"",
            description:"",
            released:"",
            background_image:"",
            rating:"",
            platforms:"",
            genres:[]
            })
            }
        }else{
            e.preventDefault()
            alert('sa')
        }
    }

    return (
        <div>
            <Link to='/home' >
                <button>Back to Home...</button>
            </Link>
            <h1>Let`s create our new Game!</h1>
            <form onSubmit={e => handlePostGame(e)}>
                <div>
                    <label>Name: </label><input placeholder='Borderlands' onChange={handleChange} type='text' value={input.name} name='name'></input>
                    {
                        errors.name && (
                            <p>{errors.name}</p>
                        )
                    }
                </div>
                <div>
                    <label>Description: </label><input placeholder='Shoot and loot' onChange={handleChange} type='text' value={input.description} name='description'></input>
                    {
                        errors.description && (
                            <p>{errors.description}</p>
                        )
                    }
                </div>
                <div>
                    <label>Release date: </label><input placeholder='01-01-01' onChange={handleChange} type='date' value={input.released} name='released'></input>
                    {
                        errors.released && (
                            <p>{errors.released}</p>
                        )
                    }
                </div>
                <div>
                    <label>Image URL: </label><input placeholder='Optional...' onChange={handleChange} type='text' value={input.background_image} name='background_image'></input>
                </div>
                <div>
                    <label>Rating: </label><input placeholder='0 to 5' onChange={handleChange} type='text' value={input.rating} name='rating'></input>
                    {
                        errors.rating && (
                            <p>{errors.rating}</p>
                        )
                    }
                </div>
                <div>
                    <label>Platforms: </label>
                    <select onChange= {(e) => handlePlatform(e)}>
                        <option>...</option>
                        <option value='PC'>PC</option>
                        <option value='macOS'>macOS</option>
                        <option value='Linux'>Linux</option>
                        <option value='Xbox 360'>Xbox 360</option>
                        <option value='PlayStation 3'>PlayStation 3</option>
                        <option value='PlayStation 4'>PlayStation 4</option>
                        <option value='PlayStation 5'>PlayStation 5</option>
                        <option value='Android'>Android</option>
                        <option value='PS Vita'>PS Vita</option>
                        <option value='Xbox One'>Xbox One</option>
                        <option value='Nintendo Switch'>Nintendo Switch</option>
                        <option value='iOS'>iOS</option>
                        <option value='Xbox Series S/X'>Xbox Series S/X</option>
                    </select>
                    {
                        errors.platforms && (
                            <p>{errors.platforms}</p>
                        )
                    }
                    <button onClick={(e) => handleResetPlatform(e)}>Reset Platforms</button>
                </div>
                <div>
                    <label>Genres: </label>
                    <select onChange={(e) => handleGenres(e)}>
                        <option>...</option>
                        {
                          stategenres.map(e => {
                              key++
                              return (
                                <option key={key} value={e.name} >{e.name}</option>
                              )
                          })  
                        }
                    </select>
                    {errors.genres && (
                            <p>{errors.genres}</p>
                        )}
                    <button onClick={(e) => handleResetGenres(e)}>Reset Genres</button>
                </div>
                <button type='submit'>Create new game</button>
                <div>
                    <h3>Seleccioned genres:</h3>
                    <ul><li>{input.genres.map(e => e + ', ')}</li></ul>
                </div>
                <div>
                    <h3>Seleccioned platformss:</h3>
                    <h4>{input.platforms}</h4>
                </div>
            </form>
        </div>
    )
}
