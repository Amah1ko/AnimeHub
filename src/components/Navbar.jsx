import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Home, Calendar, Trophy, List, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    // Close menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
                position: 'sticky',
                top: 0,
                zIndex: 100,
                backgroundColor: 'rgba(15, 23, 42, 0.8)',
                backdropFilter: 'blur(16px)',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                marginBottom: '2rem',
            }}
        >
            <div className="container" style={{ padding: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                    {/* Logo */}
                    <NavLink to="/" style={{ fontSize: '1.5rem', fontWeight: '800', background: 'linear-gradient(to right, #818cf8, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textDecoration: 'none', zIndex: 101 }}>
                        AnimeHub
                    </NavLink>

                    {/* Desktop Menu */}
                    <div className="desktop-menu" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <NavItem to="/" icon={<Home size={18} />} text="Home" />
                        <NavItem to="/top" icon={<Trophy size={18} />} text="Top 100" />
                        <NavItem to="/releases" icon={<Calendar size={18} />} text="Seasons" />
                        <NavItem to="/watchlist" icon={<List size={18} />} text="Watchlist" />
                        <NavLink to="/search" style={{ color: 'var(--text-main)', padding: '0.5rem', display: 'flex', alignItems: 'center' }}>
                            <Search size={20} />
                        </NavLink>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="mobile-toggle"
                        onClick={() => setIsOpen(!isOpen)}
                        style={{ background: 'none', color: 'var(--text-main)', zIndex: 101 }}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            overflow: 'hidden',
                            backgroundColor: 'rgba(15, 23, 42, 0.95)',
                            borderBottom: '1px solid rgba(255,255,255,0.05)'
                        }}
                    >
                        <div className="container" style={{ display: 'flex', flexDirection: 'column', padding: '1rem', gap: '0.5rem' }}>
                            <MobileNavItem to="/" icon={<Home size={18} />} text="Home" />
                            <MobileNavItem to="/top" icon={<Trophy size={18} />} text="Top 100" />
                            <MobileNavItem to="/releases" icon={<Calendar size={18} />} text="Seasons" />
                            <MobileNavItem to="/watchlist" icon={<List size={18} />} text="Watchlist" />
                            <MobileNavItem to="/search" icon={<Search size={18} />} text="Search" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* CSS for responsiveness */}
            <style>{`
                .mobile-toggle { display: none; }
                .desktop-menu { display: flex; }

                @media (max-width: 768px) {
                    .mobile-toggle { display: block; }
                    .desktop-menu { display: none !important; }
                }
            `}</style>
        </motion.nav>
    );
};

const NavItem = ({ to, icon, text }) => {
    return (
        <NavLink
            to={to}
            style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                textDecoration: 'none',
                color: isActive ? 'white' : 'var(--text-muted)',
                backgroundColor: isActive ? 'rgba(129, 140, 248, 0.2)' : 'transparent',
                fontWeight: isActive ? 600 : 500,
                transition: 'all 0.3s ease'
            })}
        >
            {icon}
            <span style={{ fontSize: '0.9rem' }}>{text}</span>
        </NavLink>
    );
};

const MobileNavItem = ({ to, icon, text }) => {
    return (
        <NavLink
            to={to}
            style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                borderRadius: '8px',
                textDecoration: 'none',
                color: isActive ? 'white' : 'var(--text-muted)',
                backgroundColor: isActive ? 'rgba(129, 140, 248, 0.1)' : 'transparent',
                fontWeight: isActive ? 600 : 500,
                border: isActive ? '1px solid rgba(129, 140, 248, 0.2)' : '1px solid transparent'
            })}
        >
            {icon}
            <span style={{ fontSize: '1rem' }}>{text}</span>
        </NavLink>
    );
};

export default Navbar;
