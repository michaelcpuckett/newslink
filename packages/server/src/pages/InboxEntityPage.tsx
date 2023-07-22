import * as React from 'react';
import Header from '../components/Header';
import SidebarNav from '../components/SidebarNav';
import * as AP from  '@activity-kit/types';
import { getId } from '@activity-kit/utilities';

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
          <ul>
            <li>
              <a href={getId(entity.first).href}>
                First Page
              </a>
            </li>
          </ul>
        </main>
        <script src="/scripts/index.js" type="module"></script>
      </body>
    </html>
  );
};