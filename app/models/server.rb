class Server < ActiveRecord::Base
  attr_accessible :description, :name, :password, :url, :user
end
