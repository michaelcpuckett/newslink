import * as React from 'react';
import * as AP from  '@activity-kit/types';
import { getId } from '@activity-kit/utilities';

import Entity from './Entity';
import '../../utils/globals';

export default ({ collectionPage: page }: { collectionPage: AP.EitherCollectionPage }) => {
  const unorderedItems = page.items ? (Array.isArray(page.items) ? page.items : [page.items]) : [];
  const orderedItems = page.orderedItems ? (Array.isArray(page.orderedItems) ? page.orderedItems : [page.orderedItems ]) : [];
  const items = orderedItems.length ? orderedItems : unorderedItems;

  return (
    <tl-feed role="feed">
      <template shadowrootmode="open">
        <link rel="stylesheet" href="/styles/global.css" />
        <link rel="stylesheet" href="/styles/components/CollectionFeed.css" />
        {items.map((item) => {
          if (typeof item === 'string' || item instanceof URL) {
            throw new Error(`Received the Entity's ID instead of the Entity.`);
          }
          
          return (
            <Entity
              key={getId(item).href}
              object={item}
            />
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