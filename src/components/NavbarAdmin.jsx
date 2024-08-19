import React, { useState, useEffect } from 'react';
import { fontList } from '../fonts/fontList';

const NavbarAdmin = ({ settings, onSettingsChange }) => {
    const [localSettings, setLocalSettings] = useState(settings);

    useEffect(() => {
        setLocalSettings(settings);
    }, [settings]);

    useEffect(() => {
        const updateServer = async () => {
            await onSettingsChange(localSettings);
        };

        // Debounce update to avoid too many requests
        const timer = setTimeout(updateServer, 500);
        return () => clearTimeout(timer);
    }, [localSettings, onSettingsChange]);

    const handleInputChange = (key) => (e) => {
        const value = e.target.value;
        setLocalSettings({
            ...localSettings,
            [key]: value
        });
    };

    const handleLinksChange = (index) => (e) => {
        const value = e.target.value;
        const updatedLinks = [...localSettings.navbarLinks];
        updatedLinks[index] = value;
        setLocalSettings({
            ...localSettings,
            navbarLinks: updatedLinks
        });
    };

    const addLinkInput = () => {
        setLocalSettings({
            ...localSettings,
            navbarLinks: [...localSettings.navbarLinks, '']
        });
    };

    const removeLinkInput = (index) => {
        const updatedLinks = localSettings.navbarLinks.filter((_, i) => i !== index);
        setLocalSettings({
            ...localSettings,
            navbarLinks: updatedLinks
        });
    };

    const handleRadioChange = (e) => {
        setLocalSettings({
            ...localSettings,
            navbarLinksHorizontalPlacement: e.target.value
        });
    };

    return (
        <div>
            <h2>Admin Portal</h2>
            <label>
                Navbar Height:
                <input
                    type="text"
                    value={localSettings.navbarHeight}
                    onChange={handleInputChange('navbarHeight')}
                />
            </label>
            <label>
                Navbar Font:
                <select
                    value={localSettings.navbarFont}
                    onChange={handleInputChange('navbarFont')}
                >
                    {fontList.map((font, index) => (
                        <option key={index} value={font}>
                            {font}
                        </option>
                    ))}
                </select>
            </label>
            <label>
                Navbar Background Color:
                <input
                    type="color"
                    value={localSettings.navbarBackgroundColor}
                    onChange={handleInputChange('navbarBackgroundColor')}
                />
            </label>
            <label>
                Navbar Links:
                {localSettings.navbarLinks.map((link, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            value={link}
                            onChange={handleLinksChange(index)}
                        />
                        <button type="button" onClick={() => removeLinkInput(index)}>Remove</button>
                    </div>
                ))}
                <button type="button" onClick={addLinkInput}>Add Link</button>
            </label>
            <label>
                Navbar Links Horizontal Placement:
                <div>
                    <label>
                        <input
                            type="radio"
                            value="left"
                            checked={localSettings.navbarLinksHorizontalPlacement === 'left'}
                            onChange={handleRadioChange}
                        />
                        Left
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="center"
                            checked={localSettings.navbarLinksHorizontalPlacement === 'center'}
                            onChange={handleRadioChange}
                        />
                        Center
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="right"
                            checked={localSettings.navbarLinksHorizontalPlacement === 'right'}
                            onChange={handleRadioChange}
                        />
                        Right
                    </label>
                </div>
            </label>
            <label>
                Navbar Links Block Width (px):
                <input
                    type="number"
                    value={localSettings.navbarLinksBlockWidth}
                    onChange={handleInputChange('navbarLinksBlockWidth')}
                />
            </label>
        </div>
    );
};

export default NavbarAdmin;
