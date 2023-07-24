import * as React from 'react';
import * as AP from '@activity-kit/types';
import { assert } from '@activity-kit/type-utilities';
import {getEntity, getId} from '@activity-kit/utilities';

import '../../utils/globals';

export default ({ activity }: { activity: AP.Follow }) => {
  const object = getEntity(activity.object);

  assert.isApActor(object);

  const actor = getEntity(activity.actor);

  assert.isApActor(actor);

  return (
    <tl-feed--follow-activity role="article">
      <template shadowrootmode="open">
        <link rel="stylesheet" href="/styles/global.css" />
        <link rel="stylesheet" href="/styles/components/FeedObject.css" />
        <link rel="stylesheet" href="/styles/components/CreateFeedObject.css" />
        <header>
          New {activity.type} Activity by @{actor.preferredUsername} on
          <a href={getId(activity).href}>
            {activity.published.toLocaleString()}
          </a>
        </header>
        To:
        <a href={getId(object).href}>
          @{object.preferredUsername}
        </a>
      </template>
    </tl-feed--follow-activity>
  );
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ["tl-feed--follow-activity"]: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}