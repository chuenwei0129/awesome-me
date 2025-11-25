const express = require('express')
const bcrypt = require('bcrypt')

const { prisma } = require('../prisma')
const { authenticate } = require('../middlewares/authenticate')

const router = express.Router()

const generateSessionToken = () =>
  require('crypto').randomBytes(32).toString('hex')

// 注册
router.post('/users', async (req, res) => {
  const { first_name, last_name, username, password } = req.body

  // 校验
  if (!first_name) {
    return res.status(400).json({ error_message: 'Missing first name' })
  }
  if (!last_name) {
    return res.status(400).json({ error_message: 'Missing last name' })
  }
  if (!username) {
    return res.status(400).json({ error_message: 'Missing username' })
  }
  if (!password) {
    return res.status(400).json({ error_message: 'Missing password' })
  }
  if (password.length < 8) {
    return res.status(400).json({ error_message: 'Password too short' })
  }
  if (password.length > 30) {
    return res.status(400).json({ error_message: 'Password too long' })
  }
  if (!/\d/.test(password)) {
    return res
      .status(400)
      .json({ error_message: 'Password must include a number' })
  }
  if (!/[!_@#$%^&*]/.test(password)) {
    return res
      .status(400)
      .json({ error_message: 'Password must include a special character' })
  }
  if (!/[A-Z]/.test(password)) {
    return res
      .status(400)
      .json({ error_message: 'Password must include an uppercase letter' })
  }
  if (!/[a-z]/.test(password)) {
    return res
      .status(400)
      .json({ error_message: 'Password must include a lowercase letter' })
  }

  try {
    const saltRounds = 10
    // 生成指定轮数的盐
    const salt = await bcrypt.genSalt(saltRounds)
    // 使用生成的盐对密码进行哈希
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = await prisma.users.create({
      data: {
        first_name,
        last_name,
        username,
        password: hashedPassword,
        salt,
      },
    })

    res.status(201).json({ user_id: newUser.user_id })
  } catch (error) {
    if (
      // 检查错误是否是由于唯一约束冲突引起的，在 username 字段上
      // 这里使用了 Prisma 的错误代码和元数据来确定是否重复创建同 username 用户
      error.code === 'P2002' &&
      error.meta &&
      error.meta.target.includes('username')
    ) {
      res.status(400).json({ error_message: 'Duplicate username' })
    } else {
      res.status(500).json({ error_message: 'Server Error' })
    }
  }
})

// 登陆
router.post('/login', async (req, res) => {
  const { username, password } = req.body

  // 校验
  if (!username || !password) {
    return res
      .status(400)
      .json({ error_message: 'Username and password are required' })
  }

  if (Object.keys(req.body).length > 2) {
    return res
      .status(400)
      .json({ error_message: 'The request contains extra fields' })
  }

  try {
    const user = await prisma.users.findUnique({
      where: { username },
    })

    if (!user) {
      return res.status(400).json({ error_message: 'User input error' })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return res.status(400).json({ error_message: 'Incorrect password' })
    }

    // Should return the same token if a logged in user tried to login again
    // The user's session_token will be empty the first time.
    if (user.session_token) {
      return res.status(200).json({
        user_id: user.user_id,
        session_token: user.session_token,
      })
    }

    const newSessionToken = generateSessionToken()

    await prisma.users.update({
      where: { user_id: user.user_id },
      data: { session_token: newSessionToken },
    })

    res.status(200).json({
      user_id: user.user_id,
      session_token: newSessionToken,
    })
  } catch (error) {
    res.status(500).json({ error_message: 'Server Error' })
  }
})

// 登出
router.post('/logout', authenticate, async (req, res) => {
  try {
    await prisma.users.update({
      where: { user_id: req.currentLoginUser.user_id },
      data: { session_token: null },
    })
    res.status(200).json({ message: 'Logout successful' })
  } catch (error) {
    res.status(500).json({ error_message: 'Server Error' })
  }
})

module.exports = router
