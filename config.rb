require_relative "lib/season"
require_relative "lib/episode"
require_relative "lib/extra"

Season.published(app.data).each do |season|
  proxy season.path, "season.html", locals: {season: season}

  season.episodes.each do |episode|
    proxy episode.path, "episode.html", locals: {season: season, episode: episode}
  end
end

page "/*.xml", layout: false
page "/*.json", layout: false
page "/*.txt", layout: false

helpers do
end

# Build-specific configuration
configure :build do
  # Minify CSS on build
  # activate :minify_css

  # Minify Javascript on build
  # activate :minify_javascript
end
