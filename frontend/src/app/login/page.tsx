'use server';

import {
  signIn,
  getSession,
  getCsrfToken,
  getProviders,
} from 'next-auth/react';
import Main from '@/components/Main';
import Button from '@/components/base/Button';
import Card from '@/components/base/Card';
import GithubSigninButton from './GithubSigninButton';

export default async function SigninPage() {
  const providers = await getProviders();

  return (
    <Main>
      <h1>Login</h1>
      <article className='flex justify-center'>
        <Card className='flex flex-col items-center px-20'>
          <span className='text-xl font-medium'>Choose your provider!</span>
          <div className='flex flex-row justify-start items-center max-w-fit'>
            <GithubSigninButton></GithubSigninButton>
          </div>
        </Card>
      </article>
    </Main>
  );
}
