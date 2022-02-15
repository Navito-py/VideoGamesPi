import React from 'react'

export default function Paginado({gamesPerPage, allGames, paginado}) {
    const pageNumbers = []

    for(let i = 0; i < Math.ceil(allGames/gamesPerPage); i++){
        pageNumbers.push(i + 1)
    }

    let liId = 0
    return (
        <nav>
            <ul>
                {
                    pageNumbers?.map(e => {
                        liId++
                        return(
                            <li key={liId}>
                                <button onClick={() => paginado(e)}>{e}</button>
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
    )
}
