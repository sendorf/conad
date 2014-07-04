# Load the Rails application.
require File.expand_path('../application', __FILE__)

# Load alwaysdata vars from local file
heroku_env = File.join(Rails.root, 'config', 'heroku_env.rb')
load(heroku_env) if File.exists?(heroku_env)

# Initialize the Rails application.
Rails.application.initialize!
