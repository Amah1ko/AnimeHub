const ErrorState = ({ message, onRetry }) => {
    return (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--danger-color)' }}>
            <h2>Oops! Something went wrong.</h2>
            <p style={{ margin: '1rem 0' }}>{message || 'Failed to load data.'}</p>
            {onRetry && (
                <button className="btn btn-primary" onClick={onRetry}>
                    Try Again
                </button>
            )}
        </div>
    );
};

export default ErrorState;
