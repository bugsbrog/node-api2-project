const Posts = require('./posts-model')
const router = require('express').Router()

router.get('/', async (req, res) => {
    try {
        const getPost = await Posts.find()
        res.json(getPost)
    } catch {
        res.status(500).json({
            message: 'The posts information could not be retrieved'
        })
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
        try {
            const postId = await Posts.findById(id)
                if (!postId) {
                    res.status(404).json({
                        message: 'The post with the specified ID does not exist'
                    })
                } else {
                    res.json(postId)
                }
            } catch {
                res.status(500).json({
                    message: 'The post information could not be retrieved'
                })
            }
})

router.post('/', async (req, res) => {
    try {

    } catch {
        res.status(500).json({
            message: 'There was an error while saving the post to the database'
        })
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
        try {

        } catch {
            res.status(500).json({
                message: ''
            })
        }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
        try {

        } catch {
            res.status(500).json({
                message: 'The post could not be removed'
            })
        }
})

router.get('/:id/comments', async (req, res) => {
    const { id } = req.params
        try {

        } catch {
            res.status(500).json({
                message: 'The comments information could not be retrieved'
            })
        }
})

module.exports = router