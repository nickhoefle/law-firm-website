import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import NavbarEditor from './components/NavbarEditor';
import axios from 'axios';

// Custom hook for managing settings
const useSettings = () => {
    const [settings, setSettings] = useState({
        navbarHeight: '60px',
        navbarFont: 'Arial, sans-serif',
        navbarBackgroundColorGradient: false,
        navbarBackgroundColorGradientStart: 'red',
        navbarBackgroundColorGradientEnd: 'orange',
        navbarBackgroundColor: '#0000FF',
        navbarRoundedBorder: false,
        navbarTopLeftBorderRadius: 0,
        navbarTopRightBorderRadius: 0,
        navbarBottomLeftBorderRadius: 0,
        navbarBottomRightBorderRadius: 0,
        navbarLinks: [],
        navbarDropdownLinksIndent: 10,
        navbarDropdownLinksVerticalPadding: 10,
        navbarLinksSpaceAround: 20,
        navbarLinksFontSize: 14,
        navbarLinksFontColor: 'black',
        navbarLinksBoxHover: false,
        navbarLinksChangeFontColorOnHover: false,
        navbarLinksFontColorOnHover: 'black',
        navbarLinksBoxHoverColor: 'gray',
        navbarLinksHorizontalPlacement: 'center',
        navbarLinksSnapMiddleVertically: false,
        navbarLinksVerticalTopPercent: 55,
    });

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/settings');
                setSettings(response.data);
            } catch (error) {
                console.error('Error fetching settings:', error);
            }
        };
        fetchSettings();
    }, []);

    const saveSettings = async (updatedSettings) => {
        try {
            await axios.put('http://localhost:5000/api/settings', updatedSettings);
            setSettings(updatedSettings);
        } catch (error) {
            console.error('Error updating settings:', error);
        }
    };

    return { settings, saveSettings };
};

function App() {
    const { settings, saveSettings } = useSettings();

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navbar settings={settings} />} />
                <Route path="/admin" element={<NavbarEditor settings={settings} onSettingsChange={saveSettings} />} />
            </Routes>
        </Router>
    );
}

export default App;
