import logger from 'debug'
import size from 'lodash/fp/size'
import map from 'lodash/fp/map'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import express from 'express'
import favicon from 'serve-favicon'
import compression from 'compression'
import config from '../../config/server'
import context from './middleware/context'
import render from './middleware/render'
import todos from './routes/todos'
import account from './routes/account'

const app = express()

// Serve static files
if (size(config.http.static)) {
    map(route => {
        logger('server:static')(route.path)
        app.use(route.url, express.static(route.path))
    })(config.http.static)
}

// Settings
app.disable('x-powered-by')
app.use(compression())

// Middleware
app.use(favicon(config.http.favicon))
app.use(bodyParser.json({ limit: '2mb' }))
app.use(bodyParser.urlencoded({ limit: '2mb', extended: true }))

// Needed for authentication
app.use(cookieParser())
app.use(context)

// Routes
app.use(todos)
app.use(account)
app.use(render)

app.listen(config.http.port, function() {
    logger('server:start')('Listening on port ' + config.http.port)
})
