class Connection < ActiveRecord::Base
  attr_accessible :connection_last, :end_time, :month, :month_day, :server_id, :start_time, :user, :week_day

  validates_presence_of :user
  validates_presence_of :server_id
  validates_presence_of :month
  validates_presence_of :start_time
  validates_presence_of :end_time
  validates_presence_of :week_day
  validates_presence_of :month_day

  belongs_to :server

end
