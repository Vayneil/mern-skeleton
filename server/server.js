import express from 'express'
import path from 'path'
import template from './../template.js'
import { MongoClient } from 'mongodb'
import config from './../config/config.js'
import app from './express.js'
import mongoose from 'mongoose'
import devBundle from './devBundle' // dev

devBundle.compile(app) // dev
const CURRENT_WORKING_DIR = process.cwd()

// serve static files from dist folder
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

// handle get requests to /
app.get('/', (req, res) => {
    res.status(200).send(template())
})

// start server
app.listen(config.port, (err) => {
    if (err) {
        console.log(err)
    }
    console.info('Server started on port %s.', config.port)
})

// connect to mongoDB
// const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/mernSimpleSetup'
// MongoClient.connect(url, (err, db) => {
//     console.log("Connected successfully to mongodb server")
//     db.close()
// })
mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${mongoUri}`)
})
