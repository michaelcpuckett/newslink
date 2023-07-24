import * as React from 'react';
import * as AP from  '@activity-kit/types';

import '../../utils/globals';

export default ({ object }: { object: AP.Note; }) => {
  return (
    <tl-feed--note>
      <template shadowrootmode="open">
        <link rel="stylesheet" href="/styles/global.css" />
        <link rel="stylesheet" href="/styles/components/FeedObject.css" />
        <link rel="stylesheet" href="/styles/components/CreateNoteFeedObject.css" />
        <header>
          {object.summary}
        </header>
        <dl>
          <dt>
            Published
          </dt>
          <dd>
            <time dateTime={object.published.toISOString()}>
              {object.published.toLocaleString()}
            </time>
          </dd>
        </dl>
        <p>{object.content}</p>
      </template>
    </tl-feed--note>
  )
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ["tl-feed--note"]: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}