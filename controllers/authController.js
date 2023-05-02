const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

//handling user authentication
exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid password.' });
  }

  const token = jwt.sign({ username, role: user.role }, process.env.JWT_SECRET);

  res.json({ token });
};

exports.logout = function(req, res) {
  res.header('auth-token', '').send('Logged out');
};