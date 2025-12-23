const Pagination = ({ currentPage, hasNextPage, onPageChange }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem', marginBottom: '2rem' }}>
            <button
                className="btn"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                style={{
                    backgroundColor: currentPage <= 1 ? 'var(--background-card)' : 'var(--primary-color)',
                    color: 'white',
                    opacity: currentPage <= 1 ? 0.5 : 1,
                    cursor: currentPage <= 1 ? 'not-allowed' : 'pointer'
                }}
            >
                Previous
            </button>

            <span style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
                Page {currentPage}
            </span>

            <button
                className="btn"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={!hasNextPage}
                style={{
                    backgroundColor: !hasNextPage ? 'var(--background-card)' : 'var(--primary-color)',
                    color: 'white',
                    opacity: !hasNextPage ? 0.5 : 1,
                    cursor: !hasNextPage ? 'not-allowed' : 'pointer'
                }}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
