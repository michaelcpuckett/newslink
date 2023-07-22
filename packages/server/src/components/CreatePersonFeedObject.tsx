import * as React from 'react';
import '../utils/globals';
import * as AP from  '@activity-kit/types';

export default ({ object }: { object: AP.Person; }) => {
  return (
    <tl-create-person-feed-object role="article">
      <template shadowrootmode="open">
        <link rel="stylesheet" href="/styles/global.css" />
        <link rel="stylesheet" href="/styles/components/FeedObject.css" />
        <link rel="stylesheet" href="/styles/components/CreatePersonFeedObject.css" />
        <header>
          @{object.preferredUsername}
        </header>
        <dl>
          <dt>
            Name
          </dt>
          <dd>
            {object.name}
          </dd>

          <dt>
            Created
          </dt>
          <dd>
            <time dateTime={object.published.toISOString()}>
              {object.published.toLocaleString()}
            </time>
          </dd>
        </dl>
        <p>{object.summary}</p>
      </template>
    </tl-create-person-feed-object>
  )
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ["tl-create-person-feed-object"]: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}