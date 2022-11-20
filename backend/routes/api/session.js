const express = require('express');
const router = express.Router();

const { setTokenCookie, restoreUser } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateLogin = [
   check('credential')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Please provide a valid email or username.'),
   check('password')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a password.'),
   handleValidationErrors
];

router.post('/', validateLogin, async (req, res, next) => {
   const { credential, password } = req.body;

   let user = await User.login({ credential, password });

   if (!user) {
      res.status(401)
      return res.json({
         message: "Invalid credentials",
         statusCode: 401
      });
   }

   const newToken = await setTokenCookie(res, user);
   user = user.toJSON()
   user.token = newToken

   return res.json(user);
});

router.delete('/', async (_req, res) => {
   res.clearCookie('token');
   return res.json({ message: 'success' });
});

router.get('/', restoreUser, (req, res) => {
   const { user } = req;
   if (user) {
      return res.json(user.toSafeObject());
   } else {
      return res.json(null);
   }
});

module.exports = router;
