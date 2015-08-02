require_relative "film"

class Episode < Film
  def image_path
    "/images/season-#{@season.number}/#{slug}.jpg"
  end

  def slug
    @data.slug || @data.twitter || @data.title.downcase.gsub(" ", "-")
  end
end
