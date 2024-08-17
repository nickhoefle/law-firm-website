const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const settingsRoutes = require('./routes/settingsRoutes');

const app = express();
const PORT = 5000;

app.use(cors()); 
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/law-firm', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected')).catch(err => console.error('MongoDB connection error:', err));

//Routes
app.use('/api/settings', settingsRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
