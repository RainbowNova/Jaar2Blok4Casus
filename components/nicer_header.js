class Header extends HTMLElement {
    constructor() {
        super();
    }
  
    connectedCallback() {
        this.innerHTML = `
        <header>
            <div class="container-fluid">
         
                <nav class="navbar navbar-expand-lg navbar-light bg-custom fixed-top" style="background-color: rgba(48, 41, 144, 0.514);">  
                    <a class="navbar-brand logo" href="../index.html" style="margin-left:10px;">Damp</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                        <div class="collapse navbar-collapse navigation" id="navbarNav" style="justify-content: end; margin-right: 10px;">
                            <ul class="navbar-nav ml-auto">
                                <li class="nav-item" >
                                    <a class="nav-link" href="../index.html" style="color: white;">Home</a>
                                </li>
                                <li class="nav-item" >
                                    <a class="nav-link" href="../ProfilePage/Profile.html" style="color: white;">Profile</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="../StorePage/StorePage.html" style="color: white;">Store</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="../ForumPage/Forum.html" style="color: white;">Forum</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="../AboutPage/About.html" style="color: white;">About</a>
                                </li>
                            </ul>
                            <button id="loginButton" class="btn btnLogin-popup btn-outline-light">Login</button>
                        </div>
    
                </nav>
            <div class="container-fluid">
        </header>

    
        `;
  
        const btnPopup = this.querySelector('.btn.btnLogin-popup.btn-outline-light');
        btnPopup.addEventListener('click', () => {
            window.location.href = "../LoginPage/login.html";
        });
  
         /*removes login button if user is logged in*/
  
          /*function userLoggedIn() {
          if (sessionStorage.getItem("username") != null) {
              return true;
          }
          return false;
          }
  
          if (userLoggedIn()) {
              document.getElementById("loginButton").style.display = "none";
          }
          */
          
    }
  }
  
  customElements.define('header-component', Header);
  
  
  
