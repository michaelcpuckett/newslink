import * as React from 'react';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';
import Header from '../components/Header';
import SidebarNav from '../components/SidebarNav';

export default () => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <title>Timeline</title>
      <link href="/styles/light-dom.css" rel="stylesheet" />
    </head>
    <body>
      <Header />
      <SidebarNav />
      <main>
        <h1>
          Timeline
        </h1>
        <LoginForm />
        <SignUpForm />
      </main>
      <script src="/scripts/index.js" type="module"></script>
    </body>
  </html>
);
