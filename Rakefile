require "rubygems"
require "bundler"

Bundler.setup

require "dotenv"

Dotenv.load

aws_key    = ENV["AWS_ACCESS_KEY"]
aws_secret = ENV["AWS_SECRET_KEY"]
s3_bucket  = ENV["AWS_BUCKET"]
cf_dist_id = ENV["CLOUDFRONT_DIST_ID"]

desc "Builds, deploys to S3, and invalidates CloudFront Edge caches"
task deploy: [:build, :upload, :invalidate]

desc "Basically just calls middleman build"
task :build do
  puts "*** Middleman build go! ***"
  system "middleman build"
end

desc "Uploads new files to S3"
task :upload do
  begin
    s3cmd = `which s3cmd`.chomp
    puts "*** Middleman deploy go! ***"
  rescue
    abort "*** `brew install s3cmd` plz ***"
  end

  cmd = [
    s3cmd,
    "--access_key=#{aws_key}",
    "--secret_key=#{aws_secret}",
    # "--dry-run",
    "--delete-removed",
    "sync",
    "build/",
    "s3://#{s3_bucket}"
  ]

  system cmd.join " "
end

task :invalidate do
  begin
    cfcmd = `which cloudfront-invalidator`.chomp
    puts "*** CloudFront Invalidator go! ***"
  rescue
    abort "*** Could not find `cloudfront-invalidator` command ***"
  end

  FileUtils.cd "build"
  indexes = Dir["**/index.html"]

  cmd = [
    cfcmd,
    "invalidate",
    aws_key,
    aws_secret,
    cf_dist_id,
    indexes.join(" ")
  ]

  system cmd.join " "
end

desc "Run middleman server"
task :server do
  puts "*** Middleman server go! ***"
  system "middleman server"
end
