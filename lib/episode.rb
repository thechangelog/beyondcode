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
      prev: prev_film.path,
      next: next_film.path,
      links: links
    })
  end
end
