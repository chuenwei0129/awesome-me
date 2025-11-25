const express = require('express')
const router = express.Router()

const { prisma } = require('../prisma')

// 不需要登陆
router.get('/', async (req, res) => {
  try {
    // 使用 include 加载关联的 users、likes 表数据
    const posts = await prisma.posts.findMany({
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

    if (!posts) {
      return res.status(404).json({ error_message: 'Post not found' })
    }

    const formattedPosts = posts.map((post) => ({
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
    }))

    res.status(200).json(formattedPosts)
  } catch {
    res.status(500).json({ error_message: 'Server Error' })
  }
})

module.exports = router
