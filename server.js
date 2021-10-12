const express = require('express');
const path = require('path');
const Rollbar = require('rollbar');
const rollbar = new Rollbar({
    accessToken: 'ceeef4031d1b4f49936baf4200b1d45c',
    captureUncaught: true,
    captureUnhandledRejections: true,

})

const app = express();


app.use(express.json());

app.use('/styles', express.static(path.join(__dirname, './public/styles.css')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully')
})

let students = []

app.post(('/api/student'), (req, res) => {
    let { name } = req.body
    name = name.trim()

    const index = students.findIndex(studentName => studentName = name)

    if (index === -1 && name != '') {
        students.push(name)
        rollbar.log('Student added succesfully', { author: 'AG', type: 'manual entry' })
        res.status(200).send(students)
    } else if (name === '') {
        rollbar.error('No name given')
        res.status(400).send('please provide a name')
    } else {
        rollbar.error('Student already exists')
        res.status(400).send('This student already exists')
    }

    // students.push(name)

    // rollbar.log('Student added succesfully', { author: "Aaron", type: 'Manual entry' })

    // res.status(200).send(students)
})

app.use(rollbar.errorHandler())

const port = process.env.PORT || 4400;

app.listen(port, () => {
    console.log(`Server is servin at ${port}`)
})