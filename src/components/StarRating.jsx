const StarRating = ({ rating, onChange, readonly = false }) => {
    const stars = [1, 2, 3, 4, 5];

    return (
        <div style={{ display: 'flex', gap: '0.25rem' }}>
            {stars.map((star) => (
                <span
                    key={star}
                    onClick={() => !readonly && onChange && onChange(star)}
                    style={{
                        cursor: readonly ? 'default' : 'pointer',
                        fontSize: '1.5rem',
                        color: star <= rating ? '#fbbf24' : '#475569', // Amber-400 vs Slate-600
                        transition: 'color 0.2s',
                    }}
                >
                    ★
                </span>
            ))}
        </div>
    );
};

export default StarRating;
