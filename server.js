const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 8000;

server.use(middlewares);
server.use(function (req, res, next) {
  jwt.verify(req.cookies.accessToken, 'SECRET_KEY', (err, decoded) => {
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
