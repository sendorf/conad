class Connection < ActiveRecord::Base

  validates_presence_of :user
  validates_presence_of :server_id
  validates_presence_of :start_time
  validates_presence_of :end_time

  belongs_to :server

  scope :server_connections,        lambda{|server| where(:server_id => server.id).order("start_time ASC")} 
  #scope :user_connections,          lambda{|user| where(:user => user)}
  #scope :month_connections,         lambda{|month| where(:month => month)}
  scope :month_server_connections,  lambda{|month, server| select('start_time, server_id')
                                                          .where(["(server_id = ? AND extract(month from start_time) = ?)", server.id, month])
                                                          .order("start_time ASC")}
  scope :period_connections, lambda{|start_date, end_date| where(["(start_time >= ? AND start_time <= ?)", start_date, end_date])
                                                          .order("start_time ASC")}


  def self.chart_format_period_connections(start_date, end_date)
    date = start_date.to_date
    servers = Server.all.to_a
    i = 0
    count_array = Array.new(servers.length){|i| i = 0}
    result = []
    period_connections(start_date, end_date).each do |connection|
      found = false
      while !found do
        server = servers[i]
        if connection.start_time.to_date == date && connection.server_id == server.id
          count_array[i] += 1
          found = true
        elsif connection.start_time.to_date != date && connection.server_id == server.id
          date_hash = {date: date.strftime('%Y%m%d')}
          j = 0
          servers.each do |serve|
            date_hash["#{serve.name}"] = count_array[j]
            j += 1
          end
          result << date_hash
          date = connection.start_time.to_date
          count_array = Array.new(servers.length){|i| i = 0}
          found = true
        end
        i += 1
      end
      i = 0
    end
    return result
  end

  def self.month_and_server_chart_data(month, server)
    day = 1
    count = 0
    result = []
    month_server_connections(month, server).each do |connection|
      if connection.start_time.day == day
        count += 1
      else
        result << {day: day, connections: count}
        day = connection.start_time.day
        count = 0
      end
    end
    result << {day: day, connections: count}
    return result
  end

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
