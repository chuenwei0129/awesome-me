const checkUserId = (req, res, next) => {
  req.params.user_id = Number(req.params.user_id)
  if (Number.isNaN(req.params.user_id)) {
    return res.status(404).send({ error_message: 'Invalid user ID' })
  }
  next()
}

module.exports = {
  checkUserId,
}
