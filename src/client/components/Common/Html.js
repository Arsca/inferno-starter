import Inferno from 'inferno'
import Component from 'inferno-component'
import { connect } from 'mobx-connect/inferno'

@connect
class Html extends Component {

    render() {
        const { state } = this.context
        const devServerURL = process.env.NODE_ENV === 'production' ? '' : `http://${state.app.hostname.replace(2000, 2002)}`

        console.debug('=== context:  ', Object.keys(this.context))
        console.debug('=== props:  ', Object.keys(this.props))

        return <html>
            <head>
                <meta charSet="utf-8"/>
                <title>{state.app.title}</title>
                <meta name="title" content={state.app.title}/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>

                {/* Favicons */}
                <link rel="icon" href="/favicon.ico"/>

                {/* Bundled assets */}
                <link href={devServerURL + '/build/bundle.css'} rel="stylesheet"/>
                <script dangerouslySetInnerHTML={{
                    __html: 'window.__STATE = ' + JSON.stringify(state) + ';'
                }}/>
            </head>
            <body>
                {/* Our content rendered here */}
                <div id="root">
                    {this.props.children}
                </div>
                <script async src={devServerURL + '/build/bundle.js'}/>
            </body>
        </html>
    }
}

export default Html
