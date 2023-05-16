class Header extends HTMLElement {
    constructor() {
      super();
    }
  
  connectedCallback() {
    this.innerHTML = `
      <div class="header important_for_user">
        <button class="button">Games</button>
        <button class="button">Shop</button>
        <button class="button">Community</button> 
        <button class="button">Gebruikersnaam</button>
    </div>
    `;
  }
}

  customElements.define('header-component', Header);