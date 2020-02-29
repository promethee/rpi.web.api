const {
  send
} = require('micro')

module.exports.GET = async function (req, res) {
  const now = Date.now();
  send(res, 200, {
    date: {
      time: now,
      readable: (new Date(now)).toUTCString()
    }
  })
}