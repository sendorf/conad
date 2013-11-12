namespace :db do

  desc "cleans the database completely (with DatabaseCleaner), and fills it up with fake data"
  task :seed => %w{
    db:truncate
    seed:prepare
    seed:servers
    seed:connections
  }

  namespace :seed do
    desc "Loads factory girl"
    task :prepare => :environment do
      puts("Loading up factory girl")
      require 'factory_girl'
      FactoryGirl.find_definitions
      include FactoryGirl::Syntax::Methods
    end

    desc "Creates local and 10 dummy extra servers"
    task :servers => "seed:prepare" do
      puts("Creating servers...")

      local = create(:server, :name=> 'Local', :url => 'localhost', :user => 'sendorf', :password => 'melkor86')

      10.times { create(:server) }
    end

    desc "Creates 11000 connections to the servers"
    task :connections => "seed:prepare" do
      puts("Creating connections...")

      servers = Server.all
      user_names = Array.new
      50.times do
        name = Faker::Name.first_name
        user_names.push(name)
      end

      servers.each do |server|
        1000.times do
          date = rand(60)
          hour = rand(8)
          user = user_names.sample
          start_time = DateTime.now - date.days
          end_time = start_time + hour.hours
          create(:connection, :user => user,  
                 :end_time => end_time,
                 :server => server, 
                 :start_time => start_time)
        end
      end

    end
  end
end