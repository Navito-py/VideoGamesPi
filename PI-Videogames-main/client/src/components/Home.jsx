import React from 'react'
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getAllGames } from '../actions'
import {Link} from 'react-router-dom'
import Card from './Card'

export default function Home() {
    const dispatch = useDispatch()
    const allGames = useSelector((state) => state.games)
    useEffect(() => {
        dispatch(getAllGames())
    },[dispatch])

    function handleRefresh(e){
        e.preventDefault()
        dispatch(getAllGames())
    }

    return (
        <div>
            <Link to= '/videogame'>Create new game</Link>
            <button onClick= {e => {handleRefresh(e)}}>Refresh all games</button>
            <div>
                <h3>Filter by:</h3>
                <select>
                    <option value='all'>All</option>
                    <option value='existent'>Existent</option>
                    <option value='created'>Created</option>
                </select>
            </div>
            <div>
                <h3>Sort by:</h3>
                <select>
                    <option value='alphabetical'>Alphabetical</option>
                    <option value='ascendant'>Ascendant</option>
                    <option value='decendent'>Decendent</option>
                    <option value='rating'>Rating</option>
                </select>
            </div>
            <div>
                <h3>Sort By:</h3>
                <select>
                    <option>Genre</option>
                </select>
            </div>
            {
                allGames?.map(e => {
                    return(
                        <Card name={e.name} background_image={e.background_image} genres={e.genres}/>
                    )
                })
            }
        </div>
    )
}
