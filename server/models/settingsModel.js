const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
    navbarHeight: { type: String, default: '60px' },
    navbarFont: { type: String, default: 'Arial, sans-serif' },
    navbarBackgroundColor: { type: String, default: 'blue' },
});

module.exports = mongoose.model('Settings', SettingsSchema);
