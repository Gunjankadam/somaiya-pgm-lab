class Feedback extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.innerHTML = `
      <button type="button" id="modal-button" class="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#feedbackModal">
      Launch demo modal
    </button>
    
    <!-- Modal -->
    <div class="modal fade" id="feedbackModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Feedback Form</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            Please fill out the following feedback form
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary"><a href="https://forms.gle/hD6sTMisn3MvCpHx8" style="text-decoration: none;color: white;">Feedback Form</a></button>
          </div>
        </div>
      </div>
    </div>
      `;
    }
  }

customElements.define('feedback-component', Feedback);