import React from 'react'
import { render } from 'react-dom'
import * as OfflinePluginRuntime from 'offline-plugin/runtime'
import AppRouter from './routes'

OfflinePluginRuntime.install()

if (module.hot) {
    module.hot.accept('./index.js', function() {})
}

render(
    <AppRouter />,
    document.getElementById('root') // eslint-disable-line
)
