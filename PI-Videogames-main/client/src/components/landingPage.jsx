import React from 'react'
import {Link} from 'react-router-dom'
import '../styles/landingPage.css'

export default function landingPage() {
    return (
        <div className='divcontainer'>
            <h1 className='h1landing'>everything mortal fades with time, the spirit endures - 'Paarthurnax'</h1>
            <Link to='/home'>
                <button className='buttonlanding'>Press Start</button>
            </Link>
        </div>
    )
}
