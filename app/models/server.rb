class Server < ActiveRecord::Base
  attr_accessible :description, :name, :password, :url, :user

  validates_presence_of :name
  validates_presence_of :url
  validates_presence_of :user
  validates_presence_of :password

  has_many :connections
end
