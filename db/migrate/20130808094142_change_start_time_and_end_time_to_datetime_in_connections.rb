class ChangeStartTimeAndEndTimeToDatetimeInConnections < ActiveRecord::Migration
  def self.up
    remove_column :connections, :start_time
    add_column    :connections, :start_time, :datetime
    remove_column :connections, :end_time
    add_column    :connections, :end_time, :datetime
  end

  def self.down
    remove_column :connections, :start_time
    add_column    :connections, :start_time, :string
    remove_column :connections, :end_time
    add_column    :connections, :end_time, :string
  end
end
