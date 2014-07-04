class Connection < ActiveRecord::Base

  validates_presence_of :user
  validates_presence_of :server_id
  validates_presence_of :start_time
  validates_presence_of :end_time

  belongs_to :server

  scope :server_connections,        lambda{|server| where(:server_id => server.id).order("start_time ASC")} 
  #scope :user_connections,          lambda{|user| where(:user => user)}
  #scope :month_connections,         lambda{|month| where(:month => month)}
  #scope :month_server_connections,  lambda{|month, server| where(["(server_id = ? AND month = ?)", server.id, month])}
 
  def self.user_connections(server)

    user_dates = Array.new 
    users = Array.new

    actual_connection = nil

    server_connections(server).each do |connection|
      if actual_connection
        if actual_connection.start_time.month == connection.start_time.month &&
           actual_connection.start_time.day == connection.start_time.day &&
           actual_connection.start_time.year == connection.start_time.year

          if users.index(connection.user) && users.index(connection.user) >= 0
            users.insert(-1,connection.user)
            actual_connection = connection
          else 
            users.insert(-1,connection.user)
            actual_connection = connection
            user_dates.insert(-1, connection)
          end

        else
          users.clear
          users.insert(-1,connection.user)
          user_dates.insert(-1, connection)
          actual_connection = connection

        end
      else
        actual_connection = connection
        users.insert(-1,connection.user)
        user_dates.insert(-1, connection)
      end
    end

    user_dates

  end

end
