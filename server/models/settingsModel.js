const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
    navbarHeight: { type: String, default: '60px' },
    navbarFont: { type: String, default: 'Arial, sans-serif' },
    navbarBackgroundColor: { type: String, default: 'blue' },
    navbarLinks: [String],
    navbarLinksFontSize: { type: Number },
    navbarLinksFontColor: { type: String, default: 'black'},
    navbarLinksBoxHover: { type: Boolean, default: false },
    navbarLinksBlockWidth: { type: Number, },  
    navbarLinksHorizontalPlacement: { type: String, default: 'left' },
    navbarLinksSnapMiddleVertically: { type: Boolean },
    navbarLinksVerticalTopPercent: { type: Number, default: 50 }
});

module.exports = mongoose.model('Settings', SettingsSchema);
