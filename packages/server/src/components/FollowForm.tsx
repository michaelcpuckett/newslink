import * as React from 'react';
import '../utils/globals';
import { getId } from '@activity-kit/utilities';
import * as AP from  '@activity-kit/types';

export default ({ follower, followee }: { follower: AP.Actor, followee: AP.Actor }) => (
  <tl-follow-form>
    <template shadowrootmode="open">
      <link rel="stylesheet" href="/styles/global.css" />
      <link rel="stylesheet" href="/styles/forms.css" />
      <link rel="stylesheet" href="/styles/buttons.css" />
      <link rel="stylesheet" href="/styles/components/FollowForm.css" />
      <form
        action={getId(follower.outbox).href}
        noValidate>
        <input
          type="hidden"
          name="followee"
          value={getId(followee).href}
        />
        <input
          type="hidden"
          name="follower"
          value={getId(follower).href}
        />
        <input
          type="hidden"
          name="followers"
          value={getId(follower.followers).href}
        />
        <button
          type="submit">
          Follow
        </button>
      </form>
    </template>
  </tl-follow-form>
);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ["tl-follow-form"]: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}