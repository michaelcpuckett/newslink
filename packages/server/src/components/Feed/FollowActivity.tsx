import * as React from 'react';
import '../../utils/globals';
import * as AP from '@activity-kit/types';
import { assert } from '@activity-kit/type-utilities';
import {getEntity, getId} from '@activity-kit/utilities';

export default ({ activity }: { activity: AP.Follow }) => {
  const object = getEntity(activity.object);

  assert.isApActor(object);

  const actor = getEntity(activity.actor);

  assert.isApActor(actor);

  return (
    <tl-create-feed-object role="article">
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
    </tl-create-feed-object>
  )
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ["tl-create-feed-object"]: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}