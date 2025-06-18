function SettingsPage() {
  try {
    const [notifications, setNotifications] = React.useState(true);
    const [darkMode, setDarkMode] = React.useState(false);
    const [autoGenerate, setAutoGenerate] = React.useState(false);

    React.useEffect(() => {
      lucide.createIcons();
    }, []);

    const settingsItems = [
      {
        icon: 'bell',
        title: 'Notificações',
        description: 'Receber alertas de novos sinais',
        value: notifications,
        onChange: setNotifications
      },
      {
        icon: 'moon',
        title: 'Modo Escuro',
        description: 'Alternar tema da aplicação',
        value: darkMode,
        onChange: setDarkMode
      },
      {
        icon: 'repeat',
        title: 'Geração Automática',
        description: 'Gerar sinais automaticamente',
        value: autoGenerate,
        onChange: setAutoGenerate
      }
    ];

    return (
      React.createElement('div', {
        'data-name': 'settings-page',
        'data-file': 'components/SettingsPage.js',
        className: 'max-w-4xl mx-auto p-6 mt-20 mb-24'
      },
        React.createElement('div', {
          className: 'glass-effect rounded-2xl p-6 mb-6'
        },
          React.createElement('h2', {
            className: 'text-2xl font-bold text-white text-center mb-6'
          }, 'Configurações'),
          
          React.createElement('div', {
            className: 'space-y-4'
          },
            settingsItems.map((item, index) =>
              React.createElement('div', {
                key: index,
                className: 'flex items-center justify-between p-4 bg-white bg-opacity-10 rounded-lg'
              },
                React.createElement('div', {
                  className: 'flex items-center space-x-3'
                },
                  React.createElement('div', {
                    className: 'w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center'
                  },
                    React.createElement('i', {
                      'data-lucide': item.icon,
                      className: 'w-5 h-5 text-white'
                    })
                  ),
                  React.createElement('div', null,
                    React.createElement('div', {
                      className: 'text-white font-medium'
                    }, item.title),
                    React.createElement('div', {
                      className: 'text-white text-opacity-70 text-sm'
                    }, item.description)
                  )
                ),
                React.createElement('label', {
                  className: 'relative inline-flex items-center cursor-pointer'
                },
                  React.createElement('input', {
                    type: 'checkbox',
                    checked: item.value,
                    onChange: (e) => item.onChange(e.target.checked),
                    className: 'sr-only peer'
                  }),
                  React.createElement('div', {
                    className: 'w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[\'\'] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600'
                  })
                )
              )
            )
          )
        ),
        
        React.createElement('div', {
          className: 'glass-effect rounded-2xl p-6'
        },
          React.createElement('h3', {
            className: 'text-xl font-bold text-white mb-4'
          }, 'Informações do App'),
          React.createElement('div', {
            className: 'space-y-3 text-white text-opacity-80'
          },
            React.createElement('div', {
              className: 'flex justify-between'
            },
              React.createElement('span', null, 'Versão'),
              React.createElement('span', null, '1.0.0')
            ),
            React.createElement('div', {
              className: 'flex justify-between'
            },
              React.createElement('span', null, 'Última atualização'),
              React.createElement('span', null, new Date().toLocaleDateString('pt-BR'))
            ),
            React.createElement('div', {
              className: 'flex justify-between'
            },
              React.createElement('span', null, 'Desenvolvido por'),
              React.createElement('span', null, 'HACKER SUB')
            )
          )
        )
      )
    );
  } catch (error) {
    console.error('SettingsPage component error:', error);
    reportError(error);
  }
}
