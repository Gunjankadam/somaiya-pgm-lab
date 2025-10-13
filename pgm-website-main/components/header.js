class Header extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.innerHTML = `
      <div id="nav-placeholder">
      <nav class="navbar nav-design" style="background-color: #9A2929;">
          <div class="container-fluid text-white ">
            <div>
              <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#menuOffcanvas" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation" >
              <span class="navbar-toggler-icon" >
              </span>
              </button>
              <a class="navbar-brand text-white ms-3" href="#" style="font-weight: 900; font-size:larger;">KJSIT</a>
            </div>
            <div class="offcanvas offcanvas-start" tabindex="-1" id="menuOffcanvas" aria-labelledby="menuOffcanvasLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="menuOffcanvasLabel">Contents</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    
                    <ul>
                    <a style="text-decoration: none; color:#9A2929;" href="../index.html"><ul>HOME</ul></a>
                    <hr>
                    <a style="text-decoration: none; color:#9A2929;" href="../module1/mod1.html"><ul>Introduction TO PGM</ul></a>
                    <hr>
                    <a style="text-decoration: none; color:#9A2929;" href="../module2/mod2.html"><ul>Bayesian Network Model and Inference</ul></a>
                    <hr>
                    <a style="text-decoration: none; color:#9A2929;" href="../module3/mod3.html"><ul>Markov Network Model and Inference</ul></a>
                    <hr>
                    <a style="text-decoration: none; color:#9A2929;" href="../module4/mod4.html"><ul>Hidden Network Model and Inference</ul></a>
                    <hr>
                    <a style="text-decoration: none; color:#9A2929;" href="../module5/mod5.html"><ul>Learning and Taking Actions and Decisions</ul></a>
                    <hr>
                    <a style="text-decoration: none; color:#9A2929;" href="../module6/mod6.html"><ul>Applications</ul></a>
                    <hr>
                    <a style="text-decoration: none; color:#9A2929;" href="../playlist/playlist.html"><ul>Playlist</ul></a>
                    <hr>
                    <a style="text-decoration: none; color:#9A2929;" href="../references.html"><ul>References</ul></a>
                    <hr>
                    <a style="text-decoration: none; color:#9A2929;" href="../aboutus.html"><ul>About Us</ul></a>
                    <hr>
                    <a style="text-decoration: none; color:#9A2929;" href="https://docs.google.com/forms/d/e/1FAIpQLSe2dd1mGU3UdYxddv1ztQjSIt4crRTp1zj8h6k8ksIS7SNhEw/viewform?vc=0&c=0&w=1&flr=0"><ul>Feedback</ul></a>
                    <hr>
                    </ul>
                </div>
                </div>
              <div class="d-flex">
                  <h3 class="nav-text" style="font-weight: 900; font-size:large;">Probabilistic Graphical Models</h3>
              </div>
          </div>
      </nav>
        </div>
      `;
    }
  }

customElements.define('header-component', Header);