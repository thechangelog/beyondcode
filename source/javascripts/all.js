//= require vanilla-modal

(function() {
  var body = document.getElementsByTagName("body")[0];
  var template = body.getAttribute("data-template");

  if (template === "season") {
    var modal = new VanillaModal();
  }

  if (template === "single") {
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
})();
