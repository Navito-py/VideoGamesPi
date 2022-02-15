import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getGameByName } from '../actions'

export default function SearchBar() {
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    function handleChange(e){
        e.preventDefault()
        setName(e.target.value)
    } 

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getGameByName(name))
    }

    return (
        <div>
            <input type='text' placeholder='Search' onChange={e => handleChange(e)} /><button type='submit' onClick={e => handleSubmit(e)} >Search</button>
        </div>
    )
}
