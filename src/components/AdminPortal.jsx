import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPortal = () => {
    const [settings, setSettings] = useState(null);
    const [navbarHeight, setNavbarHeight] = useState('');
    const [navbarFont, setNavbarFont] = useState('');
    const [navbarBackgroundColor, setNavbarBackgroundColor] = useState('');

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/settings');
                setSettings(response.data);
                setNavbarHeight(response.data.navbarHeight);
                setNavbarFont(response.data.navbarFont);
                setNavbarBackgroundColor(response.data.navbarBackgroundColor);
            } catch (error) {
                console.error('Error fetching settings:', error);
            }
        };
        fetchSettings();
    }, []);

    const handleUpdate = async () => {
        try {
            await axios.put('http://localhost:5000/api/settings', {
                navbarHeight,
                navbarFont,
                navbarBackgroundColor
            });
        } catch (error) {
            console.error('Error updating settings:', error);
        }
    };

    if (!settings) return <div>Loading...</div>;

    return (
        <div>
            <h2>Admin Portal</h2>
            <label>
                Navbar Height:
                <input value={navbarHeight} onChange={(e) => setNavbarHeight(e.target.value)} />
            </label>
            <label>
                Navbar Font:
                <input value={navbarFont} onChange={(e) => setNavbarFont(e.target.value)} />
            </label>
            <label>
                Navbar Background Color:
                <input value={navbarBackgroundColor} onChange={(e) => setNavbarBackgroundColor(e.target.value)} />
            </label>
            <button onClick={handleUpdate}>Update Settings</button>
        </div>
    );
};

export default AdminPortal;
