require_relative "film"

class Episode < Film
  def slug
    @data.slug || @data.twitter || @data.title.downcase.gsub(" ", "-")
  end
end
