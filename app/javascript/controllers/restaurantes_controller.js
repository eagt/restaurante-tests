import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="restaurantes"
export default class extends Controller {
  static targets = [ "newForm", "newLink" ]

  connect() {
    console.log("Hello, Stimulus!", this.element) 
    this.newFormTarget.style.display = "none";
  }

  openform(event) {
    event.preventDefault();
    console.log("Clicked, Open Form!")
    this.newFormTarget.style.display = "block";
    this.newLinkTarget.style.display = "none";
  }
  submitForm(event) {
    console.log("Form submitted!")
    this.newLinkTarget.style.display = "block";
  }
}


