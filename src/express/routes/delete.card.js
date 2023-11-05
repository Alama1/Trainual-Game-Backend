class DeleteCard {
    constructor(app) {
        this.app = app
    }
    method = 'DELETE'
    path = '/card'

    async handleRequest(req, res) {
        const deleteCardResponse = await this.app.database.deleteCard(req.query.id)
        if (deleteCardResponse.message === 'There is no card with this id.') {
            return res.status(409).json(deleteCardResponse)
        }
        return res.status(200).json(deleteCardResponse)
    }
}

module.exports = DeleteCard