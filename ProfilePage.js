function ProfilePage({ user }) {
  try {
    const [userStats, setUserStats] = React.useState({
      signalsGenerated: 0,
      successRate: 0,
      memberSince: new Date().toLocaleDateString('pt-BR'),
      subscription: null,
      isReseller: false
    });
    
    const [isEditing, setIsEditing] = React.useState(false);
    const [displayName, setDisplayName] = React.useState(user?.displayName || '');

    React.useEffect(() => {
      lucide.createIcons();
      
      // Load user subscription from Firebase
      const loadUserData = async () => {
        try {
          const subscriptionRef = firebaseDb.ref(`users/${user.uid}/subscription`);
          const snapshot = await subscriptionRef.once('value');
          const subscriptionData = snapshot.val();
          
          setUserStats({
            signalsGenerated: Math.floor(Math.random() * 1000) + 100,
            successRate: Math.floor(Math.random() * 30) + 70,
            memberSince: new Date(user?.metadata?.creationTime || Date.now()).toLocaleDateString('pt-BR'),
            subscription: subscriptionData ? {
              plan: subscriptionData.plan,
              expiresAt: new Date(subscriptionData.expiresAt).toLocaleDateString('pt-BR'),
              isActive: new Date(subscriptionData.expiresAt) > new Date()
            } : null,
            isReseller: false
          });
        } catch (error) {
          console.error('Error loading user data:', error);
        }
      };

      loadUserData();
    }, [user]);

    const updateProfile = async () => {
      try {
        await user.updateProfile({
          displayName: displayName
        });
        setIsEditing(false);
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    };

    const toggleReseller = () => {
      setUserStats(prev => ({
        ...prev,
        isReseller: !prev.isReseller
      }));
    };

    return (
      React.createElement('div', {
        'data-name': 'profile-page',
        'data-file': 'components/ProfilePage.js',
        className: 'max-w-4xl mx-auto p-6 mt-20 mb-24'
      },
        React.createElement('div', {
          className: 'glass-effect rounded-2xl p-6 mb-6'
        },
          React.createElement('div', {
            className: 'text-center mb-6'
          },
            React.createElement('div', {
              className: 'w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4'
            },
              React.createElement('i', {
                'data-lucide': 'user',
                className: 'w-12 h-12 text-white'
              })
            ),
            React.createElement('h2', {
              className: 'text-2xl font-bold text-white mb-2'
            }, displayName || 'Usuário'),
            React.createElement('p', {
              className: 'text-white text-opacity-80'
            }, user?.email),
            userStats.isReseller && React.createElement('span', {
              className: 'inline-block bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold mt-2'
            }, 'REVENDEDOR')
          ),
          
          React.createElement('div', {
            className: 'space-y-4'
          },
            React.createElement('div', {
              className: 'flex items-center justify-between'
            },
              React.createElement('span', {
                className: 'text-white font-medium'
              }, 'Nome de exibição'),
              isEditing ? React.createElement('div', {
                className: 'flex items-center space-x-2'
              },
                React.createElement('input', {
                  type: 'text',
                  value: displayName,
                  onChange: (e) => setDisplayName(e.target.value),
                  className: 'px-3 py-1 rounded bg-white bg-opacity-20 text-white border border-white border-opacity-30 focus:outline-none'
                }),
                React.createElement('button', {
                  onClick: updateProfile,
                  className: 'text-green-400 hover:text-green-300'
                },
                  React.createElement('i', {
                    'data-lucide': 'check',
                    className: 'w-4 h-4'
                  })
                )
              ) : React.createElement('button', {
                onClick: () => setIsEditing(true),
                className: 'text-yellow-400 hover:text-yellow-300'
              },
                React.createElement('i', {
                  'data-lucide': 'edit',
                  className: 'w-4 h-4'
                })
              )
            ),

            React.createElement('div', {
              className: 'flex items-center justify-between'
            },
              React.createElement('span', {
                className: 'text-white font-medium'
              }, 'Opção Revendedor'),
              React.createElement('button', {
                onClick: toggleReseller,
                className: `px-4 py-2 rounded-lg font-medium transition-colors ${
                  userStats.isReseller 
                    ? 'bg-yellow-500 text-black' 
                    : 'bg-gray-600 text-white hover:bg-gray-500'
                }`
              }, userStats.isReseller ? 'Ativo' : 'Inativo')
            )
          )
        ),

        React.createElement('div', {
          className: 'glass-effect rounded-2xl p-6 mb-6'
        },
          React.createElement('h3', {
            className: 'text-xl font-bold text-white mb-4'
          }, 'Meus Planos'),
          userStats.subscription && userStats.subscription.isActive ? React.createElement('div', {
            className: 'bg-green-500 bg-opacity-20 border border-green-400 rounded-lg p-4'
          },
            React.createElement('div', {
              className: 'flex justify-between items-center'
            },
              React.createElement('div', null,
                React.createElement('div', {
                  className: 'text-green-300 font-bold'
                }, userStats.subscription.plan),
                React.createElement('div', {
                  className: 'text-white text-sm'
                }, `Expira em: ${userStats.subscription.expiresAt}`)
              ),
              React.createElement('div', {
                className: 'text-green-400 font-bold'
              }, 'ATIVO')
            )
          ) : React.createElement('div', {
            className: 'bg-orange-500 bg-opacity-20 border border-orange-400 rounded-lg p-4 text-center'
          },
            React.createElement('div', {
              className: 'text-orange-300 font-bold mb-2'
            }, 'Subscrição Pendente'),
            React.createElement('div', {
              className: 'text-white text-sm'
            }, 'Complete o pagamento para ativar sua subscrição')
          )
        ),
        
        React.createElement('div', {
          className: 'glass-effect rounded-2xl p-6'
        },
          React.createElement('h3', {
            className: 'text-xl font-bold text-white mb-4'
          }, 'Estatísticas'),
          React.createElement('div', {
            className: 'grid grid-cols-1 md:grid-cols-3 gap-4'
          },
            React.createElement('div', {
              className: 'bg-white bg-opacity-10 rounded-lg p-4 text-center'
            },
              React.createElement('div', {
                className: 'text-2xl font-bold text-yellow-400 mb-1'
              }, userStats.signalsGenerated),
              React.createElement('div', {
                className: 'text-white text-sm'
              }, 'Sinais Gerados')
            ),
            React.createElement('div', {
              className: 'bg-white bg-opacity-10 rounded-lg p-4 text-center'
            },
              React.createElement('div', {
                className: 'text-2xl font-bold text-green-400 mb-1'
              }, `${userStats.successRate}%`),
              React.createElement('div', {
                className: 'text-white text-sm'
              }, 'Taxa de Sucesso')
            ),
            React.createElement('div', {
              className: 'bg-white bg-opacity-10 rounded-lg p-4 text-center'
            },
              React.createElement('div', {
                className: 'text-lg font-bold text-blue-400 mb-1'
              }, userStats.memberSince),
              React.createElement('div', {
                className: 'text-white text-sm'
              }, 'Membro desde')
            )
          )
        )
      )
    );
  } catch (error) {
    console.error('ProfilePage component error:', error);
    reportError(error);
  }
}
