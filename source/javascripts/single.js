//= require episode

function Single() {
  var episode = new Episode("single");
  var episodeInfo = document.getElementById("single-info");
  var tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";

  var firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  var player;
  window.onYouTubeIframeAPIReady = function() {
    player = new YT.Player("player", {
      height: "560",
      width: "315",
      videoId: episode.id,
      playerVars: {
        showinfo: 0,
        autoplay: 0
      },
      events: {
        "onReady": onPlayerReady,
        "onStateChange": onPlayerStateChange
      }
    });
  }

  window.prevEpisode = function() {
    if (!episode.prev) {
      return false
    }

    if (BC.isModern()) {
      fetch(episode.prev + ".json")
        .then(function(response) {
          return response.json();
        }).then(function(json) {
          episode = new Episode(json);
          document.title = json.html_title;
          episodeInfo.innerHTML = episode.infoHtml();
          history.pushState(null, json.html_title, json.path);
          player.loadVideoById(json.id);
        })
    } else {
      location = episode.prev;
    }
  }

  window.nextEpisode = function() {
    if (!episode.next) {
      return false;
    }

    if (BC.isModern()) {
      fetch(episode.next + ".json")
        .then(function(response) {
          return response.json();
        }).then(function(json) {
          episode = new Episode(json);
          document.title = episode.html_title;
          episodeInfo.innerHTML = episode.infoHtml();
          history.pushState(null, episode.html_title, episode.path);
          player.loadVideoById(episode.id);
        })
    } else {
      location = episode.next;
    }
  }

  function onPlayerReady(event) {
  }

  function onPlayerStateChange(event) {
    if(event.data === 0) {
      nextEpisode();
    }
  }
}

