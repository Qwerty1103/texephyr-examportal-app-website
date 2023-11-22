const jwt = require("jsonwebtoken");

// MUST BE STORED IN DB / CACHE
const refreshTokens = [];

const generateAccessToken = (userData) => {
  return jwt.sign(userData, process.env.SECRETPASS, {
    expiresIn: process.env.TIMEOUT,
  });
};

const generateMemberAccessToken = (userData) => {
  return jwt.sign(userData, process.env.MEMBERPASS, {
    expiresIn: process.env.APPTIMEOUT,
  });
};

const generateAdminAccessToken = (userData) => {
  return jwt.sign(userData, process.env.ADMINKEY, {
    expiresIn: process.env.APPTIMEOUT,
  });
};

const generatePortalAdminAccessToken = (userData) => {
  return jwt.sign(userData, process.env.PORTALADMINKEY, {
    expiresIn: process.env.TIMEOUT,
  });
};

const generateRefreshToken = (userData) => {
  return jwt.sign(userData, process.env.SECRETPASS);
};

const regenerateToken = (refreshToken) => {
  if (refreshToken == null) res.sendStatus(401);

  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);

  jwt.verify(
    refreshToken,
    process.env.SECRETPASS,
    (err, userData) => {
      if (err) return res.sendStatus(403);
      return generateAccessToken({ name: userData.name });
    }
  );
};

const deleteToken = (refreshToken) => {
  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  return "Token Deleted";
};

module.exports = {
  generateAccessToken,
  generateMemberAccessToken,
  generateRefreshToken,
  generatePortalAdminAccessToken ,
  generateAdminAccessToken,
  regenerateToken,
  deleteToken,
};
