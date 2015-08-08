//= require vanilla-modal
//= require layzrjs/dist/layzr.min.js

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

    this[template]();
  },

  index: function() {
    // nothing yet
  },

  season: function() {
    this.modal = new VanillaModal();
  },

  single: function() {
    var playerTag = document.getElementById("player");
    var tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";

    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var player;
    window.onYouTubeIframeAPIReady = function() {
      player = new YT.Player("player", {
        height: "560",
        width: "315",
        videoId: playerTag.getAttribute("data-id"),
        playerVars: {
          showinfo: 0,
          autoplay: 1
        },
        events: {
          "onReady": onPlayerReady,
          "onStateChange": onPlayerStateChange
        }
      });
    };

    function onPlayerReady(event) {
    }

    function onPlayerStateChange(event) {
    }
  }
};

BC.init();
