import * as React from 'react';
import * as AP from  '@activity-kit/types';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';
import Header from '../components/Header';
import SidebarNav from '../components/SidebarNav';
import CreatePostForm from '../components/CreatePostForm';

export default ({ user }: { user: AP.Actor | null }) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <title>Home Page</title>
      <link href="/styles/light-dom.css" rel="stylesheet" />
    </head>
    <body>
      <Header user={user} />
      <SidebarNav user={user} />
      <main>
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
      </main>
      <script src="/scripts/index.js" type="module"></script>
    </body>
  </html>
);
