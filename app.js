function App() {
  try {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [currentPage, setCurrentPage] = React.useState('home');
    const [showPaymentDialog, setShowPaymentDialog] = React.useState(false);
    const [hasActiveSubscription, setHasActiveSubscription] = React.useState(false);

    React.useEffect(() => {
      lucide.createIcons();
      
      const unsubscribe = firebaseAuth.onAuthStateChanged(async (user) => {
        setUser(user);
        
        if (user) {
          // Check if user has active subscription
          try {
            const subscriptionRef = firebaseDb.ref(`users/${user.uid}/subscription`);
            const snapshot = await subscriptionRef.once('value');
            const subscriptionData = snapshot.val();
            
            const hasActiveSub = subscriptionData && 
              subscriptionData.isActive && 
              new Date(subscriptionData.expiresAt) > new Date();
            
            setHasActiveSubscription(hasActiveSub);
            setShowPaymentDialog(!hasActiveSub);
          } catch (error) {
            console.error('Error checking subscription:', error);
            setShowPaymentDialog(true);
          }
        }
        
        setLoading(false);
      });

      return () => unsubscribe();
    }, []);

    const handleLogin = (user) => {
      setUser(user);
    };

    const handleSignOut = async () => {
      const success = await AuthUtils.signOut();
      if (success) {
        setUser(null);
        setCurrentPage('home');
        setShowPaymentDialog(false);
        setHasActiveSubscription(false);
      }
    };

    const handlePaymentSuccess = (plan) => {
      setHasActiveSubscription(true);
      setShowPaymentDialog(false);
    };

    const renderPage = () => {
      switch (currentPage) {
        case 'profile':
          return React.createElement(ProfilePage, { user });
        case 'settings':
          return React.createElement(SettingsPage);
        default:
          return React.createElement(SignalGenerator);
      }
    };

    if (loading) {
      return React.createElement(LoadingOverlay, { isVisible: true });
    }

    if (!user) {
      return React.createElement(LoginPage, { onLogin: handleLogin });
    }

    return (
      React.createElement('div', {
        'data-name': 'app',
        'data-file': 'app.js',
        className: 'min-h-screen gradient-bg'
      },
        React.createElement(UserHeader, { user, onSignOut: handleSignOut }),
        renderPage(),
        React.createElement(Navigation, { 
          currentPage, 
          onPageChange: setCurrentPage 
        }),
        React.createElement(PaymentDialog, {
          isOpen: showPaymentDialog,
          onPaymentSuccess: handlePaymentSuccess,
          user: user
        })
      )
    );
  } catch (error) {
    console.error('App component error:', error);
    reportError(error);
  }
}

// Render the app
ReactDOM.render(React.createElement(App), document.getElementById('root'));
