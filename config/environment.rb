# Load the rails application
require File.expand_path('../application', __FILE__)

# Load heroku vars from local file
alwaysdata_env = File.join(Rails.root, 'config', 'alwaysdata_env.rb')
load(alwaysdata_env) if File.exists?(alwaysdata_env)

# Initialize the rails application
Conad::Application.initialize!
