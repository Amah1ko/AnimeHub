const LoadingState = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
            <div className="spinner"></div>
            <style>{`
        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid var(--border-color);
          border-top: 4px solid var(--primary-color);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
};

export default LoadingState;
