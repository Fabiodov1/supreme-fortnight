function SignalGenerator() {
  try {
    const [casaApostas, setCasaApostas] = React.useState('Megagamelive');
    const [numPredicoes, setNumPredicoes] = React.useState(18);
    const [signals, setSignals] = React.useState([]);
    const [signalsRosa, setSignalsRosa] = React.useState([]);
    const [isGenerating, setIsGenerating] = React.useState(false);

    const casas = [
      'Megagamelive', 'Olabet', 'betvivo', '888bets', 'elephantbet', 'betika'
    ];

    const gerarSinais = async () => {
      setIsGenerating(true);
      setSignals([]);
      setSignalsRosa([]);

      await new Promise(resolve => setTimeout(resolve, 1500));

      const newSignals = [];
      const newSignalsRosa = [];

      // Dados crus para sinais normais
      const dadosCrus = [
        '2.45x', '1.87x', '3.21x', '1.95x', '4.67x', '2.13x', '1.76x', '5.23x',
        '2.89x', '1.64x', '3.45x', '2.07x', '6.78x', '1.92x', '2.34x', '3.67x'
      ];

      for (let i = 0; i < numPredicoes; i++) {
        const agora = new Date();
        const horas = agora.getHours().toString().padStart(2, '0');
        const minutos = (agora.getMinutes() + i).toString().padStart(2, '0');
        const segundos = Math.floor(Math.random() * 60).toString().padStart(2, '0');
        
        const signal = {
          id: i,
          time: `${horas}:${minutos}:${segundos}`,
          value: dadosCrus[i % dadosCrus.length],
          type: i % 3 === 0 ? 'roxo' : i % 3 === 1 ? 'azul' : 'rosa'
        };

        newSignals.push(signal);
      }

      // Rosas próximas especiais
      const rosasProximas = [
        { time: '14:23:45', value: '7.89x' },
        { time: '14:27:12', value: '9.34x' },
        { time: '14:31:56', value: '12.67x' },
        { time: '14:35:23', value: '15.23x' }
      ];

      rosasProximas.forEach((rosa, index) => {
        newSignalsRosa.push({
          id: index,
          time: rosa.time,
          value: rosa.value,
          type: 'rosa'
        });
      });

      setSignals(newSignals);
      setSignalsRosa(newSignalsRosa);
      setIsGenerating(false);
    };

    const getSignalClass = (type) => {
      switch (type) {
        case 'roxo': return 'bg-gradient-to-r from-purple-600 to-purple-800';
        case 'azul': return 'bg-gradient-to-r from-blue-500 to-blue-700';
        case 'rosa': return 'bg-gradient-to-r from-pink-500 to-pink-700';
        default: return 'bg-gray-500';
      }
    };

    return (
      React.createElement('div', {
        'data-name': 'signal-generator',
        'data-file': 'components/SignalGenerator.js',
        className: 'max-w-4xl mx-auto p-6 mt-20 mb-24'
      },
        React.createElement('div', {
          className: 'glass-effect rounded-2xl p-6 mb-6'
        },
          React.createElement('h2', {
            className: 'text-2xl font-bold text-white text-center mb-6'
          }, 'Gerador de Sinais'),
          
          React.createElement('div', {
            className: 'space-y-4 mb-6'
          },
            React.createElement('div', null,
              React.createElement('label', {
                className: 'block text-white font-medium mb-2'
              }, 'Escolha a casa de apostas'),
              React.createElement('select', {
                value: casaApostas,
                onChange: (e) => setCasaApostas(e.target.value),
                className: 'w-full p-3 rounded-lg bg-white bg-opacity-20 text-white border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-yellow-400'
              },
                casas.map(casa =>
                  React.createElement('option', {
                    key: casa,
                    value: casa,
                    className: 'text-black'
                  }, casa)
                )
              )
            ),
            
            React.createElement('div', null,
              React.createElement('label', {
                className: 'block text-white font-medium mb-2'
              }, 'Número de predições'),
              React.createElement('input', {
                type: 'number',
                value: numPredicoes,
                onChange: (e) => setNumPredicoes(Math.max(1, e.target.value)),
                className: 'w-full p-3 rounded-lg bg-white bg-opacity-20 text-white border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-yellow-400'
              })
            )
          ),
          
          React.createElement('button', {
            onClick: gerarSinais,
            disabled: isGenerating,
            className: 'w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-500 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2'
          },
            isGenerating && React.createElement('div', {
              className: 'w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'
            }),
            React.createElement('span', null, isGenerating ? 'Gerando...' : 'Gerar Sinais')
          )
        ),
        
        signals.length > 0 && React.createElement('div', {
          className: 'glass-effect rounded-2xl p-6 mb-6 fade-in'
        },
          React.createElement('h3', {
            className: 'text-xl font-bold text-white text-center mb-4'
          }, 'Dados Crus Gerados'),
          React.createElement('div', {
            className: 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'
          },
            signals.map(signal =>
              React.createElement('div', {
                key: signal.id,
                className: `${getSignalClass(signal.type)} text-white p-3 rounded-lg text-center font-bold shadow-lg signal-animation`
              },
                React.createElement('div', {
                  className: 'text-sm'
                }, signal.time),
                React.createElement('div', {
                  className: 'text-lg'
                }, signal.value)
              )
            )
          )
        ),
        
        signalsRosa.length > 0 && React.createElement('div', {
          className: 'glass-effect rounded-2xl p-6 fade-in'
        },
          React.createElement('h3', {
            className: 'text-xl font-bold text-white text-center mb-4'
          }, 'Rosas Próximas Especiais'),
          React.createElement('div', {
            className: 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'
          },
            signalsRosa.map(signal =>
              React.createElement('div', {
                key: signal.id,
                className: `${getSignalClass(signal.type)} text-white p-3 rounded-lg text-center font-bold shadow-lg signal-animation border-2 border-yellow-400`
              },
                React.createElement('div', {
                  className: 'text-sm'
                }, signal.time),
                React.createElement('div', {
                  className: 'text-lg'
                }, signal.value)
              )
            )
          )
        )
      )
    );
  } catch (error) {
    console.error('SignalGenerator component error:', error);
    reportError(error);
  }
}
