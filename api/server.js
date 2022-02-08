const express = require('express')

const server = express()

const postsRouter = require('./posts/posts-router')

server.use(express.json())

server.use('/api/posts', postsRouter)

server.use('*', (req, res) => {
    res.status(404).send(`
    <p>Having trouble finding that resource</p>
    `)
})

module.exports = server