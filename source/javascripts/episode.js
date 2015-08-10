function Episode(elementIdOrObject) {
  if (typeof elementIdOrObject  === "string") {
    var el = document.getElementById(elementIdOrObject);

    this.id = el.getAttribute("data-id");
    this.prev = el.getAttribute("data-prev");
    this.next = el.getAttribute("data-next");
  } else {
    for(var prop in elementIdOrObject) {
      this[prop] = elementIdOrObject[prop];
    }
  }
}

Episode.prototype.infoHtml = function() {

  var html = "<div class='episode_info-controls'>";
  html += "<a href='#' title='Previous Episode' class='episode_info-controls-prev'>Previous</a>";
  html += "<a href='#' title='Play Episode' class='episode_info-controls-play'>Play</a>";
  html += "<a href='#' title='Next Episode' class='episode_info-controls-next'>Next</a>";
  html += "</div>";

  html += "<div class='episode_info-meta'>";
  html += "<h2><a href='" + this.path + "'>" + this.title + "</a></h2>";

  if (this.twitter) {
    html += "<p class='episode-twitter_link'>";
    html += "<a href='https://twitter.com/'" + this.twitter + ">@" + this.twitter + "</a>";
    html += "</p>";
  }

  html += "<ul class='episode_info-meta-links'>";

  for (var i = 0; i < this.links.length; i++) {
    html += "<li><a href='" + this.links[i].url + "'>" + this.links[i].title + "</a></li>";
  }

  html += "</ul></div>";

  return html;
}
