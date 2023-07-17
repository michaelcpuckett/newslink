import * as React from 'react';
import '../utils/globals';

export default () => (
  <tl-edit-profile-form>
    <template shadowrootmode="open">
      <link rel="stylesheet" href="/styles/global.css" />
      <link rel="stylesheet" href="/styles/forms.css" />
      <link rel="stylesheet" href="/styles/buttons.css" />
      <link rel="stylesheet" href="/styles/components/EditProfileForm.css" />
      <form noValidate>
        <label>
          <span className="label-text">
            Display Name
          </span>
          <input
            type="text"
            name="name"
            required
          />
          <span className="error-message"></span>
        </label>
        <label>
          <span className="label-text">
            Bio
          </span>
          <textarea
            name="summary"
            required></textarea>
          <span className="error-message"></span>
        </label>
        <button
          type="submit">
          Submit
        </button>
      </form>
    </template>
  </tl-edit-profile-form>
);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ["tl-edit-profile-form"]: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}