//= require extra

function Season() {
  BC.loadYouTube();

  var self = this;

  this.trailer = new Extra("trailer");
  this.all = document.getElementById("all");
  this.first = this.all.getAttribute("data-first");
  this.episodeInfo = document.getElementById("single-info");
  this.prevButton = document.getElementById("player-control-prev");
  this.nextButton = document.getElementById("player-control-next");
  this.playButton = document.getElementById("player-control-play");
  this.modal = new VanillaModal({
    onClose: function() {
      // big freaking hammer: blow away the player and reset its container
      // whenever the modal closes because YouTube wants to start the video
      // again for some stupid reason
      var playerEl = document.getElementById("player");

      if (playerEl) {
        playerEl.parentNode.innerHTML = "<div id='player'></div>";
      }

      if (self.player) {
        self.player = undefined;
      }
    }
  });

  this.all.onclick = function(event) {
    event.preventDefault();
    self.playAll();
  }

  this.trailer.el.onclick = function(event) {
    event.preventDefault();
    self.playTrailer();
  }

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

Season.prototype = {
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

    this.fetchAndReplaceEpisode(this.episode.prev);
  },

  nextEpisode: function() {
    if (!this.episode.next) {
      return false
    }

    this.fetchAndReplaceEpisode(this.episode.next);
  },

  playAll: function() {
    this.fetchAndReplaceEpisode(this.first);
  },

  playTrailer: function(event) {
    this.episodeInfo.parentNode.style.display = "none";
    this.player = new YT.Player("player", {
      videoId: this.trailer.id,
      playerVars: {
        showinfo: 0,
        autoplay: 1
      }
    })
  },

  fetchAndReplaceEpisode: function(newEpisode) {
    var self = this;

    fetch(newEpisode + ".json")
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        self.episode = new Episode(json);
        self.episodeInfo.parentNode.style.display = "block";
        self.episodeInfo.innerHTML = self.episode.infoHtml();

        if (self.player) {
          self.player.loadVideoById(self.episode.id);
        } else {
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
        }
      })
  }
}
