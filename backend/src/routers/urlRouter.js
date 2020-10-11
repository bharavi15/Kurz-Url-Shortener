const express = require('express')
const router = new express.Router()
const Url = require('../models/Url')
const qrcode = require('qrcode')
const rateLimit = require("express-rate-limit");

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);
const rateInSeconds = 60;
const limiter = rateLimit({
	windowMs: rateInSeconds * 1000, // 60 secs
	max: 2, // limit each IP to 100 requests per windowMs
	message: {
		message: `Too many requests, please try again after ${rateInSeconds} seconds`
	}
});


router.post('/new', limiter, async (req, res, next) => {
	const url = new Url({
		actualUrl: /(https?|ftp):\/\//.test(req.body.url) ? req.body.url : "http://" + req.body.url
	})
	try {
		await url.save()
		const dataToBeSent = {
			actualUrl: url.actualUrl,
			shortUrl: req.headers.origin + "/" + url.shortUrl,
			expireAt: new Date(new Date().getTime() + ((parseInt(process.env.SHORT_URL_EXPIRY_IN_SECONDS) || 2592000) * 1000)).getTime()
		}
		dataToBeSent.qrCodeImage = await qrcode.toDataURL(dataToBeSent.shortUrl)
		res.status(201).send(dataToBeSent)
	} catch (error) {
		console.log(error)
		res.status(400).send(error)
	}
})

router.get('/:id', async (req, res) => {
	const _id = req.params.id;
	try {
		//const url = await Url.findById(_id)
		const url = await Url.findOne({
			shortUrl: _id
		})
		if (!url) {
			return res.status(404).send();
		}
		res.statusCode = 302;
		res.setHeader("Location", url.actualUrl);
		res.end();
	} catch (error) {
		res.status(500).send();
	}
})

module.exports = router