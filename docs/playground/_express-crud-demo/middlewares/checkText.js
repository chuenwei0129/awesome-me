const checkText = (req, res, next) => {
  // 检查是否存在额外的不需要的字段
  const allowedFields = ['text']
  const actualFields = Object.keys(req.body)
  const isExtraFields = actualFields.some(
    (field) => !allowedFields.includes(field)
  )

  if (isExtraFields) {
    return res
      .status(400)
      .json({ error_message: 'Extra fields are not allowed' })
  }

  // 判空
  if (!req.body.text) {
    return res.status(400).json({ error_message: 'Text is required' })
  }

  // TODO: 实现脏话过滤逻辑

  next()
}

module.exports = {
  checkText,
}
