// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// const app = express();

// // ✅ Middleware
// app.use(cors({
//   origin: 'http://localhost:8080', // or '*' for all during dev
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true
// }));
// app.use(express.json());

// // ✅ MongoDB Connection
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log("MongoDB connected"))
// .catch(err => console.error("MongoDB connection error", err));

// // ✅ Routes
// app.use('/api/auth', require('./routes/auth'));

// // ✅ Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken'); // ✅ required only if used in middleware
require('dotenv').config();

const app = express();

// ✅ Middleware
app.use(cors({
  origin: 'http://localhost:8080',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error", err));

// ✅ Routes
app.use('/api/auth', require('./routes/auth'));

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

