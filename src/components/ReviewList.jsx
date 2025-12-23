import StarRating from './StarRating';

const ReviewList = ({ reviews, onEdit, onDelete }) => {
    if (!reviews || reviews.length === 0) {
        return <div style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>No reviews yet. Be the first!</div>;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {reviews.map((review) => (
                <div key={review.id} style={{
                    backgroundColor: 'var(--background-card)',
                    padding: '1.5rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                        <StarRating rating={review.rating} readonly={true} />
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button
                                onClick={() => onEdit(review)}
                                style={{ color: 'var(--text-muted)', fontSize: '0.875rem', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => onDelete(review.id)}
                                style={{ color: 'var(--danger-color)', fontSize: '0.875rem', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                    <p style={{ whiteSpace: 'pre-wrap' }}>{review.comment}</p>
                    <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {new Date(review.createdAt || Date.now()).toLocaleDateString()}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ReviewList;
