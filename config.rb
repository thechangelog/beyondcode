require_relative "lib/season"
require_relative "lib/episode"
require_relative "lib/extra"

sprockets.append_path File.join "#{root}", "bower_components"

seasons = Season.published app.data

seasons.each_with_index do |season, index|
  if index == 0
    prev_season = nil
  else
    prev_season = seasons[index-1]
  end

  if index == seasons.length
    next_season = nil
  else
    next_season = seasons[index+1]
  end

  proxy season.path, "season.html", locals: {
    season: season,
    prev_season: prev_season,
    next_season: next_season
  }

  season.episodes.each_with_index do |episode, index|
    # no beginning-of-array check here because we loop around
    prev_episode = season.episodes[index-1]

    if index == season.episodes.length
      next_episode = season.episodes.first
    else
      next_episode = season.episodes[index+1]
    end

    proxy episode.path, "single.html", locals: {
      season: season,
      episode: episode,
      prev_episode: prev_episode,
      next_episode: next_episode
    }
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
