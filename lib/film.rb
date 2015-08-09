class Film
  attr_accessor :prev_film, :next_film
  attr_reader :season

  def initialize data, season
    @data = data
    @season = season
  end

  def links
    @data.links.map &:to_h
  end

  def path
    "/#{slug}"
  end

  def method_missing method_name, *args
    @data.send method_name, args
  end
end
