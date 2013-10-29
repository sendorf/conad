class Connection < ActiveRecord::Base
  attr_accessible :end_time, :server_id, :start_time, :user

  validates_presence_of :user
  validates_presence_of :server_id
  validates_presence_of :start_time
  validates_presence_of :end_time

  belongs_to :server

  scope :server_connections,        lambda{|server| where(:server_id => server.id)}   
  scope :month_connections,         lambda{|month| where(:month => month)}
  scope :month_server_connections,  lambda{|month, server| where(["(server_id = ? AND month = ?)", server.id, month])}
 

end
