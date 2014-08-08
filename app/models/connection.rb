class Connection < ActiveRecord::Base

  validates_presence_of :user
  validates_presence_of :server_id
  validates_presence_of :start_time
  validates_presence_of :end_time

  belongs_to :server

  scope :server_connections,          lambda{|server| where(:server_id => server.id).order("start_time ASC")} 
  #scope :month_connections,          lambda{|month| where(:month => month)}
  scope :last_connection_for_server,  lambda{|server| where(:server_id => server.id).order("start_time DESC").limit(1)}
  scope :month_server_connections,    lambda{|month, server| select('start_time, server_id')
                                                          .where(["(server_id = ? AND extract(month from start_time) = ?)", server.id, month])
                                                          .order("start_time ASC")}
  scope :server_date_connections,            lambda{|server, date| where("server_id = ? AND start_time BETWEEN ? AND ?", 
                                                          server.id,
                                                          date.to_date.beginning_of_day,
                                                          date.to_date.end_of_day )
                                                          .order("start_time ASC")}
  scope :date_connections,            lambda{|date| where("start_time BETWEEN ? AND ?",
                                                          date.to_date.beginning_of_day,
                                                          date.to_date.end_of_day )
                                                          .order("start_time ASC")}
  scope :month_connections,           lambda{|date| where("extract(month from start_time) = ? AND extract(year from start_time) = ?", date.month, date.year)
                                                          .order("start_time ASC")}


  def self.chart_format_day_connections(date)
    result = []
    # gets all connections for a date
    connections = date_connections(date).to_a
    # an array containing all servers
    servers = Server.all.to_a
    # hours to add to the start date
    hours = 0
    # index to go through the array of connections
    i = 0
    connection = connections[i]
    while hours <= 23
      totals = {}
      while connection && connection.start_time.hour == hours
        if totals["#{connection.server_id}"]
          totals["#{connection.server_id}"] += 1
        else
          totals["#{connection.server_id}"] = 1
        end
        i += 1
        connection = connections[i]
      end
      date_hash = {time: hours}
      servers.each do |server|
        if totals["#{server.id}"]
          date_hash["#{server.name}"] = totals["#{server.id}"]
        else
          date_hash["#{server.name}"] = 0
        end
      end
      result << date_hash
      hours += 1
    end
    return result
  end



  def self.chart_format_month_connections(date)
    result = []
    # gets all connections for a natural month based on the given date
    connections = month_connections(date).to_a
    # an array containing all servers
    servers = Server.all.to_a
    # end_date and start_date are the last and the first day of the natural month for the given date
    end_date = DateTime.new(date.year, date.month, -1)
    start_date = DateTime.new(date.year, date.month, 1)
    # days to add to the start date
    days = 0
    # index to go through the array of connections
    i = 0
    connection = connections[i]
    while days <= (end_date - start_date)
      current_date = start_date + days.days
      totals = {}
      while connection && connection.start_time.day == current_date.day
        if totals["#{connection.server_id}"]
          totals["#{connection.server_id}"] += 1
        else
          totals["#{connection.server_id}"] = 1
        end
        i += 1
        connection = connections[i]
      end
      date_hash = {date: current_date.strftime('%Y%m%d')}
      servers.each do |server|
        if totals["#{server.id}"]
          date_hash["#{server.name}"] = totals["#{server.id}"]
        else
          date_hash["#{server.name}"] = 0
        end
      end
      result << date_hash
      days += 1
    end
    return result
  end

  # This method is easier to understand but has a bad performance because of the recurrent DB queries
  def self.chart_format_period_connections(start_date, end_date)
    result = []
    ((end_date - start_date) + 1).to_i.times do |days|
      date = start_date + days.days
      date_hash = {date: date.strftime('%Y%m%d')}
      Server.all.each do |server|
        date_hash["#{server.name}"] = server_date_connections(server, date).length
      end
      result << date_hash
    end
    return result
  end


  # Method created to test charts, not needed anymore
=begin
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
=end


  def self.users
    users = []
    Connection.select(:user).uniq.each do |connection|
      users << connection.user
    end
    return users
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
