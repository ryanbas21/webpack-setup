import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { render } from 'react-dom'
const Home = React.lazy(() => import('features/App'))
const Second = React.lazy(() => import('features/Second'))
import * as OfflinePluginRuntime from 'offline-plugin/runtime'

OfflinePluginRuntime.install()

/*eslint-disable*/
if (module.hot) {
    module.hot.accept('./index.js', function() {
        console.log('Accepting the updated printMe module!')
    })
}
/*eslint-enable*/

function AppRouter(props) {
    return (
        <Router>
            <React.Suspense fallback={<p>Loading...</p>}>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/second" component={Second} />
                </Switch>
            </React.Suspense>
        </Router>
    )
}

render(
    <AppRouter />,
    document.getElementById('root') // eslint-disable-line
)
