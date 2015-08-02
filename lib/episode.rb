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

  end
end
