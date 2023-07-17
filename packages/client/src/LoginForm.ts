import GenericForm from './GenericForm';

export default class LoginForm extends GenericForm {
  private usernameElement: HTMLInputElement;
  private passwordElement: HTMLInputElement;

  private boundSubmitHandler: (event: SubmitEvent) => void =
    this.handleSubmit.bind(this);

  constructor() {
    super();

    this.usernameElement = this.shadowRoot.querySelector<HTMLInputElement>(
      'input[name="username"]',
    );
    this.passwordElement = this.shadowRoot.querySelector<HTMLInputElement>(
      'input[name="password"]',
    );

    if (!this.usernameElement || !this.passwordElement) {
      throw new Error('Could not find required elements.');
    }

    this.initializeEventListeners();
  }

  initializeEventListeners() {
    super.initializeEventListeners();
    this.formElement.addEventListener('submit', this.boundSubmitHandler);
  }

  private handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    if (!this.formElement.checkValidity()) {
      return;
    }

    const { value: username } = this.usernameElement;
    const { value: password } = this.passwordElement;

    window
      .fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          body: JSON.stringify({ username, password }),
        },
      })
      .then((response) => response.json())
      .then((result) => {
        console.log('Success:', result);
      })
      .catch((error) => {
        console.error(error);
        // this.usernameElement.setCustomValidity('Password incorrect.');
      });
  }
}

customElements.define('tl-login-form', LoginForm);
