import { useState, useEffect } from 'react';
import { getTopAnime, getSeasonalAnime, getAnimeDetails } from '../services/jikanApi';
import AnimeList from '../components/AnimeList';
import LoadingState from '../components/LoadingState';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, TrendingUp, Calendar } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const Home = () => {
    const [topAnime, setTopAnime] = useState([]);
    const [seasonalAnime, setSeasonalAnime] = useState([]);
    const [heroAnime, setHeroAnime] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch "Your Name" (Kimi no Na wa) for Hero section - ID: 32281
                // It has consistently high quality visuals compared to dynamic top list
                const [heroData, topData, seasonData] = await Promise.all([
                    getAnimeDetails(32281),
                    getTopAnime(1),
                    getSeasonalAnime(1)
                ]);
                setHeroAnime(heroData.data);
                setTopAnime(topData.data.slice(0, 10)); // Show top 10
                setSeasonalAnime(seasonData.data.slice(0, 5)); // Show top 5 seasonal
            } catch (error) {
                console.error("Failed to load home data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <LoadingState />;

    return (
        <PageTransition>
            <div style={{ paddingBottom: '4rem' }}>
                {/* Hero Section */}
                {heroAnime && (
                    <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        style={{
                            position: 'relative',
                            height: '60vh',
                            minHeight: '500px',
                            marginBottom: '4rem',
                            overflow: 'hidden',
                            borderRadius: '0 0 2rem 2rem',
                            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                        }}
                    >
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            // Jikan API only provides portrait posters which look blurry in landscape.
                            // Using a high-quality wallpaper for the hero section to maximize visual impact.
                            backgroundImage: `url('https://images6.alphacoders.com/740/thumb-1920-740296.png')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            // Remove blur to show off the high quality, add distinct overlay instead
                            filter: 'brightness(0.6)',
                            transform: 'scale(1.05)' // Subtle zoom for parallax feel
                        }}></div>

                        <div className="container" style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center', zIndex: 10 }}>
                            <div style={{ maxWidth: '600px' }}>
                                <motion.span
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    style={{ color: 'var(--primary-color)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem' }}
                                >
                                    #1 Trending Anime
                                </motion.span>
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: '800', margin: '0.5rem 0', lineHeight: 1.1 }}
                                >
                                    {heroAnime.title_english || heroAnime.title}
                                </motion.h1>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                    style={{ fontSize: '1.1rem', color: '#f1f5f9', textShadow: '0 1px 2px rgba(0,0,0,0.5)', marginBottom: '2rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                                >
                                    {heroAnime.synopsis}
                                </motion.p>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8 }}
                                    style={{ display: 'flex', gap: '1rem' }}
                                >
                                    <Link to={`/anime/${heroAnime.mal_id}`} className="btn btn-primary">
                                        <Play size={20} fill="currentColor" /> View Details
                                    </Link>
                                </motion.div>
                            </div>
                        </div>
                    </motion.section>
                )}

                <div className="container">
                    <section style={{ marginBottom: '4rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><TrendingUp color="var(--primary-color)" /> Trending Now</h2>
                            <Link to="/top" className="btn" style={{ fontSize: '0.9rem', color: 'var(--primary-color)' }}>View All &rarr;</Link>
                        </div>
                        <AnimeList animes={topAnime} />
                    </section>

                    <section>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Calendar color="var(--secondary-color)" /> New Releases</h2>
                            <Link to="/releases" className="btn" style={{ fontSize: '0.9rem', color: 'var(--primary-color)' }}>View All &rarr;</Link>
                        </div>
                        <AnimeList animes={seasonalAnime} />
                    </section>
                </div>
            </div>
        </PageTransition>
    );
};

export default Home;
