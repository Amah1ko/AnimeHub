import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAnimeDetails } from '../services/jikanApi';
import { getReviews, createReview, updateReview, deleteReview } from '../services/reviewsApi';
import { addToWatchlist, getWatchlist } from '../services/watchlistApi';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';
import PageTransition from '../components/PageTransition';
import { Plus, Check } from 'lucide-react';
import { toast } from 'sonner';

const AnimeDetails = () => {
    const { id } = useParams();
    const [anime, setAnime] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [inWatchlist, setInWatchlist] = useState(false);

    const [editingReview, setEditingReview] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const details = await getAnimeDetails(id);
            setAnime(details.data);

            const [reviewsData, watchlistData] = await Promise.allSettled([
                getReviews(id),
                getWatchlist()
            ]);

            if (reviewsData.status === 'fulfilled') setReviews(reviewsData.value);

            // Check if already in watchlist
            if (watchlistData.status === 'fulfilled') {
                const found = watchlistData.value.find(item => item.mal_id === details.data.mal_id);
                if (found) setInWatchlist(true);
            }

        } catch (err) {
            setError('Failed to load anime details.');
        } finally {
            setLoading(false);
        }
    };

    const fetchReviewsOnly = async () => {
        try {
            const reviewsData = await getReviews(id);
            setReviews(reviewsData);
        } catch (e) {
            console.error("Failed to refresh reviews");
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    const handleCreateReview = async (data) => {
        try {
            await createReview({ ...data, animeId: id, createdAt: new Date().toISOString() });
            await fetchReviewsOnly();
            toast.success('Review posted successfully!');
        } catch (err) {
            toast.error('Failed to post review.');
        }
    };

    const handleUpdateReview = async (data) => {
        if (!editingReview) return;
        try {
            await updateReview(editingReview.id, { ...data, updatedAt: new Date().toISOString() });
            await fetchReviewsOnly();
            setEditingReview(null);
            toast.success('Review updated!');
        } catch (err) {
            toast.error('Failed to update review.');
        }
    };

    const handleDeleteReview = async (reviewId) => {
        if (!window.confirm("Are you sure you want to delete this review?")) return;
        try {
            await deleteReview(reviewId);
            await fetchReviewsOnly();
            toast.success('Review deleted.');
        } catch (err) {
            toast.error('Failed to delete review.');
        }
    };

    const handleAddToWatchlist = async () => {
        try {
            await addToWatchlist(anime);
            setInWatchlist(true);
            toast.success('Added to watchlist!');
        } catch (err) {
            if (err.message === 'Anime already in watchlist') {
                toast.warning('Already in your watchlist.');
                setInWatchlist(true);
            } else {
                toast.error('Failed to add to watchlist. Ensure "watchlist" resource exists in MockAPI.');
            }
        }
    };

    if (loading) return <LoadingState />;
    if (error) return <ErrorState message={error} onRetry={fetchData} />;
    if (!anime) return <ErrorState message="Anime not found." />;

    return (
        <PageTransition>
            <div className="container" style={{ paddingBottom: '4rem' }}>
                {/* Anime Stats / Header */}
                <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem', flexWrap: 'wrap' }}>
                    <div style={{ flex: '0 0 300px', maxWidth: '100%' }}>
                        <img
                            src={anime.images.jpg.large_image_url || anime.images.jpg.image_url}
                            alt={anime.title_english || anime.title}
                            style={{ width: '100%', borderRadius: 'var(--radius-md)', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                        />

                        <button
                            className={`btn ${inWatchlist ? '' : 'btn-primary'}`}
                            style={{ width: '100%', marginTop: '1rem', backgroundColor: inWatchlist ? 'var(--background-card)' : undefined, color: inWatchlist ? 'var(--success-color)' : undefined }}
                            onClick={inWatchlist ? null : handleAddToWatchlist}
                            disabled={inWatchlist}
                        >
                            {inWatchlist ? <><Check size={20} /> Added to Watchlist</> : <><Plus size={20} /> Add to Watchlist</>}
                        </button>
                    </div>

                    <div style={{ flex: 1 }}>
                        <h1 style={{ marginBottom: '0.5rem' }}>{anime.title_english || anime.title}</h1>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
                            {anime.year || (anime.aired?.from ? new Date(anime.aired.from).getFullYear() : 'Unknown')} • {anime.type} • {anime.score ? `Score: ${anime.score}` : 'N/A'}
                        </p>

                        <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {anime.genres.map(g => (
                                <span key={g.mal_id} style={{
                                    backgroundColor: 'var(--primary-color)',
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '999px',
                                    fontSize: '0.875rem',
                                    color: 'white'
                                }}>
                                    {g.name}
                                </span>
                            ))}
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <h3>Description</h3>
                            <p style={{ lineHeight: '1.8', color: '#e2e8f0' }}>{anime.synopsis || 'No synopsis available.'}</p>
                        </div>

                        {anime.trailer?.embed_url && (
                            <div style={{ marginBottom: '2rem' }}>
                                <h3>Trailer</h3>
                                <iframe
                                    src={anime.trailer.embed_url}
                                    title="Trailer"
                                    style={{ width: '100%', maxWidth: '100%', height: '315px', border: 'none', borderRadius: 'var(--radius-md)' }}
                                    allowFullScreen
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Reviews Section */}
                <hr style={{ borderColor: 'var(--border-color)', margin: '3rem 0' }} />

                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>Reviews</h2>

                    {editingReview ? (
                        <ReviewForm
                            initialData={editingReview}
                            onSubmit={handleUpdateReview}
                            onCancel={() => setEditingReview(null)}
                        />
                    ) : (
                        <ReviewForm onSubmit={handleCreateReview} />
                    )}

                    <ReviewList
                        reviews={reviews}
                        onEdit={setEditingReview}
                        onDelete={handleDeleteReview}
                    />
                </div>
            </div>
        </PageTransition>
    );
};

export default AnimeDetails;
