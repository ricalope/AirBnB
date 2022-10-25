const express = require('express');
const router = express.Router();

const { setTokenCookie, requireAuth } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
   check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
   check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
   check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
   check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
   check('firstName')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a first name.'),
   check('lastName')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a last name.'),
   handleValidationErrors
];

router.post('/', validateSignup, async (req, res) => {
   const { email, password, username, firstName, lastName } = req.body;

   const emailExists = await User.findOne({ where: { email: email } });
   const usernameExists = await User.findOne({ where: { username: username } });

   if (emailExists) {
      res.status(403)
      return res.json({
         message: "User already exists",
         statusCode: 403,
         errors: {
            email: "User with that email already exists"
         }
      });
   }

   if (usernameExists) {
      res.status(403)
      return res.json({
         message: "User already Exists",
         statusCode: 403,
         errors: {
            username: "User with that username already exists"
         }
      });
   }

   let user = await User.signup({ email, username, password, firstName, lastName });

   const newToken = await setTokenCookie(res, user);
   user = user.toJSON();
   user.token = newToken

   return res.json(user);
});

module.exports = router;
