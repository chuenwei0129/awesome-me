const checkPostId = (req, res, next) => {
  req.params.post_id = Number(req.params.post_id)
  if (Number.isNaN(req.params.post_id)) {
    return res.status(404).send({ error_message: 'Invalid Post ID' })
  }
  next()
}

module.exports = {
  checkPostId,
}
