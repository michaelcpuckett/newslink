class $3b781047587d482c$export$2e2bcd8739ae039 extends HTMLElement {
    constructor(){
        super();
        this.boundMenuToggleHandler = this.handleMenuToggle.bind(this);
        if (!this.shadowRoot) throw new Error("This component must be initialized via declarative shadow DOM.");
        this.menuToggleButtonElement = this.shadowRoot.querySelector(".menu-toggle-button");
        if (!this.menuToggleButtonElement) throw new Error("Could not find required elements.");
        this.initializeEventListeners();
    }
    initializeEventListeners() {
        this.menuToggleButtonElement.addEventListener("click", this.boundMenuToggleHandler);
    }
    handleMenuToggle(event) {
        event.preventDefault();
        window.document.documentElement.dispatchEvent(new CustomEvent("tl-header:toggle-menu"));
    }
}
customElements.define("tl-header", $3b781047587d482c$export$2e2bcd8739ae039);


class $f57968d51bc87082$export$2e2bcd8739ae039 extends HTMLElement {
    static get observedAttributes() {
        return [
            "is-open"
        ];
    }
    get isOpen() {
        return this.hasAttribute("is-open");
    }
    constructor(){
        super();
        this.boundDialogClickHandler = this.handleDialogClick.bind(this);
        this.boundDialogClosedHandler = this.handleDialogClosed.bind(this);
        this.boundToggleMenuHandler = this.handleToggleMenu.bind(this);
        this.boundCloseButtonClickHandler = this.handleCloseButtonClick.bind(this);
        if (!this.shadowRoot) throw new Error("This component must be initialized via declarative shadow DOM.");
        this.dialogElement = this.shadowRoot.querySelector("dialog");
        this.closeButtonElement = this.shadowRoot.querySelector(".close-button");
        if (!this.closeButtonElement || !this.dialogElement) throw new Error("Could not find required elements.");
        this.initializeEventListeners();
    }
    initializeEventListeners() {
        window.document.documentElement.addEventListener("tl-header:toggle-menu", this.boundToggleMenuHandler);
        this.closeButtonElement.addEventListener("click", this.boundCloseButtonClickHandler);
        this.dialogElement.addEventListener("click", this.boundDialogClickHandler);
        this.dialogElement.addEventListener("close", this.boundDialogClosedHandler);
    }
    handleToggleMenu() {
        if (this.isOpen) this.close();
        else this.open();
    }
    handleDialogClick(event) {
        if (event.target === event.currentTarget) this.close();
    }
    handleCloseButtonClick() {
        this.close();
    }
    handleDialogClosed() {
        this.removeAttribute("is-open");
    }
    open() {
        this.dialogElement.showModal();
    }
    close() {
        this.dialogElement.close();
    }
}
customElements.define("tl-sidebar-nav", $f57968d51bc87082$export$2e2bcd8739ae039);


class $1edf991ac1d79f91$export$2e2bcd8739ae039 extends HTMLElement {
    constructor(){
        super();
        this.boundInvalidHandler = this.handleInvalid.bind(this);
        this.boundInputHandler = this.handleInput.bind(this);
        if (!this.shadowRoot) throw new Error("This component must be initialized via declarative shadow DOM.");
        this.formElement = this.shadowRoot.querySelector("form");
        if (!this.formElement) throw new Error("Could not find required elements.");
        this.inputElements = Array.from(this.shadowRoot.querySelectorAll("input"));
        this.textareaElements = Array.from(this.shadowRoot.querySelectorAll("textarea"));
        this.initializeEventListeners();
    }
    get elements() {
        return [
            ...this.inputElements,
            ...this.textareaElements
        ];
    }
    initializeEventListeners() {
        for (const element of this.elements){
            element.addEventListener("invalid", this.boundInvalidHandler);
            element.addEventListener("input", this.boundInputHandler);
        }
    }
    handleInvalid(event) {
        event.preventDefault();
        const { currentTarget: element } = event;
        if (!(element instanceof HTMLInputElement) && !(element instanceof HTMLTextAreaElement)) return;
        const parentLabel = element.closest("label");
        if (!(parentLabel instanceof HTMLLabelElement)) return;
        element.setAttribute("aria-invalid", "true");
        parentLabel.classList.add("is-invalid");
        parentLabel.querySelector(".error-message").textContent = element.validationMessage;
    }
    handleInput(event) {
        const { currentTarget: element } = event;
        if (!(element instanceof HTMLInputElement) && !(element instanceof HTMLTextAreaElement)) return;
        const parentLabel = element.closest("label");
        if (!(parentLabel instanceof HTMLLabelElement)) return;
        element.setAttribute("aria-invalid", "false");
        parentLabel.classList.remove("is-invalid");
        parentLabel.querySelector(".error-message").textContent = "";
    }
}


