const User = require('../models/User');

exports.showLogin = (req, res) => {
  res.render('login', { error: null });
};

exports.postLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.render('login', { error: 'Invalid credentials' });
    const ok = await user.comparePassword(password);
    if (!ok) return res.render('login', { error: 'Invalid credentials' });
    req.session.userId = user._id;
    req.session.username = user.username;
    res.redirect('/');
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => res.redirect('/auth/login'));
};
