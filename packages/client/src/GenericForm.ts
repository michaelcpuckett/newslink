export default class GenericForm extends HTMLElement {
  protected formElement: HTMLFormElement;
  protected inputElements: HTMLInputElement[];
  protected textareaElements: HTMLTextAreaElement[];

  protected boundInvalidHandler: (event: Event) => void =
    this.handleInvalid.bind(this);

  protected boundInputHandler: (event: InputEvent) => void =
    this.handleInput.bind(this);

  constructor() {
    super();

    if (!this.shadowRoot) {
      throw new Error(
        'This component must be initialized via declarative shadow DOM.',
      );
    }

    this.formElement = this.shadowRoot.querySelector<HTMLFormElement>('form');

    if (!this.formElement) {
      throw new Error('Could not find required elements.');
    }

    this.inputElements = Array.from(
      this.shadowRoot.querySelectorAll<HTMLInputElement>('input'),
    );

    this.textareaElements = Array.from(
      this.shadowRoot.querySelectorAll<HTMLTextAreaElement>('textarea'),
    );

    this.initializeEventListeners();
  }

  protected get elements() {
    return [...this.inputElements, ...this.textareaElements];
  }

  protected initializeEventListeners() {
    for (const element of this.elements) {
      element.addEventListener('invalid', this.boundInvalidHandler);
      element.addEventListener('input', this.boundInputHandler);
    }
  }

  protected handleInvalid(event: Event) {
    event.preventDefault();

    const { currentTarget: element } = event;

    if (
      !(element instanceof HTMLInputElement) &&
      !(element instanceof HTMLTextAreaElement)
    ) {
      return;
    }

    const parentLabel = element.closest('label');

    if (!(parentLabel instanceof HTMLLabelElement)) {
      return;
    }

    element.setAttribute('aria-invalid', 'true');
    parentLabel.classList.add('is-invalid');
    parentLabel.querySelector('.error-message').textContent =
      element.validationMessage;
  }

  protected handleInput(event: InputEvent) {
    const { currentTarget: element } = event;

    if (
      !(element instanceof HTMLInputElement) &&
      !(element instanceof HTMLTextAreaElement)
    ) {
      return;
    }

    const parentLabel = element.closest('label');

    if (!(parentLabel instanceof HTMLLabelElement)) {
      return;
    }

    element.setAttribute('aria-invalid', 'false');
    parentLabel.classList.remove('is-invalid');
    parentLabel.querySelector('.error-message').textContent = '';
  }
}
