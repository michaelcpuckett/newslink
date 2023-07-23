import * as React from 'react';
import '../utils/globals';
import * as AP from  '@activity-kit/types';
import FeedObject from './FeedObject';

export default ({ collectionPage: page }: { collectionPage: AP.EitherCollectionPage }) => {
  const unorderedItems = page.items ? (Array.isArray(page.items) ? page.items : [page.items]) : [];
  const orderedItems = page.orderedItems ? (Array.isArray(page.orderedItems) ? page.orderedItems : [page.orderedItems ]) : [];
  const items = orderedItems.length ? orderedItems : unorderedItems;

  const castIsLinkType = (item: AP.Entity): item is AP.Link => {
    const types = Array.isArray(item.type) ? item.type : [item.type];

    return types.includes('Link') || types.includes('Mention');
  };

  return (
    <tl-feed role="feed">
      <template shadowrootmode="open">
        <link rel="stylesheet" href="/styles/global.css" />
        <link rel="stylesheet" href="/styles/components/CollectionFeed.css" />
        {items.map((item) => {
          if (typeof item === 'string' || item instanceof URL) {
            throw new Error(`Received the Object's ID instead of the Object.`);
          }

          if (castIsLinkType(item)) {
            throw new Error(`Received a Link instead of an Object.`);
          }

          return (
            <FeedObject key={item.id.href} object={item} />
          );
        })}
      </template>
    </tl-feed>
  );
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ["tl-feed"]: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}