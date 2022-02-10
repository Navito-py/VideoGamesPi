import React from 'react'
import {Link} from 'react-router-dom'

export default function landingPage() {
    return (
        <div className=''>
            <h1>El limite en el mundo es la realidad... pero el limite en los videojuegos, es la imaginacion</h1>
            <Link to='/home'>
                <button>Press Start</button>
            </Link>
        </div>
    )
}
