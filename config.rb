require_relative "lib/season"
require_relative "lib/episode"
require_relative "lib/extra"

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

  proxy "#{season.path}/index.html", "season.html", locals: {season: season}, ignore: true

  season.episodes.each_with_index do |episode, index|
    # no beginning-of-array check here because we loop around
    episode.prev_film = season.episodes[index-1]

    if index == season.episodes.length
      episode.next_film = season.episodes.first
    else
      episode.next_film = season.episodes[index+1]
    end

    proxy "#{episode.path}/index.html", "single.html", locals: {episode: episode}, ignore: true
    proxy "#{episode.path}.json", "single.json", locals: {episode: episode}, ignore: true
  end
end

page "/*.json", layout: false

helpers do
  def template_name
    current_page.source_file.relative_path.to_s.split(".").first
  end
end

configure :build do
  activate :minify_css
  activate :minify_javascript
end
