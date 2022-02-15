import React from 'react'
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getAllGames, filterGamesByCreation, FilterByName, getGenres, filterByGenre} from '../actions'
import {Link} from 'react-router-dom'
import Card from './Card'
import Paginado from './Paginado'
import SearchBar from './searchBar'
import '../styles/Home.css'

export default function Home() {
    var multkey2 = 5
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
        <div className='principaldiv' >
            <div className='buttonandsearchbar'>   
                <div className='buttondivcontainer'>
                    <Link to= '/videogame'>
                        <button className='buttoncreategame'>Create new game</button>
                    </Link>
                    <button className='buttoncreategame' onClick= {e => {handleRefresh(e)}}>Refresh all games</button>
                </div>
                <div className='searchbardiv'>
                    <SearchBar/>
                </div>
            </div>
            <div className='allselectshome'>
                <div>
                    <h3 className="h1selects">Filter by:</h3>
                    <select className='homeselects' onChange={e => handleFilterCreation(e)}>
                        <option value='all'>All</option>
                        <option value='existent'>Existent</option>
                        <option value='created'>Created</option>
                    </select>
                </div>
                <div >
                    <h3 className="h1selects">Sort by:</h3>
                    <select className='homeselects' onChange={e => handleSortByName(e)}>
                        <option value='rating'>Default</option>
                        <option value='ASC'>Ascendant</option>
                        <option value='DEC'>Decendent</option>
                        <option value='rating'>Rating</option>
                    </select>
                </div>
                <div >
                    <h3 className="h1selects">Filter By:</h3>
                    <select className='homeselects' onChange={e => handleFilterByGenre(e)}>
                        <option value='All'>All</option>
                        {
                            allGenres.map(e => {
                                return <option key={'b' + multkey2++} value={e.name}>{e.name}</option>
                            })
                        }
                    </select>
                </div>
            </div>
            <div >
                <Paginado
                gamesPerPage = {gamesPerPage}
                allGames = {allGames.length}
                paginado = {paginado}
                />
            </div>
            <div className='cardsdiv'>
            {
                currentGames?.map(e => {
                    return(
                        <div>
                            <Link key={'a' +multkey2++} to = {'/videogame/' + e.id} style={{ textDecoration: 'none' }}>
                                <Card key={e.id} name={e.name} background_image={e.background_image} genres={e.genres}/>
                            </Link>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}
