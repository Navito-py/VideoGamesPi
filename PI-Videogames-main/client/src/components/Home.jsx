import React from 'react'
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getAllGames, filterGamesByCreation, FilterByName, getGenres, filterByGenre} from '../actions'
import {Link} from 'react-router-dom'
import Card from './Card'
import Paginado from './Paginado'
import SearchBar from './searchBar'

export default function Home() {
    var multkey = 1
    const dispatch = useDispatch()
    const allGames = useSelector((state) => state.games)
    const allGenres = useSelector((state) => state.allGenres)
    const [currentPage,setCurrentPage] = useState(1)
    const [gamesPerPage] = useState(15)
    const [, setRender] = useState('')
    const indexOfLastGame = currentPage * gamesPerPage
    const indexOfFirstGame = indexOfLastGame - gamesPerPage
    const currentGames = allGames.slice(indexOfFirstGame, indexOfLastGame)

    const paginado = (pageNumber) =>{
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getAllGames())
    },[dispatch])

    useEffect(() => {
        dispatch(getGenres())
    },[dispatch])
 
    function handleRefresh(e){
        e.preventDefault()
        dispatch(getAllGames())
    }

    function handleFilterCreation(e){
        e.preventDefault()
        dispatch(filterGamesByCreation(e.target.value))
    }

    function handleSortByName(e){
        e.preventDefault()
        dispatch(FilterByName(e.target.value))
        setCurrentPage(1)
        setRender(`Order ${e.target.value}`)
    }

    function handleFilterByGenre(e){
        e.preventDefault()
        dispatch(filterByGenre(e.target.value))
    }

    return (
        <div>
            <Link to= '/videogame'>Create new game</Link>
            <button onClick= {e => {handleRefresh(e)}}>Refresh all games</button>
            <div>
                <SearchBar/>
            </div>
            <div>
                <h3>Filter by:</h3>
                <select onChange={e => handleFilterCreation(e)}>
                    <option value='all'>All</option>
                    <option value='existent'>Existent</option>
                    <option value='created'>Created</option>
                </select>
            </div>
            <div>
                <h3>Sort by:</h3>
                <select onChange={e => handleSortByName(e)}>
                    <option value='rating'>Default</option>
                    <option value='ASC'>Ascendant</option>
                    <option value='DEC'>Decendent</option>
                    <option value='rating'>Rating</option>
                </select>
            </div>
            <div>
                <h3>Filter By:</h3>
                <select onChange={e => handleFilterByGenre(e)}>
                    <option value='All'>All</option>
                    {
                        allGenres.map(e => {
                            multkey++
                            return <option value={e.name} key={multkey}>{e.name}</option>
                        })
                    }
                </select>
            </div>
            <div>
                <Paginado
                gamesPerPage = {gamesPerPage}
                allGames = {allGames.length}
                paginado = {paginado}
                />
            </div>
            {
                currentGames?.map(e => {
                    return(
                        <div>
                            <Link to = {'/videogame/' + e.id}>
                                <Card key={e.id} name={e.name} background_image={e.background_image} genres={e.genres}/>
                            </Link>
                        </div>
                    )
                })
            }
        </div>
    )
}
