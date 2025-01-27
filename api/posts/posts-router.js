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

// .then() .catch() way

// Posts.find()
//  .then(getPost => {
//     res.json(getPost)
//  })
// .catch(err => {
//    res.status(500).json({
//        message: 'The posts information could not be retrieved'
//    })
// })

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
    const { title, contents } = req.body
        try {
            if (!title || !contents) {
                res.status(400).json({
                    message: 'Please provide title and contents for the post'
                })
            } else {
                const createPost = await Posts.insert({ title, contents })
                // WHY DO WE HAVE TO DO IT THIS WAY?
                const newPost = await Posts.findById(createPost.id)
                res.status(201).json(newPost)
            }
        } catch {
            res.status(500).json({
                message: 'There was an error while saving the post to the database'
            })
        }
})

// .then() .catch() way

// const { title, contents } = req.body
//  if (!title || !contents) {
//      res.status(400).json({
//          message: 'Please provide title and contents for the post'
//      })
//  } else {
//      Post.insert({ title, contents })
//        .then(({ id }) => {
//          return Posts.findById(id)
//        })
//        .then(newPost => {
//          res.status(201).json(newPost)
//        })
//        .catch(err => {
//           res.status(500).json({
//               message: 'There was an error while saving the post to the database'
//           })
//        })
// }

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { title, contents } = req.body
        try {
            const postId = await Posts.findById(id)
                if (!postId) {
                    res.status(404).json({
                        message: 'The post with the specified ID does not exist'
                    })
                } else if (!title || !contents) {
                    res.status(400).json({
                        message: 'Please provide title and contents for the post'
                    })
                } else {
                    await Posts.update(id, { title, contents })
                    // WHY DO WE HAVE TO DO IT THIS WAY?
                    const updatePost = await Posts.findById(id)
                    res.json(updatePost)
                }
            } catch {
                res.status(500).json({
                    message: 'The post information could not be modified'
                })
            }
})

// .then() .catch() way

// const { id } = req.params
// const { title, contents } = req.body
//  if (!title || !contents) {
//      res.status(400).json({
//          message: 'Please provide title and contents for the post'
//      })
//   } else {
//     Posts.findById(id)
//       .then(postId => {
//          if (!postId) {
//              res.status(404).json({
//                  message: 'The post with the specified ID does not exist'
//              })
//          } else {
//            return Posts.update(id, { title, contents })
//          }
//       })
//      .then(updatePost => {
//          if (updatePost) {
//              return Posts.findById(id)
//          }
//      })
//      .then(post => {
//         if (post) {
//            res.json(post)
//         }
//      })
//      .catch(err => {
//         res.status(500).json({
//             message: 'The post information could not be modified'
//         })
//      })

router.delete('/:id', async (req, res) => {
    const { id } = req.params
        try {
            const deletePost = await Posts.findById(id)
                if (!deletePost) {
                    res.status(404).json({
                        message: 'The post with the specified ID does not exist'
                    })
                } else {
                    // When Posts.remove resolves, it will resolve eventually to the # of records that got deleted from the db (Example: 1 will show up if you delete 1 record)
                    await Posts.remove(id)
                    res.json(deletePost)
                }
            } catch {
                res.status(500).json({
                    message: 'The post could not be removed'
                })
            }
})

router.get('/:id/comments', async (req, res) => {
    const { id } = req.params
        try {
            const postId = await Posts.findById(id)
                if (!postId) {
                    res.status(404).json({
                        message: 'The post with the specified ID does not exist'
                    })
                } else {
                    const comment = await Posts.findPostComments(id)
                    res.json(comment)
                }
            } catch {
                res.status(500).json({
                    message: 'The comments information could not be retrieved'
                })
            }
})

module.exports = router