import * as React from 'react';
import * as AP from  '@activity-kit/types';
import Header from './Header';
import SidebarNav from './SidebarNav';

export default ({ title, user, children }: { title: string; user: AP.Actor | null; children: React.ReactNode }) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <link href="/styles/light-dom.css" rel="stylesheet" />
    </head>
    <body>
      <Header user={user} />
      <SidebarNav user={user} />
      <main>
        {children}
      </main>
      <script src="/scripts/index.js" type="module"></script>
    </body>
  </html>
);
