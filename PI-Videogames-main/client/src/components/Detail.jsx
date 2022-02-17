import React from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { getGameByID } from '../actions'  
import { useEffect } from 'react'
import '../styles/Detail.css'


export default function Detail(props) {
    const dispatch = useDispatch()
    var key=1
    const id = props.match.params.id

    useEffect(() => {
        dispatch(getGameByID(id))
    },[dispatch, id])

    const game = useSelector((state) => state.detail)

    return (
        <div>
            <div className='divbuttonreturn'>
            <Link to='/home'>
            <button className='buttonreturnh'>Return home...</button>
            </Link>
            </div>
            {
                game.length>0?
            <div>
                
                <h1 className='detailname'>{game[0].name}</h1>
                <img className='imagedetail' alt='detail img' width='370px' height='300' src={game[0].background_image} />
                <p className='descriptiondetail'>{game[0].description}</p>
                <div className ='divrgr'>   
                    <h3 className='rrg'>Release date{<p>{game[0].released}</p>}</h3>
                    <h3 className='rrg'>Rating{<p>{game[0].rating}</p>}</h3>
                    <h3 className='rrg'>Genres{game[0].genres.map(e => <p key={key++}>{e.name}</p>)}</h3>
                </div>
                <h3 className='platformsdetail'>Platforms: {game[0].platforms}</h3>
            </div>
                : <div>
                    <h1 className='loading'>Loading...</h1>
                </div>
            }
        </div>
    )
}
