require_relative "film"

class Episode < Film
  def path
    "#{@season.path}/#{slug}"
  end

  def slug
    @data.slug || @data.title.downcase.gsub(" ", "-")
  end
end
