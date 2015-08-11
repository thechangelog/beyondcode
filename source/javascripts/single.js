//= require episode

function Single() {
  this.episode = new Episode("single");
  this.episodeInfo = document.getElementById("single-info");
  this.prevButton = document.getElementById("player-control-prev");
  this.nextButton = document.getElementById("player-control-next");
  this.playButton = document.getElementById("player-control-play");

  var self = this;

  BC.loadYouTube(function() {
    self.player = new YT.Player("player", {
      videoId: self.episode.id,
      playerVars: {
        showinfo: 0,
        autoplay: 1
      },
      events: {
        "onStateChange": function(event) {
          switch(event.data) {
            case 0:
              self.nextEpisode();
              break;
            case 1:
              self.playButton.className = "episode_info-controls-play";
              break;
            case 2:
              self.playButton.className = "episode_info-controls-play is-paused";
              break;
          }
        }
      }
    })
  });

  this.prevButton.onclick = function(event) {
    event.preventDefault();
    self.prevEpisode();
  }

  this.nextButton.onclick = function(event) {
    event.preventDefault();
    self.nextEpisode();
  }

  this.playButton.onclick = function(event) {
    event.preventDefault();
    self.playPauseEpisode();
  }
}

Single.prototype = {
  playPauseEpisode: function() {
    if (this.player.getPlayerState() === 1) {
      this.player.pauseVideo();
    } else {
      this.player.playVideo();
    }
  },

  prevEpisode: function() {
    if (!this.episode.prev) {
      return false
    }

    if (BC.isModern()) {
      this.fetchAndReplaceEpisode(this.episode.prev);
    } else {
      location = this.episode.prev;
    }
  },

  nextEpisode: function() {
    if (!this.episode.next) {
      return false;
    }

    if (BC.isModern()) {
      this.fetchAndReplaceEpisode(this.episode.next);
    } else {
      location = this.episode.next;
    }
  },

  fetchAndReplaceEpisode: function(newEpisode) {
    var self = this;

    fetch(newEpisode + ".json")
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        self.episode = new Episode(json);
        document.title = self.episode.html_title;
        self.episodeInfo.innerHTML = self.episode.infoHtml();
        history.pushState(null, self.episode.html_title, self.episode.path);
        self.player.loadVideoById(self.episode.id);
      })
  }
}
