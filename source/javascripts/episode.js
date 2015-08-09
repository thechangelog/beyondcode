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
  var html = "<div class='episode_info-meta'>";
  html += "<h2><a href='" + this.path + "'>" + this.title + "</a></h2>";

  if (this.twitter) {
    html += "<p class='episode-twitter_link'>";
    html += "<a href='https://twitter.com/'" + this.twitter + ">@" + this.twitter + "</a>";
    html += "</p>";
  }

  html += "</div>";

  html += "<div class='episode_info-links'>";

  for (var i = 0; i < this.links.length; i++) {
    html += "<a href='" + this.links[i].url + "'>" + this.links[i].title + "</a>";
  }

  html += "</div>";

  return html;
}
