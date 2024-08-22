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
        navbarBackgroundColor: '#0000FF',
        navbarLinks: ['Home', 'About', 'Contact'],
        navbarLinksHorizontalPlacement: 'center',
        navbarLinksBlockWidth: '150px',
        navbarLinksSnapMiddleHorizontally: false,
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
