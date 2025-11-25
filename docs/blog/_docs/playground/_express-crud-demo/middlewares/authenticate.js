const { prisma } = require('../prisma')

const authenticate = async (req, res, next) => {
  // 遵循测试用例
  const sessionToken = req.headers['x-authorization']

  // 判空
  if (!sessionToken) {
    return res.status(401).json({ error_message: 'Unauthorized' })
  }

  try {
    // 判断是否是当前登陆用户
    const currentLoginUser = await prisma.users.findFirst({
      where: { session_token: sessionToken },
    })

    // sessionToken 瞎几把写的情况
    if (!currentLoginUser) {
      return res.status(401).json({ error_message: 'Unauthorized' })
    }

    // 当前用户已匹配，保存其信息
    req.currentLoginUser = currentLoginUser
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = { authenticate }
