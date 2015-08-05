require_relative "lib/season"
require_relative "lib/episode"
require_relative "lib/extra"

sprockets.append_path File.join "#{root}", "bower_components"

Season.published(app.data).each do |season|
  proxy season.path, "season.html", locals: {season: season}

  season.episodes.each do |episode|
    proxy episode.path, "single.html", locals: {season: season, episode: episode}
  end
end

page "/*.xml", layout: false
page "/*.json", layout: false
page "/*.txt", layout: false

helpers do
  def template_name
    current_page.source_file.relative_path.to_s.split(".").first
  end
end

# Build-specific configuration
configure :build do
  # Minify CSS on build
  # activate :minify_css

  # Minify Javascript on build
  # activate :minify_javascript
end
