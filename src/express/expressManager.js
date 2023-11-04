const Express = require('express')

class ExpressManager {
    constructor(app) {
        this.app = app
        this.express = Express()
    }

    init() {
        this.express.use(Express.json())
        this.express.use(this.logger.bind(this))
        this.express.use(this.validateBody.bind(this))

        this.express.post('/card', this.addANewCard.bind(this))
        this.express.post('/table', this.createTable.bind(this))
        this.express.get('/cards', this.getCardsWithTheme.bind(this))
        this.express.get('/tables', this.getAllTables.bind(this))

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

    async createTable(req, res) {
        const newTableResponse = await this.app.database.createNewTable(req.body.table)
        //TODO status management
        return res.status(200).json(newTableResponse)
    }

    async getAllTables(req, res) {
        const getTablesResponse = await this.app.database.getAllTables()
        if (getTablesResponse.status === 'Error') {
            return res.status(500).json(getTablesResponse)
        }
        return res.status(200).json(getTablesResponse)
    }

    connectUserToTheTable() {

    }

    createNewTheme() {

    }

    async addANewCard(req, res) {
        const newCardResponse = await this.app.database.createNewCard(req.body.card)
        if (typeof newCardResponse.message === 'object') {
            return res.status(422).json(newCardResponse)
        }
        if (newCardResponse.message === 'Card with this id already exists!') {
            return res.status(409).json(newCardResponse)
        }
        res.status(200).json(newCardResponse)
    }

    async getCardsWithTheme(req, res) {
        const getCardsResponse = await this.app.database.getCardsWithTheme(req.query.theme)
        return res.status(200).json(getCardsResponse)
    }
}

module.exports = ExpressManager