import * as React from 'react';
import * as AP from  '@activity-kit/types';
import '../../utils/globals';

export default ({ user }: { user: AP.Actor | null }) => (
  <tl-header>
    <template shadowrootmode="open">
      <link rel="stylesheet" href="/styles/global.css" />
      <link rel="stylesheet" href="/styles/buttons.css" />
      <link rel="stylesheet" href="/styles/components/Header.css" />
      <header>
        <button
          className="menu-toggle-button"
          type="button">
          Menu
        </button>
        <span>
          Welcome 2 Activityland
        </span>
      </header>
    </template>
  </tl-header>
);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ["tl-header"]: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}