class $24710c93e9952d81$export$2e2bcd8739ae039 extends (0, $1edf991ac1d79f91$export$2e2bcd8739ae039) {
    constructor(){
        super();
        this.boundSubmitHandler = this.handleSubmit.bind(this);
        this.usernameElement = this.shadowRoot.querySelector('input[name="username"]');
        this.passwordElement = this.shadowRoot.querySelector('input[name="password"]');
        if (!this.usernameElement || !this.passwordElement) throw new Error("Could not find required elements.");
        this.initializeEventListeners();
    }
    initializeEventListeners() {
        super.initializeEventListeners();
        this.formElement.addEventListener("submit", this.boundSubmitHandler);
    }
    handleSubmit(event) {
        event.preventDefault();
        if (!this.formElement.checkValidity()) return;
        const { value: username } = this.usernameElement;
        const { value: password } = this.passwordElement;
        window.fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            }
        }).then((response)=>response.json()).then((result)=>{
            console.log("Success:", result);
        }).catch((error)=>{
            console.error(error);
        // this.usernameElement.setCustomValidity('Password incorrect.');
        });
    }
}
customElements.define("tl-login-form", $24710c93e9952d81$export$2e2bcd8739ae039);



class $1b224b5925e00ab9$export$2e2bcd8739ae039 extends (0, $1edf991ac1d79f91$export$2e2bcd8739ae039) {
    constructor(){
        super();
        this.boundSubmitHandler = this.handleSubmit.bind(this);
        this.usernameElement = this.shadowRoot.querySelector('input[name="username"]');
        this.passwordElement = this.shadowRoot.querySelector('input[name="password"]');
        if (!this.usernameElement || !this.passwordElement) throw new Error("Could not find required elements.");
        this.initializeEventListeners();
    }
    initializeEventListeners() {
        super.initializeEventListeners();
        this.formElement.addEventListener("submit", this.boundSubmitHandler);
    }
    handleSubmit(event) {
        event.preventDefault();
        if (!this.formElement.checkValidity()) return;
        const { value: username } = this.usernameElement;
        const { value: password } = this.passwordElement;
        window.fetch("/sign-up", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            }
        }).then((response)=>response.json()).then((result)=>{
            console.log("Success:", result);
        }).catch((error)=>{
            console.error(error);
        // this.usernameElement.setCustomValidity('Password incorrect.');
        });
    }
}
customElements.define("tl-sign-up-form", $1b224b5925e00ab9$export$2e2bcd8739ae039);



class $2a42c62780fabbda$export$2e2bcd8739ae039 extends (0, $1edf991ac1d79f91$export$2e2bcd8739ae039) {
    constructor(){
        super();
        this.boundSubmitHandler = this.handleSubmit.bind(this);
        this.displayNameElement = this.shadowRoot.querySelector('input[name="name"]');
        this.bioElement = this.shadowRoot.querySelector('textarea[name="summary"]');
        if (!this.displayNameElement || !this.bioElement) throw new Error("Could not find required elements.");
        this.initializeEventListeners();
    }
    initializeEventListeners() {
        super.initializeEventListeners();
        this.formElement.addEventListener("submit", this.boundSubmitHandler);
    }
    handleSubmit(event) {
        event.preventDefault();
        if (!this.formElement.checkValidity()) return;
        const { value: name } = this.displayNameElement;
        const { value: summary } = this.bioElement;
        window.fetch("/edit-profile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                body: JSON.stringify({
                    name: name,
                    summary: summary
                })
            }
        }).then((response)=>response.json()).then((result)=>{
            console.log("Success:", result);
        }).catch((error)=>{
            console.error(error);
        // this.usernameElement.setCustomValidity('Password incorrect.');
        });
    }
}
customElements.define("tl-edit-profile-form", $2a42c62780fabbda$export$2e2bcd8739ae039);




//# sourceMappingURL=index.js.map
