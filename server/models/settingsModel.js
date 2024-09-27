const mongoose = require('mongoose');

const NavbarLinkSchema = new mongoose.Schema({
    name: { type: String, required: true },
    isDropdownLink: { type: Boolean, default: false },
    dropdownLinks: { type: [String], default: [] }
});

const SettingsSchema = new mongoose.Schema({
    navbarHeight: { type: String, default: '60px' },
    navbarFont: { type: String, default: 'Arial, sans-serif' },
    navbarBackgroundColorGradient: { type: Boolean, default: false },
    navbarBackgroundColorGradientStart: { type: String, default: 'red'},
    navbarBackgroundColorGradientEnd: { type: String, default: 'orange' },
    navbarBackgroundColor: { type: String, default: 'blue' },
    navbarRoundedBorder: { type: Boolean, default: false },
    navbarTopLeftBorderRadius: { type: Number, default: 0 },
    navbarTopRightBorderRadius: { type: Number, default: 0 },
    navbarBottomLeftBorderRadius: { type: Number, default: 0 },
    navbarBottomRightBorderRadius: { type: Number, default: 0 },
    navbarLinks: { type: [NavbarLinkSchema], default: [] },
    navbarDropdownLinksIndent: { type: Number, default: 10 },
    navbarDropdownLinksVerticalPadding: { type: Number, default: 10 },
    navbarLinksSpaceAround: { type: Number, default: 20 },
    navbarLinksFontSize: { type: Number },
    navbarLinksFontColor: { type: String, default: 'black'},
    navbarLinksBoxHover: { type: Boolean, default: false },
    navbarLinksChangeFontColorOnHover: { type: Boolean, default: false},
    navbarLinksFontColorOnHover: { type: String, default: 'black'},
    navbarLinksBoxHoverColor: { type: String, default: 'gray' },
    navbarLinksHorizontalPlacement: { type: String, default: 'left' },
    navbarLinksSnapMiddleVertically: { type: Boolean },
    navbarLinksVerticalTopPercent: { type: Number, default: 50 }
});

module.exports = mongoose.model('Settings', SettingsSchema);
