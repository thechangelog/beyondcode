class Season
  def self.all data
    data.seasons.map { |d| new d }
  end

  def self.published data
    all(data).select { |season| season.published? }
  end

  def initialize tuple
    @slug = tuple.first
    @data = tuple.last
  end

  def episodes
    @episodes ||= @data.episodes.map { |d| Episode.new d, self }
  end

  def path
    "/#{slug}"
  end

  def published? as_of: Date.today
    Date.parse(@data.published_on) < as_of
  end

  def slug
    @data.slug || @slug
  end

  def method_missing method_name, *args
    @data.send method_name, args
  end
end
