import * as React from 'react';
import * as AP from  '@activity-kit/types';

import PageChrome from '../components/Chrome/PageChrome';
import Feed from '../components/Feed/ActivityFeed';

export default ({ entity, user }: { entity: AP.OrderedCollectionPage, user: AP.Actor | null }) => (
  <PageChrome
    title={entity.name || 'Inbox'}
    user={user}>
    <h1>
      {entity.name}
    </h1>
    <Feed collectionPage={entity} />
  </PageChrome>
);