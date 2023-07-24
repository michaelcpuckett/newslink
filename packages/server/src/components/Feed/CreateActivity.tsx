import * as React from 'react';
import * as AP from '@activity-kit/types';
import { guard, assert } from '@activity-kit/type-utilities';
import {getEntity} from '@activity-kit/utilities';

import CreateNote from './Note';
import CreatePerson from './Person';
import '../../utils/globals';

export default ({ activity }: { activity: AP.Create }) => {
  const object = getEntity(activity.object);

  assert.isApEntity(object);

  const actor = getEntity(activity.actor);

  assert.isApActor(actor);

  let objectHtml: JSX.Element = (
    <p>
      {`The object type "${object.type}" is not supported.`}
    </p>
  );

  if (guard.isType<AP.Note>(object, AP.ExtendedObjectTypes.NOTE)) {
    objectHtml = <CreateNote object={object} />
  }

  if (guard.isType<AP.Person>(object, AP.ActorTypes.PERSON)) {
    objectHtml = <CreatePerson object={object} />
  }

  return (
    <tl-feed--create-activity role="article">
      <template shadowrootmode="open">
        <link rel="stylesheet" href="/styles/global.css" />
        <link rel="stylesheet" href="/styles/components/FeedObject.css" />
        <link rel="stylesheet" href="/styles/components/CreateFeedObject.css" />
        <header>
          New {activity.type} Activity by @{actor.preferredUsername} on {activity.published.toLocaleString()}
        </header>
        {objectHtml}
      </template>
    </tl-feed--create-activity>
  )
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ["tl-feed--create-activity"]: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}