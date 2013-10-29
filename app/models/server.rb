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

  def password
    AES.decrypt(self.hash1, self.hash2)
  end

  def password=(new_password)
    @key = AES.key
    @password = AES.encrypt(new_password, @key)
    self.hash1 = @password
    self.hash2 = @key
  end

  def update_connections

    stdout = ""

    Net::SSH.start(self.url, self.user, :password => self.password) do |ssh|

      # capture only stdout with 'last' command
      ssh.exec!("last") do |channel, stream, data|
        stdout << data if stream == :stdout
      end

    end

    last_lines = stdout.split("\n")

    isolate_connections(last_lines)


  end

  private 

  def isolate_connections(last_lines)
    array_index = 0
    already_saved_connection = false
    last_connection = Connection.where(:server_id => self.id).order("start_time").last

    #Checks if you are in a line already processed or if there are no more lines 
    while (!already_saved_connection) && (array_index < last_lines.length)  do 
      if !last_connection
        #I take the date when the server started to work
        last_lines.reverse!
        line = last_lines[array_index]
        array_index.next
        line_array = line.split

        string_server_start_date = line_array[2] + ' ' + line_array[3] + ' ' + 
                                   line_array[4] + ' ' + line_array[5] + ' ' + 
                                   line_array[6]
        server_start_date = DateTime.parse string_server_start_date
      else

        if check_last_connection

        end
      end
    end

  end

  def process_lines(line)
    if line.blank?
      nil
    else
      start_time = line_array[4] + ' ' + line_array[5] + ' ' + 
                   line_array[6]
    end
  end

  def check_last_connection(actual_connection, last_connection)
    (actual_connection.server_id == last_connection.server_id) && 
    (actual_connection.start_time == last_connection.start_time) && 
    (actual_connection.end_time == last_connection.end_time)
  end

end
