import React from 'react';


const Navbar = ({ settings }) => {
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
                            }}
                        >
                            {settings.navbarLinks.map((link, index) => (
                                <li key={index}>
                                    <a href={`/${link.toLowerCase().replace(' ', '-')}`}>{link}</a>
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
