// app/javascript/controllers/clickable_card_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    this.element.style.cursor = 'pointer';
  }

  goToUrl(event) {
    window.location = this.data.get('url');
  }
}

