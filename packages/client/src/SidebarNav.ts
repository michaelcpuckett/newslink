export default class SidebarNav extends HTMLElement {
  private dialogElement: HTMLDialogElement;
  private closeButtonElement: HTMLButtonElement;

  private boundDialogClickHandler = this.handleDialogClick.bind(this);
  private boundDialogClosedHandler = this.handleDialogClosed.bind(this);
  private boundToggleMenuHandler = this.handleToggleMenu.bind(this);
  private boundCloseButtonClickHandler = this.handleCloseButtonClick.bind(this);
  private boundMediaQueryChangeHandler = this.handleMediaQueryChange.bind(this);

  private mediaQuery = window.matchMedia('(min-width: 1648px)');

  static get observedAttributes() {
    return ['is-open'];
  }

  private get isOpen() {
    return this.hasAttribute('is-open');
  }

  constructor() {
    super();

    if (!this.shadowRoot) {
      throw new Error(
        'This component must be initialized via declarative shadow DOM.',
      );
    }

    this.dialogElement =
      this.shadowRoot.querySelector<HTMLDialogElement>('dialog');

    this.closeButtonElement =
      this.shadowRoot.querySelector<HTMLButtonElement>('.close-button');

    if (!this.closeButtonElement || !this.dialogElement) {
      throw new Error('Could not find required elements.');
    }

    this.initializeEventListeners();
    this.handleMediaQueryChange();
  }

  private initializeEventListeners() {
    window.document.documentElement.addEventListener(
      'tl-header:toggle-menu',
      this.boundToggleMenuHandler,
    );

    this.closeButtonElement.addEventListener(
      'click',
      this.boundCloseButtonClickHandler,
    );

    this.dialogElement.addEventListener('click', this.boundDialogClickHandler);
    this.dialogElement.addEventListener('close', this.boundDialogClosedHandler);

    this.mediaQuery.addEventListener(
      'change',
      this.boundMediaQueryChangeHandler,
    );
  }

  private handleToggleMenu() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  private handleDialogClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  private handleCloseButtonClick() {
    this.close();
  }

  private handleDialogClosed() {
    this.removeAttribute('is-open');
  }

  private open() {
    if (this.dialogElement.open) {
      this.dialogElement.close();
    }

    if (this.mediaQuery.matches) {
      this.dialogElement.show();
    } else {
      this.dialogElement.showModal();
    }
  }

  private close() {
    if (!this.mediaQuery.matches) {
      this.dialogElement.close();
    }
  }

  private handleMediaQueryChange() {
    if (this.mediaQuery.matches) {
      this.open();
    } else {
      this.close();
    }
  }
}

customElements.define('tl-sidebar-nav', SidebarNav);
