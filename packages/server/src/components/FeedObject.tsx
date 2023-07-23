import * as React from 'react';
import '../utils/globals';
import * as AP from  '@activity-kit/types';
import { isType } from '@activity-kit/type-utilities';
import CreateFeedObject from './CreateFeedObject';
import FollowFeedObject from './FollowFeedObject';

export default ({ object }: { object: AP.CoreObject }) => {
  let objectHtml: JSX.Element | null = null;

  if (isType<AP.Create>(object, AP.ActivityTypes.CREATE)) {
    objectHtml = <CreateFeedObject activity={object} />;
  }

  if (isType<AP.Follow>(object, AP.ActivityTypes.FOLLOW)) {
    objectHtml = <FollowFeedObject activity={object} />;
  }

  return (
    <tl-feed-object role="article">
      <template shadowrootmode="open">
        <link rel="stylesheet" href="/styles/global.css" />
        {objectHtml}
      </template>
    </tl-feed-object>
  )
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ["tl-feed-object"]: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}