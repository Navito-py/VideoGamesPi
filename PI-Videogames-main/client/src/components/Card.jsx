import React from 'react'

function Card({name, background_image, genres}) {
    let h5id = 0
    return (
        <div>
            <h3>{name}</h3>
            <img alt='' src={background_image} width='250px' height='200px'/>
            {
                genres.map(e => {
                    h5id = h5id + 1
                    return(
                        <h5 key={h5id}>{e.name}</h5>
                    )
                })
            }
        </div>
    )
}

export default Card
