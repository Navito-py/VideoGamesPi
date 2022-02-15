import React from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { getGameByID } from '../actions'  
import { useEffect } from 'react'



export default function Detail(props) {
    const dispatch = useDispatch()

    const id = props.match.params.id

    useEffect(() => {
        dispatch(getGameByID(id))
    },[dispatch, id])

    const game = useSelector((state) => state.detail)

    return (
        <div>
            <Link to='/home'>
            <button>Return home...</button>
            </Link>
            {
                game.length>0?
            <div>
                
                <h1>{game[0].name}</h1>
                <img alt='detail img' width='370px' height='300' src={game[0].background_image} />
                <p>{game[0].description}</p>
                <h3>Release date: {game[0].released}</h3><h3>Rating: {game[0].rating}</h3>
                <h3>Genres: {game[0].genres.map(e => <p>{e.name}</p>)}</h3>
                <h3>Platforms: {game[0].platforms}</h3>
            </div>
                : <div>
                    Loading...
                </div>
            }
        </div>
    )
}
