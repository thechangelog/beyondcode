//= require vendor/_vanilla-modal
//= require vendor/_layzr
//= require vendor/_promise
//= require vendor/_fetch
//= require _single
//= require _season

window.BC = {
  init: function() {
    var body = document.getElementsByTagName("body")[0];
    var template = body.getAttribute("data-template");

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

    this[template + "Init"]();
  },

  indexInit: function() {
    // noop
  },

  seasonInit: function() {
    this.season = new Season();
  },

  singleInit: function() {
    this.single = new Single();
  },

  isModern: function() {
    return !!history.pushState;
  },

  loadYouTube: function(cb) {
    var tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";

    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = cb;
  }
}

BC.init();
