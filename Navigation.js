function Navigation({ currentPage, onPageChange }) {
  try {
    const navItems = [
      { id: 'home', icon: 'home', label: 'Início' },
      { id: 'profile', icon: 'user', label: 'Perfil' },
      { id: 'settings', icon: 'settings', label: 'Configurações' }
    ];

    React.useEffect(() => {
      lucide.createIcons();
    }, []);

    return (
      React.createElement('div', {
        'data-name': 'navigation',
        'data-file': 'components/Navigation.js',
        className: 'fixed bottom-0 left-0 right-0 bg-white bg-opacity-10 backdrop-blur-md border-t border-white border-opacity-20 p-4 z-40'
      },
        React.createElement('div', {
          className: 'flex justify-around max-w-md mx-auto'
        },
          navItems.map(item =>
            React.createElement('button', {
              key: item.id,
              onClick: () => onPageChange(item.id),
              className: `flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
                currentPage === item.id 
                  ? 'text-yellow-300 bg-white bg-opacity-20' 
                  : 'text-white hover:text-yellow-200'
              }`
            },
              React.createElement('i', {
                'data-lucide': item.icon,
                className: 'w-6 h-6'
              }),
              React.createElement('span', {
                className: 'text-xs font-medium'
              }, item.label)
            )
          )
        )
      )
    );
  } catch (error) {
    console.error('Navigation component error:', error);
    reportError(error);
  }
}
