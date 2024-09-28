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

    const navbarLinkStyle = (index, isLastNavbarLink) => ({
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
        borderTopLeftRadius: hoveredNavbarLinkIndex === 0 && 
                            settings.navbarLinksHorizontalPlacement === 'left' && 
                            settings.navbarRoundedBorder ?
                            `${settings.navbarTopLeftBorderRadius}px` : 0,
        borderTopRightRadius: isLastNavbarLink && 
                            settings.navbarLinksHorizontalPlacement === 'right' && 
                            settings.navbarRoundedBorder ?
                            `${settings.navbarTopRightBorderRadius}px` : 0,
        borderBottomLeftRadius: hoveredNavbarLinkIndex === 0 && 
                            settings.navbarLinksHorizontalPlacement === 'left' && 
                            settings.navbarRoundedBorder ?
                            `${settings.navbarBottomLeftBorderRadius}px` : 0,
        borderBottomRightRadius: isLastNavbarLink && 
                            settings.navbarLinksHorizontalPlacement === 'right' && 
                            settings.navbarRoundedBorder ?
                            `${settings.navbarBottomRightBorderRadius}px` : 0,
    });

    const navbarLinksDropdownStyle = (index) => ({
        display: 'block',
        textDecoration: 'none',
        width: 'auto',
        whiteSpace: 'nowrap',
        paddingRight: '100px',
        paddingTop: `${settings.navbarDropdownLinksVerticalPadding}px`,
        paddingBottom: `${settings.navbarDropdownLinksVerticalPadding}px`, 
        paddingLeft: `${settings.navbarDropdownLinksIndent}px`,  
        color: settings.navbarLinksFontColor,
        backgroundColor: hoverNavbarDropdownLinkIndex === index ? settings.navbarLinksBoxHoverColor : 'transparent'
    })
    
    return (
        <div>
            <nav 
                style={{ 
                    height: settings.navbarHeight, 
                    backgroundColor: !settings.navbarBackgroundColorGradient ? settings.navbarBackgroundColor : 'none', 
                    backgroundImage: settings.navbarBackgroundColorGradient 
                        ? `linear-gradient(
                            ${settings.navbarBackgroundColorGradientDirection === 'horizontal' ? 'to right' : 'to bottom'}, 
                            ${settings.navbarBackgroundColorGradientStart}, 
                            ${settings.navbarBackgroundColorGradientEnd}
                        )`
                        : 'none',
                    fontFamily: settings.navbarFont,
                    position: 'relative',
                    borderTopLeftRadius: settings.navbarRoundedBorder ? `${settings.navbarTopLeftBorderRadius}px` : 0,
                    borderTopRightRadius: settings.navbarRoundedBorder ? `${settings.navbarTopRightBorderRadius}px` : 0,
                    borderBottomLeftRadius: settings.navbarRoundedBorder ? `${settings.navbarBottomLeftBorderRadius}px` : 0,
                    borderBottomRightRadius: settings.navbarRoundedBorder ? `${settings.navbarBottomRightBorderRadius}px` : 0
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
                            {settings.navbarLinks.map((link, index) => {
                                const isLastNavbarLink = index === settings.navbarLinks.length - 1;

                                return (
                                    <li 
                                        key={index}
                                        onMouseEnter={() => handleMouseEnterNavbarLink(index)} 
                                        onMouseLeave={handleMouseLeaveNavbarLink}
                                        style={{ position: 'relative' }}  
                                    >
                                        <a 
                                            href={`/${link.name.toLowerCase().replace(' ', '-')}`}
                                            style={navbarLinkStyle(index, isLastNavbarLink)}
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
                                                {link.dropdownLinks.map((dropdownLink, dropdownIndex) => (
                                                    <li 
                                                        key={dropdownIndex}
                                                        onMouseEnter={() => handleMouseEnterNavbarDropdownLink(dropdownIndex)}
                                                        onMouseLeave={handleMouseLeaveNavbarDropdownLink}
                                                        style={{ position: 'relative' }}  
                                                    >
                                                        <a 
                                                            href={`/${link.name.toLowerCase()}/${dropdownLink.toLowerCase().replace(' ', '-')}`}
                                                            style={navbarLinksDropdownStyle(dropdownIndex)}
                                                        >
                                                            {dropdownLink}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
