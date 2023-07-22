function supportsDeclarativeShadowDOM() {
  return HTMLTemplateElement.prototype.hasOwnProperty('shadowRoot');
}

function polyfillDeclarativeShadowDom(docOrShadowRoot) {
  docOrShadowRoot
    .querySelectorAll('template[shadowrootmode]')
    .forEach((template) => {
      const mode = template.getAttribute('shadowrootmode');
      const shadowRoot = template.parentNode.attachShadow({ mode });
      shadowRoot.appendChild(template.content);
      template.remove();

      polyfillDeclarativeShadowDom(shadowRoot);
    });
}

if (!supportsDeclarativeShadowDOM()) {
  polyfillDeclarativeShadowDom(document);
}
