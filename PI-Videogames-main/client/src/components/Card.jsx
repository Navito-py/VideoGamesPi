import React from 'react'

function Card({name, background_image, genres}) {
    return (
        <div>
            <h3>{name}</h3>
            <img src={background_image} width='250px' height='200px'/>
            {
                genres.map(e => {
                    return(
                        <h5>{e.name}</h5>
                    )
                })
            }
        </div>
    )
}

export default Card
