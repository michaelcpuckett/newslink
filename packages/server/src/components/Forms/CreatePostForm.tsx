import * as React from 'react';
import * as AP from  '@activity-kit/types';
import { getId } from '@activity-kit/utilities';
import '../../utils/globals';

export default ({ user }: { user: AP.Actor }) => (
  <tl-create-post-form>
    <template shadowrootmode="open">
      <link rel="stylesheet" href="/styles/global.css" />
      <link rel="stylesheet" href="/styles/forms.css" />
      <link rel="stylesheet" href="/styles/buttons.css" />
      <link rel="stylesheet" href="/styles/components/CreatePostForm.css" />
      <form
        action={getId(user.outbox).href}
        noValidate>
        <select name="type">
          {Object.values(AP.ExtendedObjectTypes).map((type) => (
            <option value={type} selected={type === AP.ExtendedObjectTypes.NOTE}>
              {type}
            </option>
          ))}
        </select>
        <label>
          <span className="label-text">
            Body Content
          </span>
          <textarea
            name="content"
            required>
          </textarea>
          <span className="error-message"></span>
        </label>
        <button
          type="submit">
          Submit
        </button>
      </form>
    </template>
  </tl-create-post-form>
);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ["tl-create-post-form"]: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}