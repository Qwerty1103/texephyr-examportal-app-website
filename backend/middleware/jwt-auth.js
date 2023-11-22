const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  // const token = authHeader && authHeader.split(" ")[1];
  if (authHeader == null) return res.sendStatus(401);

  jwt.verify(authHeader, process.env.SECRETPASS, (err, user) => {
    if (err) return res.status(403).json({ error: "Token Expired Please Relogin!" });
    req.user = user;
    next();
  });
};

const authenticatePortalAdminToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  // const token = authHeader && authHeader.split(" ")[1];
  if (authHeader == null) return res.sendStatus(401);

  jwt.verify(authHeader, process.env.PORTALADMINKEY, (err, user) => {
    if (err) return res.status(403).json({ error: "Token Expired Please Relogin!" });
    req.user = user;
    next();
  });
};

const authenticateAdminToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  // const token = authHeader && authHeader.split(" ")[1];
  if (authHeader == null) return res.status(403).json({ error: "Token is Null Please Relogin!" });

  jwt.verify(authHeader, process.env.ADMINKEY, (err, user) => {
    if (err) return res.status(403).json({ error: "Token Expired Please Relogin!" });
    req.user = user;
    next();
  });
};

const authenticateMemberToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  // const token = authHeader && authHeader.split(" ")[1];
  if (authHeader == null) return res.status(403).json({ error: "Token is Null Please Relogin!" });

  jwt.verify(authHeader, process.env.MEMBERPASS, (err, user) => {
    if (err) return res.status(403).json({ error: "Token Expired Please Relogin!" });
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken, authenticateMemberToken, authenticateAdminToken ,authenticatePortalAdminToken }
