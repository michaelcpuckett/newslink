import * as React from 'react';
import * as AP from  '@activity-kit/types';

import PageChrome from '../components/PageChrome';
import LoginForm from '../components/Forms/LoginForm';
import SignUpForm from '../components/Forms/SignUpForm';
import CreatePostForm from '../components/Forms/CreatePostForm';

export default ({ user }: { user: AP.Actor | null }) => (
  <PageChrome
    title="Home Page"
    user={user}>
    {user ? (
      <>
        <h1>
          Welcome, {user.name}!
        </h1>
        <h2>
          Make a post.
        </h2>
        <CreatePostForm user={user} />
      </>
    ) : (
      <>
        <h1>
          Log in or sign up.
        </h1>
        <section role="region" aria-labelledby="login-heading">
          <h2 id="login-heading">
            Log In
          </h2>
          <LoginForm />
        </section>
        <hr role="none" />
        <section role="region" aria-labelledby="signup-heading">
          <h2 id="signup-heading">
            Sign Up
          </h2>
          <SignUpForm />
        </section>
        </>
      )
    }
  </PageChrome>
);
