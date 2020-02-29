const {
  send,
  json,
} = require("micro");
let match = require("fs-router")(__dirname + "/routes");

const start = Date.now();

const parse = ({
    url
  }) => url
  .split('?')
  .map(a => a
    .split('&')
    .map(b => b
      .split("=")
    )
    .filter(v => v.length > 1)
    .reduce((c, d) => d.length ? ({
      ...c,
      [d[0]]: d[1]
    }) : c, {})
  ).filter(v => Object.keys(v).length)
  .reduce((a, b) => ({
    ...a,
    ...b
  }))

const defaultHandlers = {
  "/ping": async (_, res) => {
    const now = Date.now();
    send(res, 200, {
      date: {
        time: now,
        readable: new Date(now).toUTCString()
      },
      uptime: {
        time: now - start
      }
    });
  },
  "/echo": async (req, res) => {
    const body = await json(req)
    send(res, 200, {
      params: body,
      query: parse(req)
    })
  },
};

const defaultRoutes = {
  "GET": defaultHandlers,
  "POST": defaultHandlers,
};

module.exports = async function (req, res) {
  const key = req.url.split('?')[0];
  if (defaultRoutes[req.method][key]) return defaultRoutes[req.method][key](req, res);
  let matched = match(req);
  if (matched) return await matched(req, res);
  send(res, 404, {
    error: "Not found"
  });
};