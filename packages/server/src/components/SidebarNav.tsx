import * as React from 'react';
import '../utils/globals';

export default () => (
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
              <a href="#">
                Home
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