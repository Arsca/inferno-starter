if (typeof window === 'undefined') {
    // Enable logging
    process.env.DEBUG = 'inferno:*'

    // Let's add some colors to our console.
    // You might want to use your own logger here.
    const appName = 'inferno'
    const logger = require('debug')
    const debug = logger(appName + ':debug')
    const info  = logger(appName + ':info')
    const warn  = logger(appName + ':warn')
    const error = logger(appName + ':error')

    // Bind methods
    console.debug = debug.bind(console);
    console.info = info.bind(console);
    console.warn = warn.bind(console);
    console.error = error.bind(console);
} else {
    //window.logger2 = logger;
    //window.logger2.enable('inferno:*')
}
