//check bearertoken
module.exports = (req, res, next) => {
  const bearHead = req.headers["authorization"];
  if (typeof bearHead != undefined) {
    const bearToken = bearHead.split(" ");
    const token = bearToken[1];
    req.token = token;
    next();
  } else {
    res.status(403);
  }
};
