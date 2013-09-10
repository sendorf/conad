class ChangeServerIdToIntegerInConnections < ActiveRecord::Migration
  def up
    remove_column :connections, :server_id
    add_column    :connections, :server_id, :integer
  end

  def down
    remove_column :connections, :server_id
    add_column    :connections, :server_id, :string
  end
end
