//= require vanilla-modal
//= require layzrjs/dist/layzr.min.js

(function() {
  var modal = new VanillaModal();

  var layzr = new Layzr({
    container: null,
    selector: "[data-src]",
    attr: "data-src",
    retinaAttr: "data-src-retina",
    bgAttr: "data-src-bg",
    hiddenAttr: "data-src-hidden",
    threshold: 0,
    callback: function () {
      this.classList.add("is-loaded");
    }
  });

})();
