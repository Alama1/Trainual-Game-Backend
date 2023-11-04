class GetCards {
    constructor(app) {
        this.app = app
    }
    method = 'GET'
    path = '/cards'

    async handleRequest(req, res) {
        const getCardsResponse = await this.app.database.getCardsWithTheme(req.query.theme)
        return res.status(200).json(getCardsResponse)
    }
}

module.exports = GetCards