class PutTable {
    constructor(app) {
        this.app = app
    }
    method = 'PUT'
    path = '/table'

    async handleRequest(req, res) {
        const newTableUser = await this.app.database.addTableUser(req.body.table, req.body.user)
        if (newTableUser.message === 'This table already has such user.') {
            return res.status(409).json(newTableUser)
        }
        return res.status(200).json(newTableUser)
    }
}

module.exports = PutTable