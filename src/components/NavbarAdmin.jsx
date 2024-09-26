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
        const timer = setTimeout(updateServer, 250);
        return () => clearTimeout(timer);
    }, [localSettings, onSettingsChange]);

    const handleInputChange = (key) => (e) => {
        const value = e.target.value;
        setLocalSettings({
            ...localSettings,
            [key]: value
        });
    };

    const handleLinkNameChange = (index) => (e) => {
        const updatedLinks = [...localSettings.navbarLinks];
        updatedLinks[index].name = e.target.value;
        setLocalSettings({
            ...localSettings,
            navbarLinks: updatedLinks
        });
    };

    const handleDropdownToggle = (index) => () => {
        const updatedLinks = [...localSettings.navbarLinks];
        updatedLinks[index].isDropdownLink = !updatedLinks[index].isDropdownLink;
        if (!updatedLinks[index].isDropdownLink) {
            updatedLinks[index].dropdownLinks = [];
        }
        setLocalSettings({
            ...localSettings,
            navbarLinks: updatedLinks
        });
    };

    const handleDropdownLinkChange = (linkIndex, dropdownIndex) => (e) => {
        const updatedLinks = [...localSettings.navbarLinks];
        updatedLinks[linkIndex].dropdownLinks[dropdownIndex] = e.target.value;
        setLocalSettings({
            ...localSettings,
            navbarLinks: updatedLinks
        });
    };

    const addDropdownLink = (index) => () => {
        const updatedLinks = [...localSettings.navbarLinks];
        updatedLinks[index].dropdownLinks.push('');
        setLocalSettings({
            ...localSettings,
            navbarLinks: updatedLinks
        });
    };

    const removeDropdownLink = (linkIndex, dropdownIndex) => () => {
        const updatedLinks = [...localSettings.navbarLinks];
        updatedLinks[linkIndex].dropdownLinks = updatedLinks[linkIndex].dropdownLinks.filter((_, i) => i !== dropdownIndex);
        setLocalSettings({
            ...localSettings,
            navbarLinks: updatedLinks
        });
    };

    const addLinkInput = () => {
        setLocalSettings({
            ...localSettings,
            navbarLinks: [
                ...localSettings.navbarLinks,
                { name: '', isDropdownLink: false, dropdownLinks: [] }
            ]
        });
    };

    const removeLinkInput = (index) => () => {
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

    const handleCheckboxChange = (key) => (e) => {
        const value = e.target.checked;
        setLocalSettings({
            ...localSettings,
            [key]: value
        });
    };

    const increaseVerticalTopPercent = () => {
        if (localSettings.navbarLinksVerticalTopPercent < 100) {
            setLocalSettings({
                ...localSettings,
                navbarLinksVerticalTopPercent: localSettings.navbarLinksVerticalTopPercent + 1
            });
        }
    };

    const decreaseVerticalTopPercent = () => {
        if (localSettings.navbarLinksVerticalTopPercent > 0) {
            setLocalSettings({
                ...localSettings,
                navbarLinksVerticalTopPercent: localSettings.navbarLinksVerticalTopPercent - 1
            });
        }
    };

    const moveLinkUp = (index) => {
        if (index === 0) return; // Can't move the first link up
        const updatedLinks = [...localSettings.navbarLinks];
        [updatedLinks[index - 1], updatedLinks[index]] = [updatedLinks[index], updatedLinks[index - 1]];
        setLocalSettings({
            ...localSettings,
            navbarLinks: updatedLinks
        });
    };
    
    const moveLinkDown = (index) => {
        if (index === localSettings.navbarLinks.length - 1) return; // Can't move the last link down
        const updatedLinks = [...localSettings.navbarLinks];
        [updatedLinks[index + 1], updatedLinks[index]] = [updatedLinks[index], updatedLinks[index + 1]];
        setLocalSettings({
            ...localSettings,
            navbarLinks: updatedLinks
        });
    };

    const moveDropdownLinkUp = (linkIndex, dropdownIndex) => () => {
        if (dropdownIndex === 0) return; // Prevent moving the first one up
        const updatedLinks = [...localSettings.navbarLinks];
        const dropdownLinks = updatedLinks[linkIndex].dropdownLinks;
        const temp = dropdownLinks[dropdownIndex - 1];
        dropdownLinks[dropdownIndex - 1] = dropdownLinks[dropdownIndex];
        dropdownLinks[dropdownIndex] = temp;
        setLocalSettings({
            ...localSettings,
            navbarLinks: updatedLinks,
        });
    };
    
    const moveDropdownLinkDown = (linkIndex, dropdownIndex) => () => {
        const updatedLinks = [...localSettings.navbarLinks];
        const dropdownLinks = updatedLinks[linkIndex].dropdownLinks;
        if (dropdownIndex === dropdownLinks.length - 1) return; // Prevent moving the last one down
        const temp = dropdownLinks[dropdownIndex + 1];
        dropdownLinks[dropdownIndex + 1] = dropdownLinks[dropdownIndex];
        dropdownLinks[dropdownIndex] = temp;
        setLocalSettings({
            ...localSettings,
            navbarLinks: updatedLinks,
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
            <br />
            <label>
                Rounded Navbar?:
                <input
                    type="checkbox"
                    checked={localSettings.navbarRoundedBorder}
                    onChange={handleCheckboxChange('navbarRoundedBorder')}
                />
            </label>
            <br />
            { localSettings.navbarRoundedBorder && (
                <div>
                    <label>Top Left Rounding</label>
                    <input
                        type="number"
                        value={localSettings.navbarTopLeftBorderRadius}
                        onChange={handleInputChange('navbarTopLeftBorderRadius')}
                    />
                    <label>Top Right Rounding</label>
                    <input
                        type="number"
                        value={localSettings.navbarTopRightBorderRadius}
                        onChange={handleInputChange('navbarTopRightBorderRadius')}
                    />
                    <label>Bottom Left Rounding</label>
                    <input
                        type="number"
                        value={localSettings.navbarBottomLeftBorderRadius}
                        onChange={handleInputChange('navbarBottomLeftBorderRadius')}
                    />
                    <label>Bottom Right Rounding</label>
                    <input
                        type="number"
                        value={localSettings.navbarBottomRightBorderRadius}
                        onChange={handleInputChange('navbarBottomRightBorderRadius')}
                    />
                </div>
            )}
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
            <br />
            <label>Navbar Links Font Size</label>
            <input
                type="number"
                value={localSettings.navbarLinksFontSize}
                onChange={handleInputChange('navbarLinksFontSize')}
            />
            <br />
            <label>
                Space Around Navbar Links
                <input
                    type="number"
                    value={localSettings.navbarLinksSpaceAround}
                    onChange={handleInputChange('navbarLinksSpaceAround')}
                />
            </label>
            <br />
            <label>
                    Navbar Links Font Color:
                    <input
                        type="color"
                        value={localSettings.navbarLinksFontColor}
                        onChange={handleInputChange('navbarLinksFontColor')}
                    />
                </label>
            <br />
            <label>
                Change Navbar Links Font Color on Hover?:
                <input
                    type="checkbox"
                    checked={localSettings.navbarLinksChangeFontColorOnHover}
                    onChange={handleCheckboxChange('navbarLinksChangeFontColorOnHover')}
                />
            </label>
            <br />
            { localSettings.navbarLinksChangeFontColorOnHover && (
                <label>
                    Navbar Links Font Color on Hover:
                    <input
                        type="color"
                        value={localSettings.navbarLinksFontColorOnHover}
                        onChange={handleInputChange('navbarLinksFontColorOnHover')}
                    />
                </label>
            )}
            <br />
            <label>
                Enable Box on Navbar Link Hover
                <input
                    type="checkbox"
                    checked={localSettings.navbarLinksBoxHover}
                    onChange={handleCheckboxChange('navbarLinksBoxHover')}
                />
            </label>
            <br />
            <label>
                Navbar Background Color:
                <input
                    type="color"
                    value={localSettings.navbarBackgroundColor}
                    onChange={handleInputChange('navbarBackgroundColor')}
                />
            </label>
            <br />
            <label>
                Enable Box on Navbar Link Hover
                <input
                    type="checkbox"
                    checked={localSettings.navbarLinksBoxHover}
                    onChange={handleCheckboxChange('navbarLinksBoxHover')}
                />
            </label>
            <br />
            <label>
                Navbar Link Box Color:
                <input
                    type="color"
                    value={localSettings.navbarLinksBoxHoverColor}
                    onChange={handleInputChange('navbarLinksBoxHoverColor')}
                />
            </label>
            <br />
            <label>
                Navbar Links:
                {localSettings.navbarLinks.map((link, index) => (
                    <div key={index} style={{ marginBottom: '10px' }}>
                        <input
                            type="text"
                            value={link.name}
                            placeholder="Link Name"
                            onChange={handleLinkNameChange(index)}
                        />
                        <button type="button" onClick={removeLinkInput(index)}>Remove</button>
                        <br />
                        <label>
                            <input
                                type="checkbox"
                                checked={link.isDropdownLink}
                                onChange={handleDropdownToggle(index)}
                            />
                            Is Dropdown
                        </label>
                        {link.isDropdownLink && (
                            <div style={{ marginLeft: '20px' }}>
                                {link.dropdownLinks.map((dropdownLink, dropdownIndex) => (
                                    <div key={dropdownIndex}>
                                        <input
                                            type="text"
                                            value={dropdownLink}
                                            placeholder="Dropdown Link"
                                            onChange={handleDropdownLinkChange(index, dropdownIndex)}
                                        />
                                        <button type="button" onClick={removeDropdownLink(index, dropdownIndex)}>
                                            Remove
                                        </button>
                                        
                                        {/* Move Up Button */}
                                        {dropdownIndex > 0 && (
                                            <button type="button" onClick={moveDropdownLinkUp(index, dropdownIndex)}>
                                                Move Up
                                            </button>
                                        )}
                                        
                                        {/* Move Down Button */}
                                        {dropdownIndex < link.dropdownLinks.length - 1 && (
                                            <button type="button" onClick={moveDropdownLinkDown(index, dropdownIndex)}>
                                                Move Down
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button type="button" onClick={addDropdownLink(index)}>Add Dropdown Link</button>
                            </div>
                        )}
                        <br />
                        <button type="button" onClick={() => moveLinkUp(index)}>Move Up</button>
                        <button type="button" onClick={() => moveLinkDown(index)}>Move Down</button>
                    </div>
                ))}
                <button type="button" onClick={addLinkInput}>Add Link</button>
            </label>
            <br />
            <label>
                Dropdown Links Indent
                <input
                    type="number"
                    value={localSettings.navbarDropdownLinksIndent}
                    onChange={handleInputChange('navbarDropdownLinksIndent')}
                />
            </label>
            <label>
                Dropdown Links Vertical Padding
                <input
                    type="number"
                    value={localSettings.navbarDropdownLinksVerticalPadding}
                    onChange={handleInputChange('navbarDropdownLinksVerticalPadding')}
                />
            </label>
            <br />
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
            <br />
            <label>
                Snap Navbar Links to Middle Vertically:
                <input
                    type="checkbox"
                    checked={localSettings.navbarLinksSnapMiddleVertically}
                    onChange={handleCheckboxChange('navbarLinksSnapMiddleVertically')}
                />
            </label>
            <br />
            { !localSettings.navbarLinksSnapMiddleVertically && (
                <>
                    <label>Adjust Navbar Vertical Placement</label>
                    <button
                        onClick={increaseVerticalTopPercent}
                    >
                        +
                    </button>
                    <button
                        onClick={decreaseVerticalTopPercent}
                    >
                        -
                    </button>
                </>
            ) }
        </div>
    );
};

export default NavbarAdmin;
