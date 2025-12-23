import { useState, useEffect } from 'react';
import { getWatchlist, updateWatchlistStatus, removeFromWatchlist } from '../services/watchlistApi';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import PageTransition from '../components/PageTransition';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, CheckCircle, Clock, Heart, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const Watchlist = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('All');

    const fetchWatchlist = async () => {
        setLoading(true);
        try {
            const data = await getWatchlist();
            setItems(data);
        } catch (err) {
            console.error(err);
            toast.error('Failed to load watchlist. Check connection.');
            setError('Failed to load watchlist.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWatchlist();
    }, []);

    const handleStatusChange = async (item, newStatus) => {
        // Optimistic update
        const oldItems = [...items];
        const updatedItems = items.map(i => i.id === item.id ? { ...i, status: newStatus } : i);
        setItems(updatedItems);
        toast.info(`Status updated to ${newStatus}`);

        try {
            await updateWatchlistStatus(item.id, newStatus);
        } catch (err) {
            setItems(oldItems); // Revert
            toast.error('Failed to update status');
        }
    };

    const handleDelete = async (id) => {
        // We can use a custom toast for confirmation or just standard confirm for now, 
        // to keep it fast let's stick to window.confirm but maybe style it later?
        // Actually, let's use a "undo" toast pattern if possible, but sticking to simple connect first.
        if (!window.confirm('Remove from watchlist?')) return;

        try {
            await removeFromWatchlist(id);
            setItems(items.filter(i => i.id !== id));
            toast.success('Removed from watchlist');
        } catch (err) {
            toast.error('Failed to remove item');
        }
    };

    const filteredItems = activeTab === 'All' ? items : items.filter(i => i.status === activeTab);

    const tabs = ['All', 'Planned', 'Watching', 'Completed', 'Dropped'];

    if (loading) return <LoadingState />;
    if (error) return <ErrorState message={error} />;

    return (
        <PageTransition>
            <div className="container" style={{ paddingBottom: '4rem' }}>
                <h1 style={{ marginTop: '2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Heart fill="var(--secondary-color)" color="var(--secondary-color)" /> My Watchlist
                </h1>

                {/* Tabs */}
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{
                                padding: '0.5rem 1rem',
                                borderRadius: '2rem',
                                backgroundColor: activeTab === tab ? 'var(--primary-color)' : 'var(--background-card)',
                                color: activeTab === tab ? 'white' : 'var(--text-muted)',
                                border: activeTab === tab ? 'none' : '1px solid var(--border-color)',
                                fontWeight: 600,
                                transition: 'all 0.3s'
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {filteredItems.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                        <p>No anime in this list.</p>
                        <Link to="/search" className="btn btn-primary" style={{ marginTop: '1rem' }}>Find Anime</Link>
                    </div>
                ) : (
                    <motion.div layout className="watchlist-grid">
                        <AnimatePresence>
                            {filteredItems.map(item => (
                                <motion.div
                                    layout
                                    key={item.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                    style={{
                                        backgroundColor: 'var(--background-card)',
                                        borderRadius: 'var(--radius-md)',
                                        overflow: 'hidden',
                                        display: 'flex',
                                        gap: '1rem',
                                        padding: '1rem',
                                        border: '1px solid var(--border-color)'
                                    }}
                                >
                                    <Link to={`/anime/${item.mal_id}`} style={{ flexShrink: 0, width: '80px', height: '120px' }}>
                                        <img src={item.image_url} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} />
                                    </Link>

                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                        <div>
                                            <h3 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>{item.title}</h3>
                                            <span style={{
                                                fontSize: '0.75rem',
                                                padding: '0.1rem 0.5rem',
                                                borderRadius: '4px',
                                                backgroundColor: getStatusColor(item.status),
                                                color: 'white',
                                                fontWeight: 'bold'
                                            }}>
                                                {item.status}
                                            </span>
                                        </div>

                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
                                            <select
                                                value={item.status}
                                                onChange={(e) => handleStatusChange(item, e.target.value)}
                                                style={{
                                                    backgroundColor: 'var(--background-dark)',
                                                    color: 'var(--text-main)',
                                                    border: '1px solid var(--border-color)',
                                                    padding: '0.25rem',
                                                    borderRadius: '4px',
                                                    fontSize: '0.875rem'
                                                }}
                                            >
                                                <option value="Planned">Planned</option>
                                                <option value="Watching">Watching</option>
                                                <option value="Completed">Completed</option>
                                                <option value="Dropped">Dropped</option>
                                            </select>

                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                style={{ marginLeft: 'auto', color: 'var(--text-muted)', padding: '0.25rem' }}
                                                title="Remove"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}

                <style>{`
        .watchlist-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 1rem;
        }
      `}</style>
            </div>
        </PageTransition>
    );
};

const getStatusColor = (status) => {
    switch (status) {
        case 'Watching': return 'var(--primary-color)';
        case 'Completed': return 'var(--success-color)';
        case 'Dropped': return 'var(--danger-color)';
        default: return 'var(--text-muted)';
    }
};

export default Watchlist;
