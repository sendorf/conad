namespace :servers do
	desc "Updates server connections"
  task :update => :environment do
  	Server.update_connections
  end
end