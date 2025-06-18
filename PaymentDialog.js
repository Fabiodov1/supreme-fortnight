function PaymentDialog({ isOpen, onPaymentSuccess, user }) {
  try {
    const [selectedPlan, setSelectedPlan] = React.useState('7');
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [buyerName, setBuyerName] = React.useState('');
    const [isProcessing, setIsProcessing] = React.useState(false);
    const [error, setError] = React.useState('');

    React.useEffect(() => {
      lucide.createIcons();
    }, [isOpen]);

    const plans = {
      '7': { days: 7, price: 500, label: '7 dias - 500 MT' },
      '14': { days: 14, price: 1400, label: '14 dias - 1400 MT' }
    };

    const handlePayment = async (e) => {
      e.preventDefault();
      setIsProcessing(true);
      setError('');

      try {
        const response = await fetch('https://mozpayment.co.mz/api/1.1/wf/pagamentorotativompesa', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            carteira: '1747743617661x539608097250345000',
            numero: phoneNumber,
            'quem comprou': buyerName,
            valor: plans[selectedPlan].price.toString()
          })
        });

        if (response.status === 200) {
          // Save subscription to Firebase
          await firebaseDb.ref(`users/${user.uid}/subscription`).set({
            plan: plans[selectedPlan].days + ' dias',
            expiresAt: new Date(Date.now() + plans[selectedPlan].days * 24 * 60 * 60 * 1000).toISOString(),
            isActive: true,
            paidAt: new Date().toISOString()
          });
          
          onPaymentSuccess(plans[selectedPlan]);
        } else if (response.status === 201) {
          setError('Erro na transação. Tente novamente.');
        } else if (response.status === 422) {
          setError('Saldo insuficiente na conta.');
        } else if (response.status === 400) {
          setError('PIN incorreto. Verifique seus dados.');
        }
      } catch (err) {
        setError('Erro de conexão. Tente novamente.');
      }

      setIsProcessing(false);
    };

    if (!isOpen) return null;

    return (
      React.createElement('div', {
        'data-name': 'payment-dialog',
        'data-file': 'components/PaymentDialog.js',
        className: 'fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4'
      },
        React.createElement('div', {
          className: 'glass-effect rounded-2xl p-6 w-full max-w-md'
        },
          React.createElement('div', {
            className: 'text-center mb-6'
          },
            React.createElement('div', {
              className: 'w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4'
            },
              React.createElement('i', {
                'data-lucide': 'credit-card',
                className: 'w-8 h-8 text-white'
              })
            ),
            React.createElement('h3', {
              className: 'text-xl font-bold text-white mb-2'
            }, 'Subscrição Pendente'),
            React.createElement('p', {
              className: 'text-white text-opacity-80 text-sm'
            }, 'Para continuar usando o app, você precisa escolher um plano')
          ),

          React.createElement('form', {
            onSubmit: handlePayment,
            className: 'space-y-4'
          },
            React.createElement('div', null,
              React.createElement('label', {
                className: 'block text-white font-medium mb-2'
              }, 'Escolha seu Plano'),
              React.createElement('select', {
                value: selectedPlan,
                onChange: (e) => setSelectedPlan(e.target.value),
                className: 'w-full p-3 rounded-lg bg-white bg-opacity-20 text-white border border-white border-opacity-30'
              },
                Object.entries(plans).map(([key, plan]) =>
                  React.createElement('option', {
                    key: key,
                    value: key,
                    className: 'text-black'
                  }, plan.label)
                )
              )
            ),

            React.createElement('div', null,
              React.createElement('input', {
                type: 'tel',
                placeholder: 'Número de telefone',
                value: phoneNumber,
                onChange: (e) => setPhoneNumber(e.target.value),
                required: true,
                className: 'w-full p-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70 border border-white border-opacity-30'
              })
            ),

            React.createElement('div', null,
              React.createElement('input', {
                type: 'text',
                placeholder: 'Nome do comprador',
                value: buyerName,
                onChange: (e) => setBuyerName(e.target.value),
                required: true,
                className: 'w-full p-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70 border border-white border-opacity-30'
              })
            ),

            error && React.createElement('div', {
              className: 'bg-red-500 bg-opacity-20 border border-red-400 rounded-lg p-3 text-red-300 text-sm text-center'
            }, error),

            React.createElement('button', {
              type: 'submit',
              disabled: isProcessing,
              className: 'w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-500 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center'
            },
              isProcessing ? React.createElement('div', {
                className: 'w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'
              }) : `Pagar ${plans[selectedPlan].price} MT`
            )
          ),

          React.createElement('div', {
            className: 'mt-4 text-center'
          },
            React.createElement('p', {
              className: 'text-white text-opacity-60 text-xs'
            }, 'Este diálogo só será fechado após o pagamento bem-sucedido')
          )
        )
      )
    );
  } catch (error) {
    console.error('PaymentDialog component error:', error);
    reportError(error);
  }
}
