// authRoutes.js

const express = require('express');
const router = express.Router();
const User = require('../../models/User');

router.get('/redirect/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.redirect(`/profile/${user.username}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
