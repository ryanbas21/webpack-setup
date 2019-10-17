import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const Home = React.lazy(() => import('features/App'))
const Second = React.lazy(() => import('features/Second'))

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

export default AppRouter
