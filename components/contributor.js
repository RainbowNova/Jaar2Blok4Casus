/*Template code from: https://www.freecodecamp.org/news/reusable-html-components-how-to-reuse-a-header-and-footer-on-a-website/*/

class contributor extends HTMLElement {
    constructor() {
      super();
    }
  
  connectedCallback() {
    this.innerHTML = `
    <li>
        <div class="contributor">
            <h3>Contributor</h3>
            <p>description</p>
        </div>
    </li>
    `;
  }
}

  customElements.define('contributor-component', contributor);