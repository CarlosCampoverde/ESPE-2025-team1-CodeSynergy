
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const router = express.Router();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3001/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ email: profile.emails[0].value });
    if (!user) {
      // No registrar aún, solo pasar el perfil para que el frontend muestre el aviso
      return done(null, { googleProfile: profile, isNewGoogleUser: true });
    }
    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));


router.get('/google/callback', passport.authenticate('google', { session: false, failureRedirect: '/auth?error=google' }), (req, res) => {
  const user = req.user;
  // Si es un usuario nuevo de Google, redirigir con flag para mostrar aviso de registro
  if (user.isNewGoogleUser) {
    // Puedes enviar datos mínimos del perfil si lo necesitas en el frontend
    const email = user.googleProfile.emails[0].value;
    const username = user.googleProfile.displayName.replace(/\s/g, '').toLowerCase();
    const message = encodeURIComponent('Aún no está registrado. ¿Desea registrarse en nuestra aplicación QuickQuote Catering?');
    return res.redirect(`https://espe-2025-team1-codesynergy-2.onrender.com/?registerGoogleUser=true&email=${encodeURIComponent(email)}&username=${encodeURIComponent(username)}&message=${message}`);
  }
  // Usuario ya registrado, login normal
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.redirect(`https://espe-2025-team1-codesynergy-2.onrender.com/?token=${token}`);
});

// Endpoint para registrar usuario Google tras aceptar términos
router.post('/google/register', async (req, res) => {
  try {
    const { email, username, termsAccepted } = req.body;
    if (!email || !username || !termsAccepted) {
      return res.status(400).json({ error: 'Faltan datos o no aceptó los términos.' });
    }
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'El usuario ya está registrado.' });
    }
    user = new User({
      username,
      email,
      password: Math.random().toString(36).slice(-8), // random password
      role: 'client',
      termsAccepted: true
    });
    await user.save();
    // Generar token de acceso
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user._id, username: user.username, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: 'Error al registrar usuario Google.' });
  }
});

module.exports = router;
