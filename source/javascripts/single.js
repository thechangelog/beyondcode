//= require episode

function Single() {
  this.episode = new Episode("single");
  this.episodeInfo = document.getElementById("single-info");

  var self = this;

  BC.loadYouTube(function() {
    self.player = new YT.Player("player", {
      height: "560",
      width: "315",
      videoId: self.episode.id,
      playerVars: {
        showinfo: 0,
        autoplay: 0
      },
      events: {
        "onReady": self.playerReady,
        "onStateChange": self.playerStateChange
      }
    })
  });
}

Single.prototype = {
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
  },

  playerReady: function() {

  },

  playerStateChange: function(event) {
    if (event.data === 0) {
      this.nextEpisode();
    }
  }
}
