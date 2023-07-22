import * as React from 'react';
import Header from '../components/Header';
import SidebarNav from '../components/SidebarNav';
import FollowForm from '../components/FollowForm';
import * as AP from '@activity-kit/types';
import { getArray, getEntity, getId } from '@activity-kit/utilities';

export default ({ entity, user }: { entity: AP.Actor, user: AP.Actor | null }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>@{entity.preferredUsername} - Profile Page</title>
        <link href="/styles/light-dom.css" rel="stylesheet" />
      </head>
      <body>
        <Header user={user} />
        <SidebarNav user={user} />
        <main>
          <h1>
            @{entity.preferredUsername}
          </h1>
          <dl>
            <dt>
              Name
            </dt>
            <dd>
              {entity.name}
            </dd>
            
            <dt>
              Inbox Link
            </dt>
            <dd>
              <a href={entity.inbox instanceof URL ? entity.inbox.href : '#'}>
                {entity.inbox instanceof URL ? 'Inbox' : 'No Inbox'}
              </a>
            </dd>
            
            <dt>
              Outbox Link
            </dt>
            <dd>
              <a href={entity.outbox instanceof URL ? entity.outbox.href : '#'}>
                {entity.outbox instanceof URL ? 'Outbox' : 'No Outbox'}
              </a>
            </dd>
          </dl>

          <h2>
            Follow
          </h2>
          <FollowForm follower={user} followee={entity} />

          <h2>
            Followers
          </h2>
          <ul>
            {getArray(entity.followers).map(follower => {
              return (
                <li>
                  <a href={getId(follower).href || '#'}>
                    {getId(follower).href}
                  </a>
                </li>
              );
            })}
          </ul>
        </main>
        <script src="/scripts/index.js" type="module"></script>
      </body>
    </html>
  );
};