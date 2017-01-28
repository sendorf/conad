# CONAD (CONnetions ADministrator)

This is a web application created in Rails as End of Studies proyect.

The main purpose of this application is to have a control over the SSH connections to a server, or in this case to multiple ones. For each server it's needed a ssh user, the ssh password and that the user can use the **last** command.

Once you get the connections through the updates (they are done by sideqik tasks) you can visualize data in the different graphic representations available, the are done using d3js library.

This is a demo so this code should be removed from _app/workers/update_server_connections_worker.rb_ in case of giving it a proper use:

 ```ruby
    # This generates false data to make experiments
    else
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
 ```
 
 The rest of the application if functional and gives the proper results.
 
 All relevant additional information is included in the file _memoria.docx_ which is the report for the end of studies proyect and it's in spanish.
