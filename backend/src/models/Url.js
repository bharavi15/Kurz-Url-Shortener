const mongoose = require('mongoose')
const validator = require('validator')

const urlSchema = new mongoose.Schema({
	shortUrl: {
		type: String,
		trim: true,
		unique: true
	},
	actualUrl: {
		type: String,
		required: true,
		trim: true,
		validate(value) {
			if (!validator.isURL(value))
				throw new Error('Invalid url')
		}
	},
}, {
	timestamps: true
})
urlSchema.index({
	createdAt: 1
}, {
	expireAfterSeconds: parseInt(process.env.SHORT_URL_EXPIRY_IN_SECONDS) || 2592000 //One month
});

urlSchema.pre('save', function (next) {
	const url = this;
	url.shortUrl = generateRandom()
	next();
})

const Url = mongoose.model('Url', urlSchema)

function generateRandom() {
	var length = parseInt(process.env.URL_LENGTH) || 5
	var result = '';
	var characters = process.env.URL_CHARSET;
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

module.exports = Url