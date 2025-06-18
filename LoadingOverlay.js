function LoadingOverlay({ isVisible }) {
  try {
    if (!isVisible) return null;

    return (
      React.createElement('div', {
        'data-name': 'loading-overlay',
        'data-file': 'components/LoadingOverlay.js',
        className: 'fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 transition-opacity duration-1000'
      },
        React.createElement('div', {
          className: 'text-center'
        },
          React.createElement('img', {
            src: 'https://upload.wikimedia.org/wikipedia/commons/9/92/Spribe_logo.png',
            alt: 'Spribe',
            className: 'w-48 h-auto mx-auto mb-4 animate-pulse'
          }),
          React.createElement('div', {
            className: 'loading-spinner mx-auto'
          })
        )
      )
    );
  } catch (error) {
    console.error('LoadingOverlay component error:', error);
    reportError(error);
  }
}
