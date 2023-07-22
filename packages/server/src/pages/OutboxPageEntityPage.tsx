import * as React from 'react';
import Header from '../components/Header';
import SidebarNav from '../components/SidebarNav';
import Feed from '../components/Feed';
import * as AP from  '@activity-kit/types';

export default ({ entity, user }: { entity: AP.OrderedCollection, user: AP.Actor | null }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Inbox - Activity Feed</title>
        <link href="/styles/light-dom.css" rel="stylesheet" />
      </head>
      <body>
        <Header user={user} />
        <SidebarNav user={user} />
        <main>
          <h1>
            {entity.name}
          </h1>
          <Feed collection={entity} />
        </main>
        <script src="/scripts/index.js" type="module"></script>
      </body>
    </html>
  );
};