import React from 'react'
import { Link } from 'react-router-dom'
import { test } from './second.module.css'

export default function Second() {
    return (
        <div>
            <p className={test}>Hello Page 2</p>
            <Link to={'/'}>Click to go to page 1</Link>
        </div>
    )
}
