import { useState, useEffect } from 'react';
import { getSeasonalAnime } from '../services/jikanApi';
import AnimeList from '../components/AnimeList';
import Pagination from '../components/Pagination';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import PageTransition from '../components/PageTransition';

const Releases = () => {
    const [animes, setAnimes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);

    const fetchSeasonal = async (currentPage) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getSeasonalAnime(currentPage);
            setAnimes(data.data);
            setHasNextPage(data.pagination.has_next_page);
        } catch (err) {
            setError('Failed to fetch seasonal releases.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSeasonal(page);
        window.scrollTo(0, 0);
    }, [page]);

    return (
        <PageTransition>
            <div className="container">
                <h1 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Seasonal Releases</h1>
                {loading ? (
                    <LoadingState />
                ) : error ? (
                    <ErrorState message={error} onRetry={() => fetchSeasonal(page)} />
                ) : (
                    <>
                        <AnimeList animes={animes} />
                        <Pagination
                            currentPage={page}
                            hasNextPage={hasNextPage}
                            onPageChange={setPage}
                        />
                    </>
                )}
            </div>
        </PageTransition>
    );
};

export default Releases;
