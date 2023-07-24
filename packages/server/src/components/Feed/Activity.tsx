import * as React from 'react';
import * as AP from  '@activity-kit/types';
import { guard } from '@activity-kit/type-utilities';

import CreateActivity from './CreateActivity';
import FollowActivity from './FollowActivity';
import '../../utils/globals';

export default ({ object }: { object: AP.Activity }) => {
  let objectHtml: JSX.Element | null = null;

  if (guard.isType<AP.Create>(object, AP.ActivityTypes.CREATE)) {
    objectHtml = <CreateActivity activity={object} />;
  }

  if (guard.isType<AP.Follow>(object, AP.ActivityTypes.FOLLOW)) {
    objectHtml = <FollowActivity activity={object} />;
  }

  return (
    <tl-feed--activity>
      <template shadowrootmode="open">
        <link rel="stylesheet" href="/styles/global.css" />
        {objectHtml}
      </template>
    </tl-feed--activity>
  )
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ["tl-feed--activity"]: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}