const express = require('express');
const mongoose = require('mongoose'); 
const cors = require('cors');
const Employe = require('./model/Employes');
const nodemailer = require('nodemailer');


const app = express();


app.use(express.json());
app.use(cors());


mongoose.connect('mongodb://localhost:27017/employees', {
 
})
.then(() => {
  console.log('MongoDB connected ✅');
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});

app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
  
    Employe.create({ name, email, password })
      .then(user => {
        console.log('User created:', user);
        res.status(201).json({ message: 'Signup successful!', user });
      })
      .catch(err => {
        console.error('Error signing up:', err);
        res.status(500).json({ error: 'Signup failed' });
      });
  
    res.json({ message: 'Signup successful!' });
  });
 app.post('/login', (req, res) => {
  const { email, password } = req.body;

  Employe.findOne({ email, password })
    .then(user => {
      if (user) {
        res.json({ message: 'Login successful!', user });
      } else {
        res.status(401).json({ error: 'Invalid email or password' });
      }
    })
    .catch(err => {
      console.error('Login error:', err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'palsamarth29@gmail.com', 
    pass: '' 
  }
});

const generateOtp = () => Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit OTP

app.post('/otp', (req, res) => {
  const { email } = req.body;

  const otp = generateOtp();

  const mailOptions = {
    from: 'palsamarth29@gmail.com',
    to: email,
    subject: 'Your OTP Code',
    html: `<h2>Your OTP is: <b>${otp}</b></h2>`
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to send OTP', error: err });
    } else {
      console.log('Email sent: ' + info.response);
      return res.status(200).json({ message: 'OTP sent successfully', otp }); // Send otp back only for testing (remove later)
    }
  });
});

  
// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000 🚀');
});
