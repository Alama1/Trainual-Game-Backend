class GetCards {
    constructor(app) {
        this.app = app
    }
    method = 'GET'
    path = '/cardanswer'

    async handleRequest(req, res) {
        const id = req.query.id
        const getCardAnswerResponse = await this.app.database.getCardCorrectAnswer(id)
        if (getCardAnswerResponse.message === 'Card with this is not found.') {
            return res.status(404).json(getCardAnswerResponse)
        }
        return res.status(200).json(getCardAnswerResponse)
    }
}

module.exports = GetCards