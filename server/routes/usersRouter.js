const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

const {User} = require("../models/usersModels");

const router = express.Router();
const jsonParser = bodyParser.json();
const uuidv4 = require('uuid/v4');
/*
router.post('/:confirmationGUID', jsonParser, (req, res) => {

})
*/
router.post('/forgotPassword/:username', jsonParser, (req, res) => {
    let username = req.params.username;
    let confirmationGUID = uuidv4();
    return User
      .findOneAndUpdate({username}, {$set:{confirmationGUID}}, {new: true})
      .then(results => {
        console.log(results);
        console.log(results.email);
        if(results && results.email){
          let url = "http://localhost:8080/resetPassword?q=" + confirmationGUID;
          let html = `<p>Please click on the following link to reset your password:
             <a href=${url}>Click Here</a></p>`;
             let to = results.email;
             let from = "willthinkful@gmail.com";
             let subject = "Reset password";
             sendEmail(from, to, subject, html);
             res.status(201).json({success:true});
             console.log(success);

        }else {
          res.status(401).json({success:false});
        }
        // console.log(results);
      })

      .catch(err => {
        // Forward validation errors on to the client, otherwise give a 500
        // error because something unexpected has happened
        if (err.reason === 'ValidationError') {
          return res.status(err.code).json(err);
        }
        res.status(500).json({code: 500, message: 'Internal server error'});
      });

})

router.post('/resetPassword/:guid', jsonParser, (req, res) => {
    let guid = req.params.guid;
    let password = req.body.password;
    console.log(guid);
    return User.hashPassword(password)
    .then(hash => {
      return User
        .findOneAndUpdate({confirmationGUID: guid}, {$set:{password: hash}}, {new: true})
    })
      .then(results => {
        console.log(results);
        if(results){
            res.status(201).json({success:true});
        }else {
          res.status(401).json({success:false});
        }
        // console.log(results);
      })
      .catch(err => {
        // Forward validation errors on to the client, otherwise give a 500
        // error because something unexpected has happened
        if (err.reason === 'ValidationError') {
          return res.status(err.code).json(err);
        }
        res.status(500).json({code: 500, message: 'Internal server error'});
      });
})

// /api/users/login
router.post('/login', jsonParser, (req, res) => {
  const requiredFields = ['username', 'password'];
  const missingField = requiredFields.find(field => !(field in req.body));
console.log("test");
  if (missingField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Missing field',
      location: missingField
    });
  }

  const stringFields = ['username', 'password'];
  const nonStringField = stringFields.find(field =>
    (field in req.body) && typeof req.body[field] !== 'string'
  );

  if (nonStringField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Incorrect field type: expected string',
      location: nonStringField
    });
  }
  let password = req.body.password;
  let username = req.body.username;
  let userId = null;
  return User
    .find({username})
    .then(results => {
      if(results && results.length > 0) {
        let user = results[0];
        console.log(user);
        userId = user._id;
        return user.validatePassword(password)
        .then(value => {
          console.log(value);
          if (value){
            req.session.user = userId;
            return res.status(201).json({
              code: 201,
              reason: 'Success',
              message: userId,
              location: nonStringField
            });
          } else {
            return res.status(401).json({
              code: 401,
              reason: 'ValidationError',
              message: 'Incorrect  username and or password',
              location: nonStringField
            });
          }
        })
      } else {
        return res.status(401).json({
          code: 401,
          reason: 'ValidationError',
          message: 'Incorrect  username and or password',
          location: nonStringField
        });
      }
      // console.log(results);
      // console.log(results[0].validatePassword(password));
    })
    .catch(err => {
      // Forward validation errors on to the client, otherwise give a 500
      // error because something unexpected has happened
      if (err.reason === 'ValidationError') {
        return res.status(err.code).json(err);
      }
      console.log(err);
      res.status(500).json({code: 500, message: 'Internal server error'});
    });
});

// Post to register a new user
// /api/users/register
router.post('/register', jsonParser, (req, res) => {
  const requiredFields = ['username', 'password'];
  const missingField = requiredFields.find(field => !(field in req.body));
  console.log(req.body);
  if (missingField) {
    console.log(missingField);
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Missing field',
      location: missingField
    });
  }

  const stringFields = ['username', 'password'];
  const nonStringField = stringFields.find(field =>
    (field in req.body) && typeof req.body[field] !== 'string'
  );

  if (nonStringField) {
    console.log(nonStringField);
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Incorrect field type: expected string',
      location: nonStringField
    });
  }

  let {username, password} = req.body;
  console.log("hello");
  return User
    .find({username})
    .count()
    .then(count => {
      if (count > 0) {
        console.log(180);
        // There is an existing user with the same username
        return Promise.reject({
          code: 422,
          reason: 'ValidationError',
          message: 'Username already taken',
          location: 'username'
        });
      }
      // If there is no existing user, hash the password
      return User.hashPassword(password)
    })
    .then(hash => {
      return User
        .create({
          username,
          password: hash
        })
    })
    .then(user => {
      return res.status(201).json({message: 'User created successfully', status: "success"});
    })
    .catch(err => {
      // Forward validation errors on to the client, otherwise give a 500
      // error because something unexpected has happened
      if (err.reason === 'ValidationError') {
        return res.status(err.code).json(err);
      }
      res.status(500).json({code: 500, message: 'Internal server error'});
    });
});

router.get('/', (req, res) => {
  return User
    .find()
    .then(users => res.json(users.map(user => user.apiRepr())))
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});

router.get('/:userId', (req, res) => {
  let userId = req.params.userId
  return User
    .findById(userId)
    .then(users => res.json(users.apiRepr()))
    .catch(err => {
      console.log(err);
      res.status(500).json({message: 'Internal server error'})});
});

router.put('/:id', jsonParser, (req, res) => {
  const requiredFields = ['id'];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  if (req.params.id !== req.body.id) {
    const message = `Request path id (${req.params.id}) and request body id (${req.body.id}) must match`;
    console.error(message);
    return res.status(400).send(message);
  }
  console.log(`Updating blog post \`${req.params.id}\``);
  let obj = {};
  if(req.body.firstName){
    obj.firstName = req.body.firstName;
  }
  if(req.body.lastName){
    obj.lastName = req.body.lastName;
  }
  if(req.body.city){
    obj.city = req.body.city;
  }
  if(req.body.state){
    obj.state = req.body.state;
  }
  if(req.body.zipcode){
    obj.zipcode = req.body.zipcode;
  }
  User.findByIdAndUpdate(req.params.id, {$set:obj
},{new: true})
  .then(jobPosts =>{
    console.log(jobPosts);
    res.status(204).end()})
  .catch(err => res.status(500).json({message: 'Internal server error'}));
});

router.delete('/:id', (req, res) => {
  User
    .findByIdAndRemove(req.params.id)
    .exec()
    .then(() => {
      res.status(204).json({message: 'success'});
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went terribly wrong'});
    });
});

module.exports = router;
