'use client';

import { GithubLoginButton } from 'react-social-login-buttons';
import { signIn } from 'next-auth/react';

export default function GithubSigninButton() {
  return (
    <GithubLoginButton onClick={() => signIn('github', { callbackUrl: '/' })} />
  );
}
