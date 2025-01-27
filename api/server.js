const express = require('express')

const postsRouter = require('./posts/posts-router')

const server = express()

const cors = require("cors");

server.use(express.json())

server.use(cors())

server.use('/api/posts', postsRouter)

server.use('*', (req, res) => {
    res.status(404).json({
        message: 'Having trouble finding this'
    })
})

module.exports = server