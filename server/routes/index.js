const express = require("express");
const router = express.Router();
const path = require("path");

function requiredLogin(req, res, next){
  if(!req.session.user){
    res.redirect("/")
  }else {
    next();
  }
}

router.get('/logout', function(req, res) {
 req.session.authenticated = false
 req.session.destroy();
 return res.redirect('/')
})

router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../..', 'build/index.html'))
})

module.exports = router;
