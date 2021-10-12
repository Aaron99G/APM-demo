const express = require('express');
const path = require('path');
const Rollbar = require('rollbar');
const rollbar = new Rollbar({
    accessToken: 'ceeef4031d1b4f49936baf4200b1d45c',
    captureUncaught: true,
    captureUnhandledRejections: true,

})

const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully')
})

let students = []

app.post(('/api/student'), (req, res) => {
    let { name } = req.body
    name = name.trim()

    students.push(name)

    rollbar.log('Student added succesfully', { author: "Aaron", type: 'Manual entry' })

    res.status(200).send(students)
})

app.use(rollbar.errorHandler())

const port = process.env.PORT || 4400;

app.listen(4400, () => {
    console.log(`Server is servin at ${port}`)
})