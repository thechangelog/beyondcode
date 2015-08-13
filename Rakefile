require "rubygems"
require "bundler"

Bundler.setup

require "dotenv"

Dotenv.load

desc "Basically just calls middleman build"
task :build do
  puts "*** Middleman build go! ***"
  system "middleman build"
end

desc "Deploys site to S3"
task :deploy do
  begin
    s3cmd = `which s3cmd`.chomp
    puts "*** Middleman deploy go! ***"
  rescue
    abort "*** `brew install s3cmd` plz ***"
  end

  bucket = ENV["AWS_BUCKET"]
  key = ENV["AWS_ACCESS_KEY"]
  secret = ENV["AWS_SECRET_KEY"]

  cmd = [
    s3cmd,
    "--access_key=#{key}",
    "--secret_key=#{secret}",
    # "--dry-run",
    "--delete-removed",
    "sync",
    "build/",
    "s3://#{bucket}"
  ].join " "

  system cmd
end

desc "Run middleman server"
task :server do
  puts "*** Middleman server go! ***"
  system "middleman server"
end
