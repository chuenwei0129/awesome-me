const express = require('express')
const router = express.Router()

const { prisma } = require('../prisma')
const { authenticate } = require('../middlewares/authenticate')
const { checkPostId } = require('../middlewares/checkPostId')
const { checkText } = require('../middlewares/checkText')

router.patch(
  '/:post_id',
  authenticate,
  checkPostId,
  checkText,
  async (req, res) => {
    const { text } = req.body

    try {
      const post = await prisma.posts.findUnique({
        where: { post_id: req.params.post_id },
      })

      if (!post) {
        return res.status(404).json({ error_message: 'Post not found' })
      }

      if (post.author_id !== req.currentLoginUser.user_id) {
        return res.status(403).json({ error_message: 'Forbidden' })
      }

      const updatedPost = await prisma.posts.update({
        where: { post_id: req.params.post_id },
        data: { text },
      })

      res.status(200).json(updatedPost)
    } catch {
      res.status(500).json({ error_message: 'Server Error' })
    }
  }
)

module.exports = router
