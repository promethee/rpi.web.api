const {
  send
} = require('micro')

module.exports.GET = async function (req, res) {
  send(res, 200, {
    params: req.params,
    query: req.query
  })
}