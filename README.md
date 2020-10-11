# Kurz-Url-Shortener

Kurz-Url-Shortener is the only URL shortener you will ever need. It's written with help of [Node.js](https://nodejs.org), [Express](https://expressjs.com), and [MongoDB](https://www.mongodb.com)

It also uses rate-limiter to limit the number of requests from same IP address. This prevents flooding of requests and database.
## Installation

Use Git clone to clone into the repository.

```cmd
git clone https://github.com/bharavi15/Kurz-Url-Shortener.git
```
Then install the required dependencies 
```cmd
cd Kurz-Url-Shortener && npm install
```

## Usage

### Configuration

Set the following Environment variables in ```./config/dev.env ```
```
APP_NAME = <Application-name>
PORT = <Port for server>
URL_LENGTH = <Length of short URL>
URL_CHARSET = <Character set for the short URL to be generated>
SHORT_URL_EXPIRY_IN_SECONDS =  <Expiry time for auto deletion of old URLs>
MONGODB_URL = <MongoDB URL to connect to database>
MAINTENANCE_MODE = <true|false to enable or disable Maintenance mode>
```
Modify scripts in ```package.json``` file to match the file path 
```
"dev": "env-cmd -f <Path/to/.env> nodemon src/server.js"
"startdb": "<Path/to/mongod.exe> --dbpath <Path/to/database-storage>" 
```

### Running the server in Development mode

```cmd
npm run dev
```
### Using as API
Send a [POST](https://en.wikipedia.org/wiki/POST_(HTTP)) request to ```https://<domain-name>/new```
```json
{
"url":"<URL to be shortened>"
}
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

It uses [jQuery](https://jquery.com/) for AJAX calls and [Materialize CSS](http://materializecss.com), [Material Icons](https://material.io/resources/icons/?style=baseline) for styling.

## License
The code from this repo is [MIT](https://choosealicense.com/licenses/mit/) licensed.
