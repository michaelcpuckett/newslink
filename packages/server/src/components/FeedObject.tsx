import * as React from 'react';
import '../utils/globals';
import * as AP from  '@activity-kit/types';
import CreateFeedObject from './CreateFeedObject';

export default ({ object }: { object: AP.CoreObject }) => {
  const [ primaryType ] = Array.isArray(object.type) ? object.type : [object.type];

  return (
    <tl-feed-object role="article">
      <template shadowrootmode="open">
        <link rel="stylesheet" href="/styles/global.css" />
        {primaryType === AP.ActivityTypes.CREATE ? (
          <CreateFeedObject activity={object} />
        ) : null}
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