import GenericForm from './GenericForm';

export default class EditProfileForm extends GenericForm {
  private displayNameElement: HTMLInputElement;
  private bioElement: HTMLTextAreaElement;
  private boundSubmitHandler: (event: SubmitEvent) => void =
    this.handleSubmit.bind(this);

  constructor() {
    super();

    this.displayNameElement =
      this.shadowRoot.querySelector<HTMLInputElement>('input[name="name"]');
    this.bioElement = this.shadowRoot.querySelector<HTMLTextAreaElement>(
      'textarea[name="summary"]',
    );

    if (!this.displayNameElement || !this.bioElement) {
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

    const { value: name } = this.displayNameElement;
    const { value: summary } = this.bioElement;

    window
      .fetch('/edit-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          body: JSON.stringify({ name, summary }),
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

customElements.define('tl-edit-profile-form', EditProfileForm);
