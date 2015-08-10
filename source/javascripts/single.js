//= require episode

function Single() {
  this.episode = new Episode("single");
  this.episodeInfo = document.getElementById("single-info");

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
          if (event.data === 0) {
            self.nextEpisode();
          }
        }
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
  }
}
