const express= require('express');
const app = express();

const PORT = 3000;
app.use(express.json());

// Set up routes
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);


app.listen(PORT, () => {
    console.log(`Server is listening to port .. ${PORT}`)
})

