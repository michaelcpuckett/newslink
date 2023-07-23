import * as React from 'react';
import * as AP from  '@activity-kit/types';

import PageChrome from '../components/PageChrome';

export default ({ entity, user }: { entity: AP.Follow, user: AP.Actor | null }) => (
  <PageChrome title="Follow Entity" user={user}>
    <h1>
      Follow Entity
    </h1>
    <textarea defaultValue={JSON.stringify(entity, null, 2)} />
  </PageChrome>
);
