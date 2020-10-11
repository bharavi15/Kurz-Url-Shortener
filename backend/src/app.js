const express = require('express')
const path = require('path')
const app = express()
require('./db/mongoose')
const urlRouter = require('./routers/urlRouter')
app.use(express.json())

//MAINTENANCE MODE
app.use((req, res, next) => {
	if (process.env.MAINTENANCE_MODE === 'true')
		res.status(503).send('Website Temporarily down')
	else
		next();
})
app.use(express.static(path.join(__dirname, '../../public')))

app.use(urlRouter)

module.exports = app