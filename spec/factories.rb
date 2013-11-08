FactoryGirl.define do

  factory :server do
    description  { Faker::Lorem.paragraph }
    name         { Faker::Lorem.word }
    password     { Faker::Lorem.word }
    url          { Faker::Internet.domain_name }
    user         { Faker::Name.first_name } 
  end

  factory :connection do
    user         { Faker::Name.first_name } 
    server
    start_time   { Time.now }
    end_time     { Time.now + 2.hours }
  end

end