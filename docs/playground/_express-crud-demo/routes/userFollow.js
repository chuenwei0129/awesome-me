const express = require('express')
const router = express.Router()

const { authenticate } = require('../middlewares/authenticate')
const { prisma } = require('../prisma')
const { checkUserId } = require('../middlewares/checkUserId')

// A follower is someone who follows you & a following is someone you follow.
// The logged in user will follow the user at a given ID.
router.post('/:user_id/follow', authenticate, checkUserId, async (req, res) => {
  const userIdYouWantToFollow = req.params.user_id

  // Should return 404 when trying to follow a user that does not exist in the application
  const userIdYouWantToFollowIsExisting = await prisma.users.findUnique({
    where: {
      user_id: userIdYouWantToFollow,
    },
  })

  if (!userIdYouWantToFollowIsExisting) {
    return res
      .status(404)
      .json({ error_message: 'User You Want Follow not found' })
  }

  try {
    const existingFollow = await prisma.followers.findFirst({
      where: {
        user_id: req.currentLoginUser.user_id,
        follower_id: userIdYouWantToFollow,
      },
    })

    if (existingFollow) {
      return res
        .status(403)
        .json({ error_message: 'You have already followed this user' })
    }

    await prisma.followers.create({
      data: {
        user_id: req.currentLoginUser.user_id,
        follower_id: userIdYouWantToFollow,
      },
    })

    res.status(200).json({
      message: 'Successfully followed the user',
    })
  } catch (error) {
    res.status(500).json({ error_message: 'Server Error' })
  }
})

// The logged in user will stop following the user at a given ID.
router.delete(
  '/:user_id/follow',
  authenticate,
  checkUserId,
  async (req, res) => {
    const userIdYouWantToUnFollow = req.params.user_id

    try {
      // Should return 404 when trying to follow a user that does not exist in the application
      const userIdYouWantToUnFollowIsExisting = await prisma.users.findUnique({
        where: {
          user_id: userIdYouWantToUnFollow,
        },
      })

      if (!userIdYouWantToUnFollowIsExisting) {
        return res
          .status(404)
          .json({ error_message: 'User You Want to UnFollow not found' })
      }

      const existingFollow = await prisma.followers.findFirst({
        where: {
          user_id: req.currentLoginUser.user_id,
          follower_id: userIdYouWantToUnFollow,
        },
      })

      if (!existingFollow) {
        return res.status(403).json({
          error_message:
            'You cannot unfollow a user that you are not following',
        })
      }

      await prisma.followers.deleteMany({
        where: {
          user_id: existingFollow.user_id,
          follower_id: existingFollow.follower_id,
        },
      })

      res.status(200).json({ message: 'User unfollowed successfully' })
    } catch (error) {
      res.status(500).json({ error_message: 'Server Error' })
    }
  }
)

module.exports = router
