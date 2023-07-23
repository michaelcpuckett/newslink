import * as React from 'react';
import * as AP from  '@activity-kit/types';

import PageChrome from '../components/PageChrome';
import Feed from '../components/Feed';

export default ({ entity, user }: { entity: AP.OrderedCollectionPage, user: AP.Actor | null }) => (
  <PageChrome
    title={entity.name ?? 'Outbox'}
    user={user}>
    <h1>
      {entity.name}
    </h1>
    <Feed collectionPage={entity} />
  </PageChrome>
);