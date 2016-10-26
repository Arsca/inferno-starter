// This is the entry point for our client-side logic
// The server-side has a similar configuration in `src/server/middleware/render.js`
import '../assets/css/index.scss'
import 'isomorphic-fetch'
import 'core/polyfills'
import 'core/logger'
import 'isomorphic-fetch'
import { Router, getRoutes } from 'inferno-router'
import createBrowserHistory from 'history/createBrowserHistory';
import fetchData from 'core/helpers/fetchData'
import Inferno from 'inferno'
import routes from './routes'
import autorun from './autorun'
import stores from './stores'
import App from './containers/App'

// We render our react app into this element
const container = document.getElementById('container')
const browserHistory = createBrowserHistory()
window.browserHistory = browserHistory

// React to changes
autorun(stores)

/**
 * Render our component according to our routes
 * @param location
 */
function renderDOM(location) {
    const routing = routes(stores)
    //const matched = getRoutes(routing, location.pathname)

    //fetchData(matched, stores).then(() => {
        Inferno.render(<App stores={stores}>
            <Router history={browserHistory}>
                {routing}
            </Router>
        </App>, container)
    //})
}

// Render HTML on the browser
renderDOM(browserHistory.location)
// browserHistory.listen(renderDOM)
