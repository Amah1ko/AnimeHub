import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useState } from 'react';

const AnimeCard = ({ anime, index = 0 }) => {
    const { mal_id, title, title_english, images, score, year, genres } = anime;
    const displayTitle = title_english || title;
    const imageUrl = images.jpg.large_image_url || images.jpg.image_url;
    const [isHovered, setIsHovered] = useState(false);

    const displayYear = year || (anime.aired?.from ? new Date(anime.aired.from).getFullYear() : 'Unknown');

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ y: -8, scale: 1.02 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            <Link to={`/anime/${mal_id}`} className="anime-card" style={styles.card}>
                <div style={styles.imageWrapper}>
                    <img src={imageUrl} alt={displayTitle} style={styles.image} loading="lazy" />
                    <div className="overlay" style={styles.overlay}>
                        <span style={styles.score}>
                            <Star size={12} fill="#fbbf24" stroke="none" style={{ marginRight: '4px' }} />
                            {score || 'N/A'}
                        </span>
                    </div>
                    <div style={{ ...styles.hoverOverlay, opacity: isHovered ? 1 : 0 }}>
                        <span className="btn btn-primary" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}>View Details</span>
                    </div>
                </div>
                <div style={styles.content}>
                    <h3 style={styles.title}>{displayTitle}</h3>
                    <p style={styles.meta}>
                        {displayYear} • {genres?.slice(0, 2).map(g => g.name).join(', ') || 'Anime'}
                    </p>
                </div>
            </Link>
        </motion.div>
    );
};

const styles = {
    card: {
        display: 'block',
        backgroundColor: 'var(--background-card)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        textDecoration: 'none',
        color: 'inherit',
        height: '100%',
        position: 'relative',
    },
    imageWrapper: {
        position: 'relative',
        paddingTop: '140%', // Aspect ratio
        overflow: 'hidden',
    },
    image: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    overlay: {
        position: 'absolute',
        top: '0.5rem',
        right: '0.5rem',
        backgroundColor: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(4px)',
        padding: '0.25rem 0.5rem',
        borderRadius: '8px',
        color: '#fbbf24', // Amber
        fontWeight: 'bold',
        fontSize: '0.875rem',
        display: 'flex',
        alignItems: 'center',
        zIndex: 10,
    },
    hoverOverlay: {
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.3s',
        zIndex: 5,
    },
    content: {
        padding: 'var(--spacing-md)',
    },
    title: {
        fontSize: '1rem',
        fontWeight: '600',
        marginBottom: '0.25rem',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        color: 'var(--text-main)',
    },
    meta: {
        fontSize: '0.875rem',
        color: 'var(--text-muted)',
    },
};

export default AnimeCard;
