import * as React from 'react';
import EditProfileForm from '../components/EditProfileForm';
import Header from '../components/Header';
import SidebarNav from '../components/SidebarNav';

export default () => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <title>Edit Profile</title>
      <link href="/styles/light-dom.css" rel="stylesheet" />
    </head>
    <body>
      <Header />
      <SidebarNav />
      <main>
        <h1>
          Edit Profile
        </h1>
        <EditProfileForm />
      </main>
      <script src="/scripts/index.js" type="module"></script>
    </body>
  </html>
);
