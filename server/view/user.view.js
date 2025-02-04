const express = require('express')
const router  = express.Router()

const {signupUser,loginUser, getUser} = require('../controller/user.controller')

router.get('/',getUser)
router.post('/signup',signupUser)
router.post('/login',loginUser)
router.delete('/logout', (req, res) => {
    // Clear the cookie with the token
    res.clearCookie("token", {
      httpOnly: true, // This ensures the cookie is removed securely
      sameSite: "Strict", // This ensures that the cookie is only sent with requests to the same site
    });
  
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  });
  
module.exports = router