import * as React from 'react';
import '../utils/globals';
import * as AP from '@activity-kit/types';
import {isType, assertIsApActivity, assertIsApActor, assertIsApEntity } from '@activity-kit/type-utilities';
import CreateNoteFeedObject from './CreateNoteFeedObject';
import CreatePersonFeedObject from './CreatePersonFeedObject';
import {getEntity} from '@activity-kit/utilities';

export default ({ activity }: { activity: AP.CoreObject }) => {
  assertIsApActivity(activity);

  const object = getEntity(activity.object);

  assertIsApEntity(object);

  const actor = getEntity(activity.actor);

  assertIsApActor(actor);

  let objectHtml: JSX.Element = (
    <p>
      {`The object type "${object.type}" is not supported.`}
    </p>
  );

  if (isType<AP.Note>(object, AP.ExtendedObjectTypes.NOTE)) {
    objectHtml = <CreateNoteFeedObject object={object} />
  }

  if (isType<AP.Person>(object, AP.ActorTypes.PERSON)) {
    objectHtml = <CreatePersonFeedObject object={object} />
  }

  return (
    <tl-create-feed-object role="article">
      <template shadowrootmode="open">
        <link rel="stylesheet" href="/styles/global.css" />
        <link rel="stylesheet" href="/styles/components/FeedObject.css" />
        <link rel="stylesheet" href="/styles/components/CreateFeedObject.css" />
        <header>
          New {activity.type} Activity by @{actor.preferredUsername} on {activity.published.toLocaleString()}
        </header>
        {objectHtml}
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