import * as React from 'react';
import * as AP from  '@activity-kit/types';
import { guard } from '@activity-kit/type-utilities';

import Activity from './Activity';
import '../../utils/globals';

export default ({ object }: { object: AP.Entity }) => {
  let objectHtml = (
    <p>
      {`The object type "${object.type}" is not supported.`}
    </p>
  );

  if (guard.isApActivity(object)) {
    objectHtml = <Activity object={object} />;
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