const Express = require('express')

class ExpressManager {
    constructor(app) {
        this.app = app
        this.express = Express()
    }

    init() {
        this.express.use(Express.json())
        this.express.use(this.auth.bind(this))

        this.express.listen(3000)
    }

    auth(req, res, next) {
        console.log(`New request: ${JSON.stringify(req.body)}`)
        next()
    }
}

module.exports = ExpressManager