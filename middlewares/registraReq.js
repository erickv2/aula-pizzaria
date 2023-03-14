const registraReq = (req, res, next) => {
    console.log(`${req.ip} - ${(new Date()).toISOString()} - ${req.url}`);
    next()
}

module.exports = registraReq