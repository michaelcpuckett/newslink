export default class Header extends HTMLElement {
  private menuToggleButtonElement: HTMLButtonElement;
  private boundMenuToggleHandler: (event: MouseEvent) => void =
    this.handleMenuToggle.bind(this);

  constructor() {
    super();

    if (!this.shadowRoot) {
      throw new Error(
        'This component must be initialized via declarative shadow DOM.',
      );
    }

    this.menuToggleButtonElement =
      this.shadowRoot.querySelector<HTMLButtonElement>('.menu-toggle-button');

    if (!this.menuToggleButtonElement) {
      throw new Error('Could not find required elements.');
    }

    this.initializeEventListeners();
  }

  initializeEventListeners() {
    this.menuToggleButtonElement.addEventListener(
      'click',
      this.boundMenuToggleHandler,
    );
  }

  handleMenuToggle(event: MouseEvent) {
    event.preventDefault();
    window.document.documentElement.dispatchEvent(
      new CustomEvent('tl-header:toggle-menu'),
    );
  }
}

customElements.define('tl-header', Header);
