class UpdateServerConnectionsWorker
  include Sidekiq::Worker

  def perform server
    begin
      Net::SSH.start(server.url, server.user, :password => password) do |ssh|

        # capture only stdout with 'last' command
        ssh.exec!("last") do |channel, stream, data|
          stdout << data if stream == :stdout
        end

      end

      last_lines = stdout.split("\n")

      if last_lines[0].split(" ")[3] == "denied"
        result = false
      else
        #Creates the connections from the log obtained from 'last' command
        isolate_connections(last_lines)
        result = true
      end

    rescue Net::SSH::AuthenticationFailed
      result = false
    rescue Exception => e
      result = false
    end
    # This generates false data to make experiments
    if !result
      user_names = Connection.users
      if last_date = Connection.last_connection_for_server(server).first
        last_date = last_date.start_time
        days = (DateTime.now.to_date - last_date.to_date).to_i
        (days + 1).times do |i|
          date = last_date + i.days
          if Connection.server_date_connections(server, date).length == 0
            rand(25).times do
              start_hours = (-8..8).to_a.sample
              date = last_date + i.days
              hour = rand(8)
              user = user_names.sample
              start_time = date + start_hours.hours
              end_time = date + hour.hours
              connection = Connection.new(:server_id => server.id, :user => user, 
                           :start_time => start_time, :end_time=> end_time)
              result = connection.save
            end
          end
        end
      else
        rand(25).times do
          start_hours = (-8..8).to_a.sample
          hour = rand(8)
          user = user_names.sample
          start_time = DateTime.now + start_hours.hours
          end_time = start_time + hour.hours
          connection = Connection.new(:server_id => server.id, :user => user, 
                       :start_time => start_time, :end_time=> end_time)
          result = connection.save
        end
      end
      result = true
    end
  end
end