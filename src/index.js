import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { render } from 'react-dom'
const Home = React.lazy(() => import('./App'))
const Second = React.lazy(() => import('./second'))

/*eslint-disable*/
if (module.hot) {
    module.hot.accept('./index.js', function() {
        console.log('Accepting the updated printMe module!')
    })
}
/*eslint-enable*/
render(
    <Router>
        <React.Suspense fallback={<p>Loading...</p>}>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/second" component={Second} />
            </Switch>
        </React.Suspense>
    </Router>,
    document.getElementById('root') // eslint-disable-line
)
