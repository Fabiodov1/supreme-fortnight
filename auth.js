const AuthUtils = {
  getCurrentUser: () => {
    return new Promise((resolve) => {
      const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
        unsubscribe();
        resolve(user);
      });
    });
  },

  signOut: async () => {
    try {
      await firebaseAuth.signOut();
      return true;
    } catch (error) {
      console.error('Sign out error:', error);
      return false;
    }
  },

  signIn: async (email, password) => {
    try {
      const result = await firebaseAuth.signInWithEmailAndPassword(email, password);
      return { success: true, user: result.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  signUp: async (email, password) => {
    try {
      const result = await firebaseAuth.createUserWithEmailAndPassword(email, password);
      return { success: true, user: result.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

window.AuthUtils = AuthUtils;
