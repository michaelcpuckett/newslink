export default class GenericForm extends HTMLElement {
  protected formElement: HTMLFormElement;
  protected inputElements: HTMLInputElement[];
  protected textareaElements: HTMLTextAreaElement[];
  protected selectElements: HTMLSelectElement[];
  protected formActionUrl: URL | null = null;

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

    this.formActionUrl = this.formElement.action
      ? new URL(this.formElement.action)
      : null;

    this.inputElements = Array.from(
      this.formElement.querySelectorAll<HTMLInputElement>('input'),
    );

    this.textareaElements = Array.from(
      this.formElement.querySelectorAll<HTMLTextAreaElement>('textarea'),
    );

    this.selectElements = Array.from(
      this.formElement.querySelectorAll<HTMLSelectElement>('select'),
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
