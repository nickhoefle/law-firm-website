import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Navbar = () => {
    const [settings, setSettings] = useState(null);

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

    if (!settings) return <div>Loading...</div>;

    return (
        <nav style={{ height: settings.navbarHeight, backgroundColor: settings.navbarBackgroundColor, fontFamily: settings.navbarFont }}>
            <h1>Law Firm</h1>
        </nav>
    );
};

export default Navbar;
