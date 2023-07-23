import * as React from 'react';
import * as AP from  '@activity-kit/types';
import { guard } from '@activity-kit/type-utilities';
import { getArray } from '@activity-kit/utilities';

import CreateActivity from './CreateActivity';
import FollowActivity from './FollowActivity';
import '../../utils/globals';

/*const isLinkType = (item: AP.Entity): item is AP.Link => {
  const types = getArray(item.type);

  return types.includes('Link') || types.includes('Mention');
};

if (isLinkType(object)) {
  throw new Error(`Received a Link instead of an Object.`);
}*/

export default ({ object }: { object: AP.Activity }) => {
  let objectHtml: JSX.Element | null = null;

  if (guard.isType<AP.Create>(object, AP.ActivityTypes.CREATE)) {
    objectHtml = <CreateActivity activity={object} />;
  }

  if (guard.isType<AP.Follow>(object, AP.ActivityTypes.FOLLOW)) {
    objectHtml = <FollowActivity activity={object} />;
  }

  return (
    <tl-activity>
      <template shadowrootmode="open">
        <link rel="stylesheet" href="/styles/global.css" />
        {objectHtml}
      </template>
    </tl-activity>
  )
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ["tl-activity"]: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}