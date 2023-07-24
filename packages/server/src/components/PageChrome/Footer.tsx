import * as React from 'react';
import * as AP from  '@activity-kit/types';
import '../../utils/globals';

export default ({ user }: { user: AP.Actor | null }) => (
  <tl-footer>
    <template shadowrootmode="open">
      <link rel="stylesheet" href="/styles/global.css" />
      <link rel="stylesheet" href="/styles/components/Footer.css" />
    </template>
  </tl-footer>
);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ["tl-footer"]: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}