import React, { useState } from 'react';


const Navbar = ({ settings }) => {
    const [hoveredNavbarLinkIndex, setHoveredNavbarLinkIndex] = useState(null);

    const handleMouseEnterNavbarLink = (index) => {
        if (settings.navbarLinksBoxHover) {
            setHoveredNavbarLinkIndex(index);
        }
    };

    const handleMouseLeaveNavbarLink = () => {
        setHoveredNavbarLinkIndex(null);
    };

    const linkStyle = (index) => ({
        color: hoveredNavbarLinkIndex === index && settings.navbarLinksChangeFontColorOnHover ? 
            settings.navbarLinksFontColorOnHover : 
            settings.navbarLinksFontColor,
        display: 'inline-block',
        height: '100%', 
        lineHeight: settings.navbarHeight, 
        padding: `0 ${settings.navbarLinksSpaceAround}px 0 ${settings.navbarLinksSpaceAround}px`, 
        boxSizing: 'border-box',
        textDecoration: 'none',
        backgroundColor: hoveredNavbarLinkIndex === index ? settings.navbarLinksBoxHoverColor : 'transparent',
    });
    
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
                                        style={linkStyle(index)}
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
                                            {link.dropdownLinks.map((dropdownLink, i) => (
                                                <li key={i}>
                                                    <a 
                                                        href={`/${link.name.toLowerCase()}/${dropdownLink.toLowerCase().replace(' ', '-')}`}
                                                        style={{
                                                            padding: `10px ${settings.navbarDropdownLinksIndent}px`,  
                                                            display: 'block',
                                                            color: settings.navbarLinksFontColor,
                                                            textDecoration: 'none',
                                                            width: '300px'
                                                        }}
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
