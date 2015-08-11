function Extra(elementIdOrObject) {
  if (typeof elementIdOrObject  === "string") {
    this.el = document.getElementById(elementIdOrObject);

    this.id = this.el.getAttribute("data-id");
  } else {
    for(var prop in elementIdOrObject) {
      this[prop] = elementIdOrObject[prop];
    }
  }
}
