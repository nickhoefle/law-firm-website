import React, { useState } from 'react';


const Navbar = ({ settings }) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const handleMouseEnter = (index) => {
        if (settings.navbarLinksBoxHover) {
            setHoveredIndex(index);
        }
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    const linkStyle = (index) => ({
        color: 'rgb(170, 228, 12)',
        display: 'inline-block',
        height: '100%', 
        lineHeight: settings.navbarHeight, 
        padding: '0 35px', 
        boxSizing: 'border-box',
        textDecoration: 'none',
        backgroundColor: hoveredIndex === index ? 'blue' : 'transparent',
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
                                width: settings.navbarLinksBlockWidth ? `${settings.navbarLinksBlockWidth}px` : 'auto',
                                fontSize: `${settings.navbarLinksFontSize}px`,
                            }}
                        >
                            {settings.navbarLinks.map((link, index) => (
                                <li key={index}>
                                    <a 
                                        href={`/${link.toLowerCase().replace(' ', '-')}`}
                                        style={linkStyle(index)}
                                        onMouseEnter={() => handleMouseEnter(index)}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        {link}
                                    </a>
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
