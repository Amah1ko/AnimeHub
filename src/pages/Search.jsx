import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchAnime } from '../services/jikanApi';
import AnimeList from '../components/AnimeList';
import Pagination from '../components/Pagination';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import PageTransition from '../components/PageTransition';

const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('q') || '';

    const [searchInput, setSearchInput] = useState(query);
    const [animes, setAnimes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchInput.trim()) return;
        setSearchParams({ q: searchInput });
        setPage(1); // Reset to page 1 on new search
    };

    const performSearch = async (searchQuery, currentPage) => {
        if (!searchQuery) {
            setAnimes([]);
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const data = await searchAnime(searchQuery, currentPage);
            setAnimes(data.data);
            setHasNextPage(data.pagination.has_next_page);
        } catch (err) {
            setError('Failed to search anime.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (query) {
            performSearch(query, page);
        }
    }, [query, page]);

    return (
        <PageTransition>
            <div className="container">
                <div style={{ marginTop: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
                    <h1 style={{ marginBottom: '1.5rem' }}>Find Anime</h1>
                    <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem', maxWidth: '600px', margin: '0 auto' }}>
                        <input
                            type="text"
                            placeholder="Search for anime..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            style={{
                                flex: 1,
                                padding: '0.75rem',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--border-color)',
                                backgroundColor: 'var(--background-card)',
                                color: 'var(--text-main)',
                                fontSize: '1rem'
                            }}
                        />
                        <button type="submit" className="btn btn-primary">Search</button>
                    </form>
                </div>

                {loading ? (
                    <LoadingState />
                ) : error ? (
                    <ErrorState message={error} onRetry={() => performSearch(query, page)} />
                ) : (
                    <>
                        {query && <h2 style={{ marginBottom: '1rem' }}>Results for "{query}"</h2>}
                        <AnimeList animes={animes} />
                        {animes.length > 0 && (
                            <Pagination
                                currentPage={page}
                                hasNextPage={hasNextPage}
                                onPageChange={setPage}
                            />
                        )}
                    </>
                )}
            </div>
        </PageTransition>
    );
};

export default Search;
