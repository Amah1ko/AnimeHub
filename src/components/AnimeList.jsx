import AnimeCard from './AnimeCard';
import { motion } from 'framer-motion';
import { GlobalStyles } from './GlobalStyles';

const AnimeList = ({ animes }) => {
    if (!animes || animes.length === 0) {
        return <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>No anime found.</div>;
    }

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <>
            <GlobalStyles />
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="anime-grid"
            >
                {animes.map((anime, index) => (
                    <AnimeCard key={anime.mal_id} anime={anime} index={index} />
                ))}
                <style>{`
        .anime-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1.5rem;
          padding: 1rem 0;
        }
      `}</style>
            </motion.div>
        </>
    );
};

export default AnimeList;
