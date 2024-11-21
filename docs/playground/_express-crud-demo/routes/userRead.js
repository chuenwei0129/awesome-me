const express = require('express')
const router = express.Router()

const { prisma } = require('../prisma')
const { checkUserId } = require('../middlewares/checkUserId')

router.get('/:user_id', checkUserId, async (req, res) => {
  const targetUserId = req.params.user_id

  try {
    const user = await prisma.users.findUnique({
      where: { user_id: targetUserId },
      include: {
        posts: {
          include: {
            users: true,
            likes: {
              include: {
                users: true,
              },
            },
          },
        },
        // A follower is someone who follows you & a following is someone you follow.
        // 这个表就是 following
        followers_followers_user_idTousers: true,
        // 这个表就是 follower
        followers_followers_follower_idTousers: true,
      },
    })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    const followingIds = user.followers_followers_user_idTousers.map(
      (f) => f.follower_id
    )
    const followings = await prisma.users.findMany({
      where: {
        user_id: { in: followingIds },
      },
      select: {
        user_id: true,
        first_name: true,
        last_name: true,
        username: true,
      },
    })

    const followerIds = user.followers_followers_follower_idTousers.map(
      (f) => f.user_id
    )
    const followers = await prisma.users.findMany({
      where: {
        user_id: { in: followerIds },
      },
      select: {
        user_id: true,
        first_name: true,
        last_name: true,
        username: true,
      },
    })

    res.status(200).json({
      user_id: user.user_id,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      followers: followers,
      following: followings,
      posts: user.posts.map((post) => ({
        post_id: post.post_id,
        timestamp: post.date_published,
        text: post.text,
        author: {
          user_id: post.users.user_id,
          first_name: post.users.first_name,
          last_name: post.users.last_name,
          username: post.users.username,
        },
        likes: post.likes.map((like) => ({
          user_id: like.users.user_id,
          first_name: like.users.first_name,
          last_name: like.users.last_name,
          username: like.users.username,
        })),
      })),
    })
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while fetching the user data' })
  }
})

module.exports = router
