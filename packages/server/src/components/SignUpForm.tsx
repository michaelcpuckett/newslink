import * as React from 'react';
import '../utils/globals';

export default () => (
  <tl-sign-up-form>
    <template shadowrootmode="open">
      <link rel="stylesheet" href="/styles/global.css" />
      <link rel="stylesheet" href="/styles/forms.css" />
      <link rel="stylesheet" href="/styles/buttons.css" />
      <link rel="stylesheet" href="/styles/components/SignUpForm.css" />
      <form noValidate>
        <label>
          <span className="label-text">
            Username
          </span>
          <input
            type="text"
            name="username"
            required
          />
          <span className="error-message"></span>
        </label>
        <label>
          <span className="label-text">
            Password
          </span>
          <input
            type="password"
            name="password"
            required
          />
          <span className="error-message"></span>
        </label>      
        <label>
          <span className="label-text">
            Repeat Password
          </span>
          <input
            type="password"
            name="repeat-password"
            required
          />
          <span className="error-message"></span>
        </label>
        <button
          type="submit">
          Submit
        </button>
      </form>
    </template>
  </tl-sign-up-form>
);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ["tl-sign-up-form"]: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}