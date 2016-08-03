const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 8000;

server.use(middlewares);
server.use(function (req, res, next) {
  if (req.method !== 'POST') {
    return next();
  }

  const authorization = req.get('Authorization');
  const check = /^Bearer (.+)$/g;
  const checkResults = check.exec(authorization);
  if (!checkResults) {
    return res.sendStatus(401);
  }

  const [original, token] = checkResults
  console.log(token);
  jwt.verify(token, 'SECRET_KEY', (err, decoded) => {
    if (err) {
      return res.sendStatus(401);
    }

    next();
  });
});

server.use(router);
server.listen(port, function () {
  console.log('JSON Server is running')
})
