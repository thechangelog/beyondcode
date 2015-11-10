require_relative "film"

class Episode < Film
  def image_path
    "/images/season-#{@season.number}/#{title_slug}.jpg"
  end

  def slug
    @data.slug || title_slug
  end

  def title_slug
    @data.title.downcase.gsub " ", "-"
  end

  def html_title
    "#{season.html_title} – #{title}"
  end

  def prev_path
    prev_film.path if prev_film
  end

  def next_path
    next_film.path if next_film
  end

  def summary_hash
    {
      title: title,
      path: path
    }
  end

  def details_hash
    summary_hash.merge({
      id: youtube_id,
      twitter: twitter,
      html_title: html_title,
      prev: prev_path,
      next: next_path,
      links: links
    })
  end

  def twitter?
    twitter.present?
  end

  def twitter_url
    "https://twitter.com/#{twitter}"
  end

  def youtube_url
    "https://www.youtube.com/watch?v=#{youtube_id}"
  end
end
