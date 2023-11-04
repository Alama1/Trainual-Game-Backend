class PostCard {
    constructor(app) {
        this.app = app
    }
    method = 'POST'
    path = '/card'

    async handleRequest(req, res) {
        const newCardResponse = await this.app.database.createNewCard(req.body.card)
        if (typeof newCardResponse.message === 'object') {
            return res.status(422).json(newCardResponse)
        }
        if (newCardResponse.message === 'Card with this id already exists!') {
            return res.status(409).json(newCardResponse)
        }
        res.status(200).json(newCardResponse)
    }
}

module.exports = PostCard