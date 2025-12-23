import { useState, useEffect } from 'react';
import StarRating from './StarRating';

const ReviewForm = ({ onSubmit, initialData = null, onCancel }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (initialData) {
            setRating(initialData.rating);
            setComment(initialData.comment);
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (rating === 0) {
            setError('Please select a star rating.');
            return;
        }
        if (comment.length < 5) {
            setError('Comment must be at least 5 characters long.');
            return;
        }
        if (comment.length > 500) {
            setError('Comment must be less than 500 characters.');
            return;
        }

        setError('');
        onSubmit({ rating, comment });
        // Reset if not editing (or handle via parent)
        if (!initialData) {
            setRating(0);
            setComment('');
        }
    };

    return (
        <div style={{
            backgroundColor: 'var(--background-card)',
            padding: '1.5rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
            marginBottom: '2rem'
        }}>
            <h3 style={{ marginBottom: '1rem' }}>{initialData ? 'Edit Review' : 'Write a Review'}</h3>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Rating</label>
                    <StarRating rating={rating} onChange={setRating} />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Comment</label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        style={{
                            width: '100%',
                            minHeight: '100px',
                            padding: '0.75rem',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--border-color)',
                            backgroundColor: 'var(--background-dark)',
                            color: 'var(--text-main)',
                            fontFamily: 'inherit',
                            resize: 'vertical'
                        }}
                        placeholder="Share your thoughts..."
                    />
                </div>

                {error && <div style={{ color: 'var(--danger-color)', marginBottom: '1rem' }}>{error}</div>}

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button type="submit" className="btn btn-primary">
                        {initialData ? 'Update Review' : 'Submit Review'}
                    </button>
                    {onCancel && (
                        <button type="button" className="btn" style={{ backgroundColor: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-main)' }} onClick={onCancel}>
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default ReviewForm;
