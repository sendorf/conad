class CreateConnections < ActiveRecord::Migration
  def change
    create_table :connections do |t|
      t.string :server_id
      t.string :user
      t.string :week_day
      t.string :month_day
      t.string :month
      t.datetime :start_time
      t.datetime :end_time
      t.string :connection_last

      t.timestamps
    end
  end
end
