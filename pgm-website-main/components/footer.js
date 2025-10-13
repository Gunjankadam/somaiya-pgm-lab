class Footer extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.innerHTML = `
            <footer class="text-white w-100 mt-5" style="background-color: #9A2929; ">
            <div class="row p-4 m-0">
                <div class="col-12 col-md-6" >
                    <img src="../images/image 3.png" alt="logo" style="width: 20%;">
                    <img src="../images/image 6.png" alt="logo" style="width: 70%;">
                </div>
                <div class="col-12 col-md-6">
                    <h5 style="font-weight: 900;">Department Of Computer Engineering</h5>
                    <p>Address: Somaiya Ayurvihar Complex, Eastern Express Highway, Near Everard Nagar, Sion (East),
                        Mumbai, Maharashtra 400022</p>
                    <p>Phone: 91-22- 24061408 / 24061403</p>
                </div>
            </div>
        <div class="row mt-4 m-0 text-center text-white p-2" style="background-color: #005AAB;">
        <p><b>Guided By : </b>
        <br>Prof. Pradnya Patil, Assisstant Professor,Computer Engineering Department
        <br>Dr. Sarita Ambadekar, HOD, Computer Engineering Department</p>
        <hr>
            <p><b>Developed By: </b>
            <a href="https://www.linkedin.com/in/divijakinger/" style="color:white">Divija Kinger</a>,
            <a href="https://www.linkedin.com/in/virenjoshi403" style="color:white">Viren Joshi</a>, 
            <a href="https://www.linkedin.com/in/shubh-joshi-a63420209/" style="color:white">Shubh Joshi</a></p>
        </div>
        </footer>  
      `;
    }
  }

customElements.define('footer-component', Footer);