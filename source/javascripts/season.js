//= require extra

function Season() {
  BC.loadYouTube();

  var self = this;

  this.trailer = new Extra("trailer");
  this.all = document.getElementById("all");
  this.first = this.all.getAttribute("data-first");
  this.episodeInfo = document.getElementById("single-info");
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
    self.playAll();
    return false;
  }

  this.trailer.el.onclick = function(event) {
    self.playTrailer();
    return false;
  }
}

Season.prototype = {
  playAll: function() {
    this.fetchAndReplaceEpisode(this.first);
  },

  playTrailer: function(event) {
    this.episodeInfo.innerHTML = "<h2>Trailer</h2>";

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
                if (event.data === 0) {
                  self.fetchAndReplaceEpisode(self.episode.next);
                }
              }
            }
          })
        }
      })
  }
}
