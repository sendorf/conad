namespace :db do

  desc "Cleans the database completely (with DatabaseCleaner), preserves structure"
    task :truncate => :environment do
      puts("Cleaning up whole database...")
      DatabaseCleaner.clean_with(:truncation) if defined? DatabaseCleaner
  end
  namespace :truncate do

    desc "Cleans the db's servers (with DatabaseCleaner), preserves structure"
    task :servers => :environment do
      puts("Cleaning up servers...")
      DatabaseCleaner.clean_with(:truncation, :only => [:servers]) if defined? DatabaseCleaner

    end

    desc "Cleans the db's connections (with DatabaseCleaner), preserves structure"
    task :connections => :environment do
      puts("Cleaning up connections...")
      DatabaseCleaner.clean_with(:truncation, :only => [:connections]) if defined? DatabaseCleaner

    end
  end
end