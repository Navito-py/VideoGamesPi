import React from 'react'
import '../styles/Paginado.css'

export default function Paginado({gamesPerPage, allGames, paginado}) {
    const pageNumbers = []

    for(let i = 0; i < Math.ceil(allGames/gamesPerPage); i++){
        pageNumbers.push(i + 1)
    }

    let liId = 0
    return (
        <div className='divpaginate'>
            {
            pageNumbers?.map(e => {
                liId++
                return(
                    <button className='paginatebutton' key={liId} onClick={() => paginado(e)}>{e}</button>
                )
            })
            }
        </div>
    )
}
