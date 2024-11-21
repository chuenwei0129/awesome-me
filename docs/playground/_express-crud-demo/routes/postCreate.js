// app/routes/postCreate.js (1-24)
const express = require('express')
const router = express.Router()

const { prisma } = require('../prisma')
const { authenticate } = require('../middlewares/authenticate')
const { checkText } = require('../middlewares/checkText')

router.post('/', authenticate, checkText, async (req, res) => {
  try {
    const newPost = await prisma.posts.create({
      data: {
        text: req.body.text,
        date_published: Math.floor(Date.now() / 1000),
        author_id: req.currentLoginUser.user_id,
      },
    })
    res.status(201).json({ post_id: newPost['post_id'] })
  } catch (error) {
    res.status(500).json({ error_message: 'Server Error' })
  }
})

module.exports = router
