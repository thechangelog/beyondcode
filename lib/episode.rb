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

  def as_json *args
  def prev_path
    prev_film.path if prev_film
  end

  def next_path
    next_film.path if next_film
  end
    {
      title: title,
      path: path
    }
  end
end
