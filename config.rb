require_relative "lib/season"
require_relative "lib/episode"
require_relative "lib/extra"

sprockets.append_path File.join "#{root}", "bower_components"

seasons = Season.published app.data

seasons.each_with_index do |season, index|
  if index == 0
    season.prev_film = nil
  else
    season.prev_film = seasons[index-1]
  end

  if index == seasons.length
    season.next_film = nil
  else
    season.next_film = seasons[index+1]
  end

  proxy season.path, "season.html", locals: {season: season}

  season.episodes.each_with_index do |episode, index|
    # no beginning-of-array check here because we loop around
    episode.prev_film = season.episodes[index-1]

    if index == season.episodes.length
      episode.next_film = season.episodes.first
    else
      episode.next_film = season.episodes[index+1]
    end

    proxy episode.path, "single.html", locals: {episode: episode}
  end
end

page "/*.json", layout: false

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
