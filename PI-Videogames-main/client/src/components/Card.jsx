import React from 'react'
import '../styles/Card.css'

function Card({name, background_image, genres}) {
    let h5id = 0
    return (
        <div className='cardprincipal'>
            <h3 className='cardname'>{name}</h3>
            <img className='cardimg' alt='' src={background_image} width='230px' height='160px'/>
            <div className ='gendercontainer'>
            {
                genres.map(e => {
                    h5id = h5id + 1
                    return(
                        <h5 className='genrerender' key={h5id}>{e.name}</h5>
                        )
                    })
            }
            </div>
        </div>
    )
}

export default Card
