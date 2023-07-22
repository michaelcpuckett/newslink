import GenericForm from './GenericForm';

export default class CreatePostForm extends GenericForm {
  private typeElement: HTMLSelectElement;
  private contentElement: HTMLTextAreaElement;

  private boundSubmitHandler: (event: SubmitEvent) => void =
    this.handleSubmit.bind(this);

  constructor() {
    super();

    if (!this.formActionUrl) {
      throw new Error('Could not find form action.');
    }

    const typeElement = this.selectElements.find((selectElement) =>
      selectElement.matches('[name="type"]'),
    );

    const contentElement = this.textareaElements.find((textareaElement) =>
      textareaElement.matches('[name="content"]'),
    );

    if (!typeElement || !contentElement) {
      throw new Error('Could not find required elements.');
    }

    this.typeElement = typeElement;
    this.contentElement = contentElement;

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
    const { value: content } = this.contentElement;

    window
      .fetch(this.formActionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/activity+json',
        },
        body: JSON.stringify({
          '@context': 'https://www.w3.org/ns/activitystreams',
          type,
          content,
        }),
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

customElements.define('tl-create-post-form', CreatePostForm);
