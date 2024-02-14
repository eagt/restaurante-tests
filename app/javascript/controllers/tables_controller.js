import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="tables"
export default class extends Controller {
  static targets = [ "tableForm", 'newLink', 'tableList', 'table', 'number', , "submitButton" ]

  connect() {
    console.log("Connected to tables controller", this.tableFormTarget)
    console.log("Connected to tables controller", this.tableListTarget)
    this.tableFormTarget.style.display = "none";
    this.tableTarget.style.display = "none";
  }

  opentableform(event) {
    event.preventDefault();
    console.log("Clicked, Open Form!")
    this.tableFormTarget.style.display = "block";
    this.newLinkTarget.style.display = "none";
    this.tableListTarget.style.display = "none";
    this.tableTarget.style.display = "none";
  }

  submit(event) {
    event.preventDefault();
    if (this.tableFormTarget && this.tableFormTarget instanceof HTMLFormElement) {
      this.tableFormTarget.submit();
    } else {
      console.error('tableFormTarget is not a form element:', this.tableFormTarget);
    }
  }

  showTable(event) {
    event.preventDefault();
    this.tableFormTarget.style.display = "none";
    this.newLinkTarget.style.display = "none";
    this.tableListTarget.style.display = "none";
    this.tableTarget.style.display = "block";

    var tableId = event.target.dataset.tableId;
    var restauranteId = event.target.dataset.restauranteId;

    fetch(`/restaurantes/${restauranteId}/tables/${tableId}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      this.tableTarget.querySelector('.table-number').textContent = data.number;
      this.tableTarget.querySelector('.table-restaurant').textContent = data.restaurante_name;
      this.tableTarget.style.display = "block";
    });
  }

  editTable(event) {
    event.preventDefault();
    this.tableFormTarget.style.display = "block";
    this.newLinkTarget.style.display = "none";
    this.tableListTarget.style.display = "none";
    this.tableTarget.style.display = "none";
  
    var tableId = event.target.dataset.tableId;
    var restauranteId = event.target.dataset.restauranteId;
  
    // Get the CSRF token
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  
    // Use a GET request to fetch the table data
    fetch(`/restaurantes/${restauranteId}/tables/${tableId}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      // Populate the form with the fetched data
      this.numberTarget.value = data.number;
      // Add other form fields here as needed
  
      // Change the form's action and method for editing
      this.tableFormTarget.action = `/restaurantes/${restauranteId}/tables/${tableId}`;
      this.tableFormTarget.method = 'post';
      // Add a hidden input for the '_method' parameter to use the PATCH HTTP verb
      let methodInput = document.createElement('input');
      methodInput.type = 'hidden';
      methodInput.name = '_method';
      methodInput.value = 'patch';
      this.tableFormTarget.appendChild(methodInput);
  
      // Change the text of the submit button to 'Update Table'
      this.submitButtonTarget.value = 'Update Table';
    });
  
    // Add an event listener for the form submission
    this.tableFormTarget.addEventListener('submit', (event) => {
      event.preventDefault();
  
      // Use a PATCH request to update the table data
      fetch(`/restaurantes/${restauranteId}/tables/${tableId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          // Include the CSRF token in the 'X-CSRF-Token' header
          'X-CSRF-Token': csrfToken
        },
        body: JSON.stringify({
          number: this.numberTarget.value
          // Add other form fields here as needed
        })
      })
      .then(response => {
        if (response.ok) {
          // Handle successful response
        } else {
          // Handle error response
        }
      });
    });
  }
}
