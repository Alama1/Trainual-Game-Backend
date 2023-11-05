const Express = require('express')
const {readdirSync} = require("fs");
const path = require("path");

class ExpressManager {
    constructor(app) {
        this.app = app
        this.express = Express()
    }

    init() {
        this.express.use(Express.json())
        this.express.use(this.logger.bind(this))
        this.express.use(this.validateBody.bind(this))

        let routes = readdirSync(path.join(__dirname, 'routes')).filter(file => file.endsWith('.js'))
        for (const  file of routes) {
            const route = new (require(`./routes/${file}`))(this.app)
            switch (route.method) {
                case 'GET':
                    this.express.get(route.path, route.handleRequest.bind(this))
                    break
                case 'POST':
                    this.express.post(route.path, route.handleRequest.bind(this))
                    break
                case 'PUT':
                    this.express.put(route.path, route.handleRequest.bind(this))
                    break
                case 'DELETE':
                    this.express.delete(route.path, route.handleRequest.bind(this))
            }
        }

        this.express.listen(this.app.config.properties.express.port, () => {
            console.log(`Listening on port ${this.app.config.properties.express.port}`)
        })
    }

    logger(req, res, next) {
        console.log(`New ${req.method} request for the route ${req.originalUrl}`)
        next()
    }

    validateBody(req, res, next) {
        const path = req.path
        const method = req.method
        if (path === '/cards' && method === 'GET') {
            if (!req.query.hasOwnProperty('theme')) {
                return res.status(422).json({
                    status: 'Error',
                    message: 'You need to specify theme in query params.'
                })
            }
        }

        if (path === '/card' && method === 'POST') {
            if (!req.hasOwnProperty('body')) {
                return res.status(422).json({
                    status: 'Error',
                    message: 'You need to have body in your request.'
                })
            }
        }
        next()
    }
}

module.exports = ExpressManager