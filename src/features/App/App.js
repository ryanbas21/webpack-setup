import React from 'react'
import { Link } from 'react-router-dom'
import * as R from 'ramda'
import { css } from './App.module.css'
import { less } from './App.module.less'

export default function App() {
    const obj = { css: 'css', less: 'less' }
    return (
        <>
            <div className={css}>This is {R.prop('css', obj)}</div>
            <div className={less}>This is {R.prop('less', obj)}</div>
            <Link to={'/second'}>Click to go to page 2</Link>
        </>
    )
}
