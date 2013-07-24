class CreateConnections < ActiveRecord::Migration
  def change
    create_table :connections do |t|
      t.string :server_id
      t.string :user
      t.string :week_day
      t.string :month_day
      t.string :month
      t.string :start_time
      t.string :end_time
      t.string :connection_last

      t.timestamps
    end
  end
end
