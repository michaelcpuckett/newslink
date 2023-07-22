import * as React from 'react';
import * as AP from  '@activity-kit/types';
import { getId } from '@activity-kit/utilities';
import '../utils/globals';

export default ({ user }: { user: AP.Actor | null }) => (
  <tl-sidebar-nav>
    <template shadowrootmode="open">
      <link rel="stylesheet" href="/styles/global.css" />
      <link rel="stylesheet" href="/styles/forms.css" />
      <link rel="stylesheet" href="/styles/buttons.css" />
      <link rel="stylesheet" href="/styles/components/SidebarNav.css" />
      <dialog>
        <div className="container">
          <button
            className="close-button"
            type="button">
            Close Menu
          </button>
          <ul>
            <li>
              <a href="/">
                Home
              </a>
            </li>
            {user ? (
              <li>
                <a href={getId(user.url).href}>
                  Your Profile
                </a>
              </li>
            ) : null}
            <li>
              <a href="/inbox">
                Inbox
              </a>
            </li>
          </ul>
        </div>
      </dialog>
    </template>
  </tl-sidebar-nav>
);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ["tl-sidebar-nav"]: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}