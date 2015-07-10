class Episode
  def initialize data, season
    @data = data
    @season = season
  end

  def path
    "#{@season.path}/#{slug}"
  end

  def slug
    @data.slug || @data.title.downcase.gsub(" ", "-")
  end

  def method_missing method_name, *args
    @data.send method_name, args
  end
end
