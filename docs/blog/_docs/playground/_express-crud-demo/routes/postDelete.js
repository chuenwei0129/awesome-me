const express = require('express')
const router = express.Router()

const { prisma } = require('../prisma')
const { authenticate } = require('../middlewares/authenticate')
const { checkPostId } = require('../middlewares/checkPostId')

router.delete('/:post_id', authenticate, checkPostId, async (req, res) => {
  try {
    const { post_id } = req.params

    const post = await prisma.posts.findUnique({
      where: { post_id },
    })

    if (!post) {
      return res.status(404).json({ error_message: 'Post not found' })
    }

    if (post.author_id !== req.currentLoginUser.user_id) {
      return res.status(403).json({ error_message: 'Forbidden' })
    }

    // 先删除所有依赖于该帖子的 likes 记录
    await prisma.likes.deleteMany({
      where: { post_id, user_id: req.currentLoginUser.user_id },
    })

    // 然后删除该帖子
    await prisma.posts.delete({
      where: { post_id },
    })

    res.status(200).json({
      message: 'Post deleted successfully',
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error_message: 'Server Error' })
  }
})

module.exports = router
