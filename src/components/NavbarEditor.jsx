import React from 'react';
import NavbarAdmin from './NavbarAdmin';
import Navbar from './Navbar';

const NavbarEditor = ({ settings, onSettingsChange }) => {
    return (
        <div>
            <Navbar settings={settings} />
            <NavbarAdmin settings={settings} onSettingsChange={onSettingsChange} />
        </div>
    );
};

export default NavbarEditor;
