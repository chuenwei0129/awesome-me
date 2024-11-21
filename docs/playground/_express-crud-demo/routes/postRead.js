const express = require('express')
const router = express.Router()

const { prisma } = require('../prisma')
const { checkPostId } = require('../middlewares/checkPostId')

// 不需要登陆
router.get('/:post_id', checkPostId, async (req, res) => {
  try {
    // 使用 include 加载关联的 users、likes 表数据
    const post = await prisma.posts.findUnique({
      where: { post_id: req.params.post_id },
      include: {
        users: {
          select: {
            user_id: true,
            username: true,
            first_name: true,
            last_name: true,
          },
        },
        likes: {
          include: {
            users: {
              select: {
                user_id: true,
                username: true,
                first_name: true,
                last_name: true,
              },
            },
          },
        },
      },
    })

    if (!post) {
      return res.status(404).json({ error_message: 'Post not found' })
    }

    res.status(200).json({
      post_id: post.post_id,
      timestamp: post.date_published,
      text: post.text,
      author: {
        user_id: post.users.user_id,
        username: post.users.username,
        first_name: post.users.first_name,
        last_name: post.users.last_name,
      },
      likes: post.likes.map((like) => like.users),
    })
  } catch {
    res.status(500).json({ error_message: 'Server Error' })
  }
})

module.exports = router
