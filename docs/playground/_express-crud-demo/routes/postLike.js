const express = require('express')
const router = express.Router()

const { authenticate } = require('../middlewares/authenticate')
const { checkPostId } = require('../middlewares/checkPostId')
const { prisma } = require('../prisma')

// Like a post at a given ID. You may like your own posts, but you can not like the same post twice
router.post('/:post_id/like', authenticate, checkPostId, async (req, res) => {
  const postIdYouWantToLike = req.params.post_id

  try {
    const postIdYouWantToLikeIsExisting = await prisma.posts.findUnique({
      where: {
        post_id: postIdYouWantToLike,
      },
    })

    if (!postIdYouWantToLikeIsExisting) {
      return res
        .status(404)
        .json({ error_message: 'Post You Want to Like not found' })
    }

    // 检查当前用户是否已经喜欢了这篇文章
    const existingLike = await prisma.likes.findFirst({
      where: {
        user_id: req.currentLoginUser.user_id,
        post_id: postIdYouWantToLike,
      },
    })

    if (existingLike) {
      return res
        .status(403)
        .json({ error_message: 'You have already liked this post' })
    }

    // 这里 existingLike 为 null，执行逻辑
    // 创建新的喜欢记录
    await prisma.likes.create({
      data: {
        user_id: req.currentLoginUser.user_id,
        post_id: postIdYouWantToLike,
      },
    })

    res.status(200).json({ message: 'Post liked successfully' })
  } catch {
    res.status(500).json({ error_message: 'Server Error' })
  }
})

router.delete('/:post_id/like', authenticate, checkPostId, async (req, res) => {
  const postIdYouWantToUnLike = req.params.post_id

  try {
    const postIdYouWantToUnLikeIsExisting = await prisma.posts.findUnique({
      where: {
        post_id: postIdYouWantToUnLike,
      },
    })

    if (!postIdYouWantToUnLikeIsExisting) {
      return res
        .status(404)
        .json({ error_message: 'Post You Want to Like not found' })
    }

    // 检查当前用户是否已经喜欢了这篇文章
    const existingLike = await prisma.likes.findFirst({
      where: {
        user_id: req.currentLoginUser.user_id,
        post_id: postIdYouWantToUnLike,
      },
    })

    if (!existingLike) {
      return res.status(403).json({
        error_message: 'You can not unlike a post that you are not liking',
      })
    }

    await prisma.likes.deleteMany({
      where: {
        user_id: existingLike.user_id,
        post_id: existingLike.post_id,
      },
    })

    res.status(200).json({ message: 'Post unliked successfully' })
  } catch {
    res.status(500).json({ error_message: 'Server Error' })
  }
})

module.exports = router
