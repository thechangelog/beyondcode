require_relative "film"

class Season < Film
  def self.all data
    data.seasons.keys.map { |k| Season.new k, data.seasons[k] }.sort
  end

  def self.published data
    all(data).select { |season| season.published? }
  end

  def initialize slug, data
    @data = data
    @slug = @data.slug || slug
  end

  def <=> other
    number <=> other.number
  end

  def episodes
    @episodes ||= @data.episodes.map { |e| Episode.new e, self }
  end

  def extras
    @extras ||= @data.extras.map { |e| Extra.new e, self }
  end

  def filmed_on
    @filmed_on ||= Date.parse @data.filmed_on
  end

  def number
    @data.season_number
  end

  def location
    @data.location
  end

  def published_on
    @published_on ||= Date.parse @data.published_on
  end

  def published? as_of: Date.today
     published_on < as_of
  end

  def slug
    @data.slug || @slug
  end

  def year
    filmed_on.year
  end
end
