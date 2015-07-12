class Season
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
    @episodes ||= @data.episodes.map { |d| Episode.new d, self }
  end

  def filmed_on
    @filmed_on ||= Date.parse @data.filmed_on
  end

  def number
    @data.season_number
  end

  def path
    "/#{slug}"
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

  def method_missing method_name, *args
    @data.send method_name, args
  end
end
