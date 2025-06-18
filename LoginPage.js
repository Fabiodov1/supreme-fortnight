function LoginPage({ onLogin }) {
  try {
    const [isLogin, setIsLogin] = React.useState(true);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');

    React.useEffect(() => {
      lucide.createIcons();
    }, []);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError('');

      try {
        const result = isLogin 
          ? await AuthUtils.signIn(email, password)
          : await AuthUtils.signUp(email, password);

        if (result.success) {
          onLogin(result.user);
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError('Erro ao processar solicitação');
      }
      
      setLoading(false);
    };

    const inputClass = 'w-full pl-12 pr-4 py-3 rounded-xl bg-white bg-opacity-10 text-white placeholder-white placeholder-opacity-70 border border-white border-opacity-20 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all';

    return (
      React.createElement('div', {
        'data-name': 'login-page',
        'data-file': 'components/LoginPage.js',
        className: 'min-h-screen flex items-center justify-center p-6'
      },
        React.createElement('div', {
          className: 'glass-effect rounded-3xl p-8 w-full max-w-md shadow-2xl'
        },
          React.createElement('div', {
            className: 'text-center mb-8'
          },
            React.createElement('div', {
              className: 'w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg'
            },
              React.createElement('i', {
                'data-lucide': 'zap',
                className: 'w-10 h-10 text-white'
              })
            ),
            React.createElement('h1', {
              className: 'text-3xl font-bold text-white mb-2'
            }, 'HACKER SUB'),
            React.createElement('h2', {
              className: 'text-xl font-semibold text-yellow-300 mb-3'
            }, 'AVIATOR'),
            React.createElement('p', {
              className: 'text-white text-opacity-80'
            }, isLogin ? 'Faça login para continuar' : 'Crie sua conta gratuitamente')
          ),

          React.createElement('form', {
            onSubmit: handleSubmit,
            className: 'space-y-5'
          },
            React.createElement('div', {
              className: 'relative'
            },
              React.createElement('i', {
                'data-lucide': 'mail',
                className: 'absolute left-3 top-3 w-5 h-5 text-white text-opacity-70'
              }),
              React.createElement('input', {
                type: 'email',
                placeholder: 'Seu email',
                value: email,
                onChange: (e) => setEmail(e.target.value),
                required: true,
                className: inputClass
              })
            ),
            React.createElement('div', {
              className: 'relative'
            },
              React.createElement('i', {
                'data-lucide': 'lock',
                className: 'absolute left-3 top-3 w-5 h-5 text-white text-opacity-70'
              }),
              React.createElement('input', {
                type: 'password',
                placeholder: 'Sua senha',
                value: password,
                onChange: (e) => setPassword(e.target.value),
                required: true,
                className: inputClass
              })
            ),
            
            error && React.createElement('div', {
              className: 'bg-red-500 bg-opacity-20 border border-red-400 rounded-lg p-3 text-red-300 text-sm text-center'
            }, error),

            React.createElement('button', {
              type: 'submit',
              disabled: loading,
              className: 'w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-500 disabled:to-gray-600 text-white font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105 disabled:scale-100 shadow-lg flex items-center justify-center'
            },
              loading ? React.createElement('div', {
                className: 'w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin'
              }) : (isLogin ? 'Entrar' : 'Criar Conta')
            )
          ),

          React.createElement('div', {
            className: 'text-center mt-8'
          },
            React.createElement('button', {
              onClick: () => setIsLogin(!isLogin),
              className: 'text-yellow-300 hover:text-yellow-200 font-medium transition-colors'
            }, isLogin ? 'Não tem conta? Cadastre-se aqui' : 'Já tem conta? Faça login')
          )
        )
      )
    );
  } catch (error) {
    console.error('LoginPage component error:', error);
    reportError(error);
  }
}
