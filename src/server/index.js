
const dotenv = require('dotenv');
dotenv.config();
console.log(`Your API key is ${process.env.API_KEY}`);
const apiKey=process.env.API_KEY


const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const meaningCloudAPIResponse = require('./meaningCloudAPI.js')
var bodyParser = require('body-parser')
var cors = require('cors')

const app = express()

app.use(express.static('dist'))
app.use(cors());

console.log(__dirname)


app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})


app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.get('/APIKEY', function (req, res) {
    res.send(meaningCloudAPIResponse)
})




