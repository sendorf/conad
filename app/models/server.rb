class Server < ActiveRecord::Base

  attr_accessible :description, :name, :password, :url, :user, :password_confirmation

  attr_accessor :password

  validates_presence_of :name
  validates_presence_of :url
  validates_presence_of :user
  validates  :password,
             :presence => true,
             :confirmation => true,
             :on => :create

  has_many :connections

  def password=(new_password)
    @key = AES.key
    @password = AES.encrypt(new_password, @key)
    self.hash1 = @password
    self.hash2 = @key
  end

  def update_connections

    stdout = ""

    Net::SSH.start(self.url, self.user, :password => password) do |ssh|

      # capture only stdout with 'last' command
      ssh.exec!("last") do |channel, stream, data|
        stdout << data if stream == :stdout
      end

    end

    last_lines = stdout.split("\n")

    #Creates the connections from the log obtained from 'last' command
    isolate_connections(last_lines)

  end

  private 

  def password
    AES.decrypt(self.hash1, self.hash2)
  end

  def isolate_connections(last_lines)
    array_index = 0
    already_saved_connection = false
    last_connection = Connection.where(:server_id => self.id).order("start_time").last

    previous_connection = nil

    #Checks if you are in a line already processed or if there are no more lines 
    while (!already_saved_connection) && (array_index < last_lines.length)  do 
      line = last_lines[array_index]
      array_index = array_index.next

      #Extracts the connection from the log (last)
      connection = process_line(line)

      #Checks and update the year of the connections
      set_year(connection, previous_connection)

      #Checks that there is a suitable connection ready to be saved
      if connection
        if last_connection
          # Avoids duplicated connections
          if check_last_connection(connection, last_connection)
            already_saved_connection = true
          else
            connection.save
          end
        else
          connection.save
        end
      end

    end
    true
  end

  def process_line(line)
    if line.blank?
      nil
    else
      line_array = line.split

      if "(unknown" == line_array[0].to_s || line_array[0].to_s == "reboot" || line_array[0].to_s == "wtmp" ||
         "still" == line_array[7].to_s
        nil
      else
        if line_array[1].to_s == ":0"

          string_start_time = line_array[4] + ' ' + line_array[5] + ' ' + 
                              line_array[6]

          start_time = DateTime.parse string_start_time

          if line_array[8].to_s == "crash"
            duration_array = line_array[9].split(":")
            end_time = start_time + duration_array[0].split("(")[1].to_i.hour + duration_array[1].to_i.minutes
          else
            string_end_time = line_array[4] + ' ' + line_array[5] + ' ' + 
                              line_array[8]

            end_time = DateTime.parse string_end_time
          end

          Connection.new(:server_id => self.id, :user => line_array[0], 
                         :start_time => start_time, :end_time=> end_time)

        else
          nil
        end
      end
    end
  end

  def set_year(actual_connection, previous_connection)
    #Checks is there's a change of year between a connection and the previous
    if previous_connection
      if previous_connection.start_time.month >= actual_connection.start_time.month
        if previous_connection.end_time.month >= actual_connection.end_time.month
          previous_connection = actual_connection
        else
          connection.end_time.change(:year => (previous_connection.end_time.year - 1))
          previous_connection = actual_connection
        end
      else
        connection.start_time.change(:year => (previous_connection.start_time.year - 1))
        connection.end_time.change(:year => (previous_connection.end_time.year - 1))
        previous_connection = actual_connection
      end
    else
      previous_connection = actual_connection
    end
  end

  def check_last_connection(actual_connection, last_connection)
    (actual_connection.server_id == last_connection.server_id) && 
    (actual_connection.start_time == last_connection.start_time) && 
    (actual_connection.end_time == last_connection.end_time) &&
    (actual_connection.user == last_connection.user)
  end

end
