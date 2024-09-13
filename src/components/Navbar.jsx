import React, { useState } from 'react';

const Navbar = ({ settings }) => {
    const [hoveredNavbarLinkIndex, setHoveredNavbarLinkIndex] = useState(null);
    const [hoverNavbarDropdownLinkIndex, setHoverNavbarDropdownLinkIndex] = useState(null);

    const handleMouseEnterNavbarLink = (index) => {
        if (settings.navbarLinksBoxHover) {
            setHoveredNavbarLinkIndex(index);
        }
    };

    const handleMouseEnterNavbarDropdownLink = (index) => {
        setHoverNavbarDropdownLinkIndex(index);
    };

    const handleMouseLeaveNavbarLink = () => {
        setHoveredNavbarLinkIndex(null);
    };

    const handleMouseLeaveNavbarDropdownLink = () => {
        setHoverNavbarDropdownLinkIndex(null);
    };

    const navbarLinkStyle = (index) => ({
        display: 'inline-block',
        height: '100%', 
        boxSizing: 'border-box',
        textDecoration: 'none',
        color: hoveredNavbarLinkIndex === index && settings.navbarLinksChangeFontColorOnHover ? 
            settings.navbarLinksFontColorOnHover : 
            settings.navbarLinksFontColor,
        lineHeight: settings.navbarHeight, 
        padding: `0 ${settings.navbarLinksSpaceAround}px 0 ${settings.navbarLinksSpaceAround}px`, 
        backgroundColor: hoveredNavbarLinkIndex === index ? settings.navbarLinksBoxHoverColor : 'transparent',
    });

    const navbarLinksDropdownStyle = (index) => ({
        display: 'block',
        textDecoration: 'none',
        width: 'auto',
        whiteSpace: 'nowrap',
        paddingRight: '100px',
        padding: `10px ${settings.navbarDropdownLinksIndent}px`,  
        color: settings.navbarLinksFontColor,
        backgroundColor: hoverNavbarDropdownLinkIndex === index ? settings.navbarLinksBoxHoverColor : 'transparent'
    })
    
    return (
        <div>
            <nav 
                style={{ 
                    height: settings.navbarHeight, 
                    backgroundColor: settings.navbarBackgroundColor, 
                    fontFamily: settings.navbarFont,
                    position: 'relative'
                }}
            >
                <div
                    style={{
                        height: '100%',
                        position: 'relative'
                        
                    }}
                >
                    <div 
                        style={{
                            position: 'absolute',
                            width: '100%',
                            display: 'flex',
                            top: settings.navbarLinksSnapMiddleVertically ? '50%' : settings.navbarLinksVerticalTopPercent +'%',
                            transform: settings.navbarLinksSnapMiddleVertically ? 'translateY(-50%)' : '',
                            justifyContent: settings.navbarLinksHorizontalPlacement,
                        }}
                    >
                        <ul 
                            className='navbar-links'
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                fontSize: `${settings.navbarLinksFontSize}px`,
                            }}
                        >
                            {settings.navbarLinks.map((link, index) => (
                                <li 
                                    key={index}
                                    onMouseEnter={() => handleMouseEnterNavbarLink(index)}
                                    onMouseLeave={handleMouseLeaveNavbarLink}
                                    style={{ position: 'relative' }}  
                                >
                                    <a 
                                        href={`/${link.name.toLowerCase().replace(' ', '-')}`}
                                        style={navbarLinkStyle(index)}
                                    >
                                        {link.name}
                                    </a>
                                    {link.isDropdownLink && hoveredNavbarLinkIndex === index && (
                                        <ul 
                                            style={{ 
                                                position: 'absolute',
                                                top: '100%', 
                                                left: 0,
                                                backgroundColor: settings.navbarBackgroundColor,
                                                listStyle: 'none',
                                                padding: 0,
                                                margin: 0
                                            }}
                                        >
                                            {link.dropdownLinks.map((dropdownLink, index) => (
                                                <li 
                                                    key={index}
                                                    onMouseEnter={() => handleMouseEnterNavbarDropdownLink(index)}
                                                    onMouseLeave={handleMouseLeaveNavbarDropdownLink}
                                                    style={{ position: 'relative' }}  
                                                >
                                                    <a 
                                                        href={`/${link.name.toLowerCase()}/${dropdownLink.toLowerCase().replace(' ', '-')}`}
                                                        style={navbarLinksDropdownStyle(index)}
                                                    >
                                                        {dropdownLink}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
