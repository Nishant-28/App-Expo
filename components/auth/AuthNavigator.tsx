import React, { useState } from 'react';
import { LoginScreen } from './LoginScreen';
import { SignUpScreen } from './SignUpScreen';

export const AuthNavigator: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  if (isLogin) {
    return <LoginScreen onSwitchToSignUp={() => setIsLogin(false)} />;
  }

  return <SignUpScreen onSwitchToLogin={() => setIsLogin(true)} />;
}; 