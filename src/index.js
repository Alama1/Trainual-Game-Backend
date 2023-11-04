const app = require('./Application')

app
    .register()
    .then((res) => {
        app.connect()
    })
.catch((err) => {
    console.error(err.message)
})