// const User = require('../models/User');
// const bcrypt = require('bcryptjs');

// exports.signup = async (req, res) => {
//   const { name, email, password } = req.body;
//   console.log("Signup request received:", req.body);

//   if (!name || !email || !password) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   try {
//     const existing = await User.findOne({ email });
//     if (existing) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await User.create({ name, email, password: hashedPassword });

//     return res.status(201).json({
//       user: {
//         name: user.name,
//         email: user.email
//       }
//     });
//   } catch (error) {
//     console.error("Signup error:", error);
//     return res.status(500).json({ message: "Signup failed" });
//   }
// };

// exports.login = async (req, res) => {
//   const { email, password } = req.body;
//   console.log("Login request received:", req.body);

//   if (!email || !password) {
//     return res.status(400).json({ message: "Email and password are required" });
//   }

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     return res.status(200).json({
//       user: {
//         name: user.name,
//         email: user.email
//       }
//     });
//   } catch (error) {
//     console.error("Login error:", error);
//     return res.status(500).json({ message: "Login failed" });
//   }
// };


// exports.updatePassword = async (req, res) => {
//   const { currentPassword, newPassword } = req.body;

//   try {
//     const user = await User.findById(req.user.id);

//     if (!user) return res.status(404).json({ message: 'User not found' });

//     const isMatch = await bcrypt.compare(currentPassword, user.password);
//     if (!isMatch) return res.status(400).json({ message: 'Current password is incorrect' });

//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(newPassword, salt);
//     await user.save();

//     res.json({ message: 'Password updated successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// exports.signup = async (req, res) => {
//   const { name, email, password } = req.body;
//   console.log("Signup request received:", req.body);

//   if (!name || !email || !password) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   try {
//     const existing = await User.findOne({ email });
//     if (existing) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await User.create({ name, email, password: hashedPassword });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

//     return res.status(201).json({
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email
//       }
//     });
//   } catch (error) {
//     console.error("Signup error:", error);
//     return res.status(500).json({ message: "Signup failed" });
//   }
// };

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    return res.status(201).json({
      user: { name: user.name, email: user.email },
      token // ✅ include token in response
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Signup failed" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log("Login request received:", req.body);

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    return res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Login failed" });
  }
};

exports.updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Current password is incorrect' });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
