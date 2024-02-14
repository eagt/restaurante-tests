import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="tables"
export default class extends Controller {
  static targets = [ "tableForm", 'newLink', 'tableList', 'table' ]

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

  //submitForm(event) {
  //  console.log("Form submitted!")
  //  //this.newTableLinkTarget.style.display = "block";
  //} 

  submit(event) {
    event.preventDefault()

    Rails.ajax({
      url: this.formTarget.action,
      type: this.formTarget.method,
      data: new FormData(this.formTarget),
      success: (data) => {
        this.tableTarget.innerHTML = data
      }
    })
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
    console.log("Edit Table!")
    this.tableFormTarget.style.display = "none";
    this.newLinkTarget.style.display = "none";
    this.tableListTarget.style.display = "none";
    this.tableTarget.style.display = "none";


  }

}
