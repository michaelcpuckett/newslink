import * as React from 'react';
import * as AP from  '@activity-kit/types';
import { getId } from '@activity-kit/utilities';

import PageChrome from '../components/PageChrome';

export default ({ entity, user }: { entity: AP.OrderedCollection, user: AP.Actor | null }) => (
  <PageChrome
    title={entity.name ?? 'Outbox'}
    user={user}>
    <h1>
      {entity.name}
    </h1>
    <ul>
      <li>
        <a href={getId(entity.first)?.href}>
          First Page
        </a>
      </li>
    </ul>
  </PageChrome>
);