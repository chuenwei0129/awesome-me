const express = require('express')
const router = express.Router()

const { prisma } = require('../prisma')

// 按测试要求：不需要登陆也可以 search
// Search the list of users.
// Query parameters can be used to filter the search:
// q: a string to search for the users first name, last name, or username
router.get('/search', async (req, res) => {
  const query = req.query.q || ''
  // 使用 Prisma 的查询构建器来搜索用户
  // 使用 OR 操作符来匹配 first_name、last_name 或 username 中包含查询字符串的用户
  try {
    const users = await prisma.users.findMany({
      where: {
        OR: [
          { first_name: { contains: query } },
          { last_name: { contains: query } },
          { username: { contains: query } },
        ],
      },
      select: {
        user_id: true,
        first_name: true,
        last_name: true,
        username: true,
      },
    })

    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

module.exports = router
