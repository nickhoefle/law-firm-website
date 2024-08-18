import React from 'react';

const Navbar = ({ settings }) => {
    return (
        <nav 
            style={{ 
                height: settings.navbarHeight, 
                backgroundColor: settings.navbarBackgroundColor, 
                fontFamily: settings.navbarFont 
            }}
        >
            <h1 style={{ margin: '0' }}>Law Firm</h1>
            <div
                style={{
                    display: 'flex',
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
        </nav>
    );
};

export default Navbar;
