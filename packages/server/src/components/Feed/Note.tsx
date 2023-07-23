import * as React from 'react';
import '../../utils/globals';
import * as AP from  '@activity-kit/types';

export default ({ object }: { object: AP.Note; }) => {
  return (
    <tl-create-note role="article">
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
    </tl-create-note>
  )
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ["tl-create-note"]: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}