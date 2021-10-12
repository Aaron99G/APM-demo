const express = require('express');
const path = require('path');
// const Rollbar = require('rollbar');
const rollbar = new Rollbar({
    accessToken: 'ceeef4031d1b4f49936baf4200b1d45c',
    captureUncaught: true,
    captureUnhandledRejections: true,

})

const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

const port = process.env.PORT || 4400;

app.listen(4400, () => {
    console.log(`Server is servin at ${port}`)
})