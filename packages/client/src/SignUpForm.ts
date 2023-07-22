import GenericForm from './GenericForm';

export default class LoginForm extends GenericForm {
  private typeElement: HTMLSelectElement;
  private nameElement: HTMLInputElement;
  private emailElement: HTMLInputElement;
  private usernameElement: HTMLInputElement;
  private passwordElement: HTMLInputElement;
  private repeatPasswordElement: HTMLInputElement;

  private boundSubmitHandler: (event: SubmitEvent) => void =
    this.handleSubmit.bind(this);

  constructor() {
    super();

    this.typeElement = this.selectElements.find((selectElement) =>
      selectElement.matches('[name="type"]'),
    );

    this.emailElement = this.inputElements.find((inputElement) =>
      inputElement.matches('[name="email"]'),
    );

    this.usernameElement = this.inputElements.find((inputElement) =>
      inputElement.matches('[name="username"]'),
    );

    this.passwordElement = this.inputElements.find((inputElement) =>
      inputElement.matches('[name="password"]'),
    );

    this.repeatPasswordElement = this.inputElements.find((inputElement) =>
      inputElement.matches('[name="repeat-password"]'),
    );

    if (
      !this.typeElement ||
      !this.nameElement ||
      !this.emailElement ||
      !this.usernameElement ||
      !this.passwordElement ||
      !this.repeatPasswordElement
    ) {
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

    const { value: type } = this.typeElement;
    const { value: name } = this.nameElement;
    const { value: email } = this.emailElement;
    const { value: username } = this.usernameElement;
    const { value: password } = this.passwordElement;
    const { value: repeatPassword } = this.repeatPasswordElement;

    if (password !== repeatPassword) {
      this.repeatPasswordElement.setCustomValidity('Passwords do not match.');
      this.repeatPasswordElement.reportValidity();
      return;
    }

    window
      .fetch('/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/activity+json',
        },
        body: JSON.stringify({
          type,
          name,
          preferredUsername: username,
          email,
          password,
        }),
      })
      .then((response) => response.json())
      .then((result) => {
        if (result.error) {
          throw new Error(result.error);
        }

        window.document.cookie = `__session=${result.token}; path=/`;
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        // this.usernameElement.setCustomValidity('Password incorrect.');
      });
  }
}

customElements.define('tl-sign-up-form', LoginForm);
