class Film
  def initialize data, season
    @data = data
    @season = season
  end

  def thumbnail_url version: "hqdefault"
    "//img.youtube.com/vi/#{youtube_id}/#{version}.jpg"
  end

  def method_missing method_name, *args
    @data.send method_name, args
  end
end
