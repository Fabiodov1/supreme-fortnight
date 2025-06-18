function UserHeader({ user, onSignOut }) {
  try {
    if (!user) return null;

    return (
      React.createElement('div', {
        'data-name': 'user-header',
        'data-file': 'components/UserHeader.js',
        className: 'fixed top-0 left-0 right-0 bg-white bg-opacity-10 backdrop-blur-md border-b border-white border-opacity-20 p-4 z-40'
      },
        React.createElement('div', {
          className: 'flex justify-between items-center max-w-6xl mx-auto'
        },
          React.createElement('div', {
            className: 'flex items-center space-x-3'
          },
            React.createElement('div', {
              className: 'w-8 h-8 bg-green-500 rounded-full flex items-center justify-center'
            },
              React.createElement('i', {
                'data-lucide': 'user',
                className: 'w-4 h-4 text-white'
              })
            ),
            React.createElement('span', {
              className: 'text-white font-medium'
            }, user.email)
          ),
          React.createElement('button', {
            onClick: onSignOut,
            className: 'text-white hover:text-red-300 transition-colors'
          },
            React.createElement('i', {
              'data-lucide': 'log-out',
              className: 'w-5 h-5'
            })
          )
        )
      )
    );
  } catch (error) {
    console.error('UserHeader component error:', error);
    reportError(error);
  }
}
